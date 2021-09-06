require("dotenv").config();
const path = require("path");
const express = require("express");
const { urlencoded } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const app = express();
const bodyParser = require("body-parser");

const User = require("./models/User");
const Budget = require("./models/Budget");

const util = require("util");

const PORT = process.env.PORT || 8000;

mongoose.connect(
  keys.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

app.post("/api/login", async function (req, res) {
  User.findOne({ googleId: req.body.googleId })
    .populate("budgets")
    .populate("currentBudget")
    .then((existingUser) => {
      if (existingUser) {
        // we already have a record with the given profile ID
        //done(null, existingUser);
        res.json(existingUser);
      } else {
        // we don't have a user record with this ID, make a new record!
        const newUser = new User({
          googleId: req.body.googleId,
          name: req.body.name,
          email: req.body.email,
        });

        newUser.save();
        res.json(newUser);
      }
    });
});

app.post("/api/create_link_token", async function (req, res) {
  // Get the client_user_id by searching for the current user
  // const user = await User.find(...);
  // const clientUserId = user.id;
  const clientUserId = req.body.googleID;
  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: "Easy Budget Pro",
    products: ["auth", "transactions"],
    language: "en",
    country_codes: ["US"],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(request);
    console.log(createTokenResponse.data.link_token);
    res.json(createTokenResponse.data.link_token);
  } catch (error) {
    // handle error
    console.log(error);
  }
});

app.post("/api/exchange_public_token", async function (req, res, next) {
  const publicToken = req.body.public_token;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;

    console.log(accessToken);
    console.log(itemID);

    res.json({ accessToken, itemID });
  } catch (error) {
    // handle error
    console.log(error);
  }
});

app.post("/api/save_plaid_credentials", async function (req, res, next) {
  const googleID = req.body.googleID;
  const plaidAccessToken = req.body.plaidAccessToken;
  const plaidItemID = req.body.plaidItemID;
  const bankAccountInfo = req.body.bankAccountInfo;

  User.findOne({ googleId: googleID })
    .populate("budgets")
    .populate("currentBudget")
    .then((existingUser) => {
      if (existingUser) {
        existingUser.plaidAccessToken = plaidAccessToken;
        existingUser.plaidItemID = plaidItemID;
        existingUser.bankAccountInfo = bankAccountInfo;
        existingUser.save();
        res.json(existingUser);
      } else {
        res.sendStatus(404);
      }
    });
});

app.get("/api/get_balances", async (req, res) => {
  const accessToken = req.body.accessToken;
  const request = {
    access_token: accessToken,
  };

  try {
    const balanceResponse = await client.accountsBalanceGet(request);
    res.json(balanceResponse.data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/get_transactions", async (req, res) => {
  const request = {
    access_token: req.body.accessToken,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    options: {
      account_ids: [req.body.primaryAccount],
    },
  };
  try {
    const response = await client.transactionsGet(request);
    let transactions = response.data.transactions;
    const total_transactions = response.data.total_transactions;
    // Manipulate the offset parameter to paginate
    // transactions and retrieve all available data
    while (transactions.length < total_transactions) {
      const paginatedRequest = {
        access_token: req.body.accessToken,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        options: {
          offset: transactions.length,
        },
      };
      const paginatedResponse = await client.transactionsGet(paginatedRequest);
      transactions = transactions.concat(paginatedResponse.data.transactions);
    }
    const budget = await Budget.findById(req.body.currentBudgetId);
    transactions.forEach((t) => {
      if (!budget.transactions.get(t.transaction_id)) {
        t.categoryId = "uncategorized";
        budget.transactions.set(t.transaction_id, t);
      }
      // {
      //   transaction_id: t.transaction_id,
      //   date: t.date,
      //   amount: t.amount,
      //   merchant_name: t.merchant_name,
      // };
    });

    await budget.save();

    User.findOne({ googleId: req.body.googleId })
      .populate("budgets")
      .populate("currentBudget")
      .then((existingUser) => {
        res.json(existingUser);
      });
  } catch (err) {
    // handle error
    console.log(err);
  }
});

app.post("/api/assign_transaction_to_category", async (req, res) => {
  const googleId = req.body.googleId;
  const currentBudgetId = req.body.currentBudgetId;
  const transactionId = req.body.transactionId;
  const categoryId = req.body.categoryId;

  try {
    const budget = await Budget.findById(currentBudgetId);
    const transaction = budget.transactions.get(transactionId);
    transaction.categoryId = categoryId;
    console.log(transaction.categoryId);

    budget.transactions.set(transactionId, transaction);

    // budget.categories = budget.categories.map((c) => {
    //   c.spent = 0;

    //   budget.transactions.forEach((t) => {
    //     if (c._id.toString() === t.categoryId) {
    //       c.spent += t.amount;
    //     }
    //   });

    //   c.balance = c.budgeted - c.spent;

    //   return c;
    // });

    await budget.save();

    User.findOne({ googleId: googleId })
      .populate("budgets")
      .populate("currentBudget")
      .then((existingUser) => {
        res.json(existingUser);
      });
  } catch (err) {
    // handle error
    console.error(err);
  }
});

app.post("/api/first_budget", async (req, res) => {
  const date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  let currentMonth = months[month];
  let title = `${currentMonth} ${year}`;

  const newBudget = new Budget({
    title,
    month,
    year,
    monthlyIncome: 0,
    categories: [
      { name: "Savings", budgeted: 0, spent: 0, balance: 0 },
      { name: "Housing", budgeted: 0, spent: 0, balance: 0 },
      { name: "Utilities", budgeted: 0, spent: 0, balance: 0 },
      { name: "Groceries", budgeted: 0, spent: 0, balance: 0 },
      { name: "Restaurants", budgeted: 0, spent: 0, balance: 0 },
      { name: "Car Payment", budgeted: 0, spent: 0, balance: 0 },
      { name: "Gas", budgeted: 0, spent: 0, balance: 0 },
      { name: "Personal", budgeted: 0, spent: 0, balance: 0 },
    ],
    transactions: {},
  });

  try {
    await newBudget.save();
    const savedBudget = await Budget.findById(newBudget._id);

    const user = await User.findOne({ googleId: req.body.googleId })
      .populate("budgets")
      .populate("currentBudget");

    user.budgets.push(savedBudget);
    user.currentBudget = savedBudget;
    user.save();
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/api/monthly_income", async (req, res) => {
  const googleId = req.body.googleId;
  const budgetId = req.body.budgetId;
  const monthlyIncome = req.body.monthlyIncome;
  try {
    Budget.findById(budgetId).then((budget) => {
      budget.monthlyIncome = monthlyIncome;
      budget.save();
    });

    User.findOne({ googleId: googleId })
      .populate("budgets")
      .populate("currentBudget")
      .then((existingUser) => {
        res.json(existingUser);
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/api/category_budget_amount", async (req, res) => {
  const googleId = req.body.googleId;
  const budgetId = req.body.budgetId;
  const categoryId = req.body.categoryId;
  const amount = req.body.amount;
  try {
    const budget = await Budget.findById(budgetId);
    const categoryToUpdate = await budget.categories.id(categoryId);
    categoryToUpdate.budgeted = amount;
    categoryToUpdate.balance =
      categoryToUpdate.budgeted - categoryToUpdate.spent;

    budget.save();

    User.findOne({ googleId: googleId })
      .populate("budgets")
      .populate("currentBudget")
      .then((existingUser) => {
        res.json(existingUser);
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
