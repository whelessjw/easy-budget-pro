require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const path = require("path");
const util = require("util");

const PORT = process.env.PORT || 8000;

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
