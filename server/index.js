require("dotenv").config();
const path = require("path");
const express = require("express");
const { urlencoded } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const User = require("./models/User");
const Budget = require("./models/Budget");

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
app.use(cookieParser());

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
  const token = req.body.tokenId;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email } = ticket.getPayload();

    if (email_verified) {
      User.findOne({ email: email })
        .populate("budgets")
        .populate("currentBudget")
        .then((existingUser) => {
          if (existingUser) {
            // we already have a record with the given profile ID
            //done(null, existingUser);
            //req.session.userId = existingUser._id;
            res.cookie("session-token", token);
            res.json(existingUser);
          } else {
            // we don't have a user record with this ID, make a new record!
            const newUser = new User({
              name,
              email,
            });

            newUser.save();
            //req.session.userId = newUser._id;
            res.cookie("session-token", token);
            res.json(newUser);
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("session-token");
  res.json();
});

app.post("/api/create_link_token", checkAuth, async function (req, res) {
  // Get the client_user_id by searching for the current user
  // const user = await User.find(...);
  // const clientUserId = user.id;
  const clientUserId = req.user._id;
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

    res.json({ accessToken, itemID });
  } catch (error) {
    // handle error
    console.log(error);
  }
});

app.post("/api/save_plaid_credentials", checkAuth, async function (req, res) {
  const plaidAccessToken = req.body.plaidAccessToken;
  const plaidItemID = req.body.plaidItemID;
  const bankAccountInfo = req.body.bankAccountInfo;

  User.findOne({ email: req.user.email })
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

app.post("/api/get_transactions", checkAuth, async (req, res) => {
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
        if (t.amount < 0) {
          t.categoryId = "Income";
        } else {
          t.categoryId = "Uncategorized";
        }
        budget.transactions.set(t.transaction_id, t);
      } else {
        //update transaction info and add the current assigned category
        const categoryId = budget.transactions.get(t.transaction_id).categoryId;
        t.categoryId = categoryId;
        budget.transactions.set(t.transaction_id, t);
      }
    });

    await budget.save();

    User.findOne({ email: req.user.email })
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

app.post("/api/assign_transaction_to_category", checkAuth, async (req, res) => {
  const currentBudgetId = req.body.currentBudgetId;
  const transactionId = req.body.transactionId;
  const categoryId = req.body.categoryId;

  try {
    const budget = await Budget.findById(currentBudgetId);
    const transaction = budget.transactions.get(transactionId);
    transaction.categoryId = categoryId;

    budget.transactions.set(transactionId, transaction);
    budget.markModified("transactions");

    budget.categories = budget.categories.map((c) => {
      c.spent = 0;

      budget.transactions.forEach((t) => {
        if (c._id.toString() === t.categoryId) {
          c.spent += t.amount;
        }
      });

      c.balance = c.budgeted - c.spent;

      return c;
    });

    await budget.save();

    User.findOne({ email: req.user.email })
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

app.post("/api/first_budget", checkAuth, async (req, res) => {
  let month = req.body.month;
  let year = req.body.year;
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

    const user = await User.findOne({ email: req.user.email })
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

app.post("/api/monthly_income", checkAuth, async (req, res) => {
  const budgetId = req.body.budgetId;
  const monthlyIncome = req.body.monthlyIncome;
  try {
    Budget.findById(budgetId).then((budget) => {
      budget.monthlyIncome = monthlyIncome;
      budget.save();
    });

    User.findOne({ email: req.user.email })
      .populate("budgets")
      .populate("currentBudget")
      .then((existingUser) => {
        res.json(existingUser);
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/api/category_budget_amount", checkAuth, async (req, res) => {
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

    User.findOne({ email: req.user.email })
      .populate("budgets")
      .populate("currentBudget")
      .then((existingUser) => {
        res.json(existingUser);
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/api/check_if_logged_in", async (req, res) => {
  let token = req.cookies["session-token"];
  if (!token) {
    res.json(null);
  }

  if (token) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { email } = ticket.getPayload();

      User.findOne({ email: email })
        .populate("budgets")
        .populate("currentBudget")
        .then((existingUser) => {
          req.user = existingUser;
          res.json(existingUser);
        });
    } catch (err) {
      console.log(err);
      res.json(null);
    }
  }
});

async function checkAuth(req, res, next) {
  let token = req.cookies["session-token"];

  if (token) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { email } = ticket.getPayload();

      User.findOne({ email: email })
        .populate("budgets")
        .populate("currentBudget")
        .then((existingUser) => {
          req.user = existingUser;
          next();
        });
    } catch (err) {
      console.log(err);
      res.json(null);
    }
  }
}

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
