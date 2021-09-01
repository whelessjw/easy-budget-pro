const path = require("path");
const express = require("express");
const { urlencoded } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
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
app.use(
  cookieSession({
    name: "Google Login Cookie",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["helloworld"],
  })
);

app.use(passport.initialize());
app.use(passport.session({ saveUninitialized: false, resave: false }));

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(null, user);
  });
});

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});

app.get("/auth/google", googleAuth);

app.get("/auth/google/callback", googleAuth, (req, res) => {
  res.send("You are now logged in via Google!");
});

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.send("Logged Out");
});

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

app.post("/api/create_link_token", async function (req, res) {
  // Get the client_user_id by searching for the current user
  // const user = await User.find(...);
  // const clientUserId = user.id;
  const clientUserId = "1234";
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

app.get("/api/get_transactions", async (req, res) => {
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
        access_token: accessToken,
        start_date: "2018-01-01",
        end_date: "2020-02-01",
        options: {
          offset: transactions.length,
        },
      };
      const paginatedResponse = await client.transactionsGet(paginatedRequest);
      transactions = transactions.concat(paginatedResponse.data.transactions);
    }
    res.json(transactions);
  } catch {
    (err) => {
      // handle error
      console.log(err);
    };
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
  });

  try {
    const savedNewBudget = await newBudget.save();

    res.status(200).send(savedNewBudget);
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
