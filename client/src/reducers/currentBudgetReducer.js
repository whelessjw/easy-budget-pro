import {
  CREATE_INITIAL_BUDGET,
  DELETE_CATEGORY,
  EDIT_MONTHLY_INCOME,
  EDIT_BUDGETED_AMOUNT,
  ADD_TRANSACTION_TO_CATEGORY,
} from "../actions";

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

export const currentBudgetReducer = function (state = null, action) {
  switch (action.type) {
    case CREATE_INITIAL_BUDGET:
      const date = new Date();
      let month = date.getMonth();
      let year = date.getFullYear();
      let currentMonth = months[month];
      const intialBudget = {
        title: `${currentMonth} ${year}`,
        month,
        year,
        monthlyIncome: 0,
        categories: [
          { categoryId: 1, name: "Savings", budgeted: 0, spent: 0, balance: 0 },
          { categoryId: 2, name: "Housing", budgeted: 0, spent: 0, balance: 0 },
          {
            categoryId: 3,
            name: "Utilities",
            budgeted: 0,
            spent: 0,
            balance: 0,
          },
          {
            categoryId: 4,
            name: "Groceries",
            budgeted: 0,
            spent: 0,
            balance: 0,
          },
          {
            categoryId: 5,
            name: "Restaurants",
            budgeted: 0,
            spent: 0,
            balance: 0,
          },
          {
            categoryId: 6,
            name: "Car Payment",
            budgeted: 0,
            spent: 0,
            balance: 0,
          },
          { categoryId: 7, name: "Gas", budgeted: 0, spent: 0, balance: 0 },
          {
            categoryId: 8,
            name: "Personal",
            budgeted: 0,
            spent: 0,
            balance: 0,
          },
        ],
        income: [],
        expenses: [],
        transactions: [
          {
            account_id: "AeQkL64oWvfz4VABA9zZfNzB313r5qiW3woex",
            account_owner: null,
            amount: 6.33,
            authorized_date: null,
            authorized_datetime: null,
            category: ["Travel", "Taxi"],
            category_id: "22016000",
            check_number: null,
            date: "2021-08-21",
            datetime: null,
            iso_currency_code: "USD",
            location: {
              address: null,
              city: null,
              country: null,
              lat: null,
              lon: null,
              postal_code: null,
              region: null,
              store_number: null,
            },
            merchant_name: "Uber",
            name: "Uber 072515 SF**POOL**",
            payment_channel: "in store",
            payment_meta: {
              by_order_of: null,
              payee: null,
              payer: null,
              payment_method: null,
              payment_processor: null,
              ppd_id: null,
              reason: null,
              reference_number: null,
            },
            pending: false,
            pending_transaction_id: null,
            transaction_code: null,
            transaction_id: "DMRzg64EG9UlB9bGbjl5UQpNV5RVxGUzGeXpm",
            transaction_type: "special",
            unofficial_currency_code: null,
          },
          {
            account_id: "AeQkL64oWvfz4VABA9zZfNzB313r5qiW3woex",
            account_owner: null,
            amount: 5.4,
            authorized_date: null,
            authorized_datetime: null,
            category: ["Travel", "Taxi"],
            category_id: "22016000",
            check_number: null,
            date: "2021-08-08",
            datetime: null,
            iso_currency_code: "USD",
            location: {
              address: null,
              city: null,
              country: null,
              lat: null,
              lon: null,
              postal_code: null,
              region: null,
              store_number: null,
            },
            merchant_name: "Uber",
            name: "Uber 063015 SF**POOL**",
            payment_channel: "in store",
            payment_meta: {
              by_order_of: null,
              payee: null,
              payer: null,
              payment_method: null,
              payment_processor: null,
              ppd_id: null,
              reason: null,
              reference_number: null,
            },
            pending: false,
            pending_transaction_id: null,
            transaction_code: null,
            transaction_id: "Vx1yd6wzm7FMx1PrPbM5ijABLDvLdlF6NknA6",
            transaction_type: "special",
            unofficial_currency_code: null,
          },
          {
            account_id: "AeQkL64oWvfz4VABA9zZfNzB313r5qiW3woex",
            account_owner: null,
            amount: -500,
            authorized_date: null,
            authorized_datetime: null,
            category: ["Travel", "Airlines and Aviation Services"],
            category_id: "22001000",
            check_number: null,
            date: "2021-08-06",
            datetime: null,
            iso_currency_code: "USD",
            location: {
              address: null,
              city: null,
              country: null,
              lat: null,
              lon: null,
              postal_code: null,
              region: null,
              store_number: null,
            },
            merchant_name: "United Airlines",
            name: "United Airlines",
            payment_channel: "other",
            payment_meta: {
              by_order_of: null,
              payee: null,
              payer: null,
              payment_method: null,
              payment_processor: null,
              ppd_id: null,
              reason: null,
              reference_number: null,
            },
            pending: false,
            pending_transaction_id: null,
            transaction_code: null,
            transaction_id: "wNAXdwx61eclm9yqyKlVUqWjZwAZlgIgK9ldr",
            transaction_type: "special",
            unofficial_currency_code: null,
          },
          {
            account_id: "AeQkL64oWvfz4VABA9zZfNzB313r5qiW3woex",
            account_owner: null,
            amount: 12,
            authorized_date: null,
            authorized_datetime: null,
            category: ["Food and Drink", "Restaurants", "Fast Food"],
            category_id: "13005032",
            check_number: null,
            date: "2021-08-05",
            datetime: null,
            iso_currency_code: "USD",
            location: {
              address: null,
              city: null,
              country: null,
              lat: null,
              lon: null,
              postal_code: null,
              region: null,
              store_number: "3322",
            },
            merchant_name: "McDonald's",
            name: "McDonald's",
            payment_channel: "in store",
            payment_meta: {
              by_order_of: null,
              payee: null,
              payer: null,
              payment_method: null,
              payment_processor: null,
              ppd_id: null,
              reason: null,
              reference_number: null,
            },
            pending: false,
            pending_transaction_id: null,
            transaction_code: null,
            transaction_id: "5rxMdRJXa1F8gzAGA38EuNyRV34V5GuxjVpL5",
            transaction_type: "place",
            unofficial_currency_code: null,
          },
          {
            account_id: "AeQkL64oWvfz4VABA9zZfNzB313r5qiW3woex",
            account_owner: null,
            amount: 4.33,
            authorized_date: null,
            authorized_datetime: null,
            category: ["Food and Drink", "Restaurants", "Coffee Shop"],
            category_id: "13005043",
            check_number: null,
            date: "2021-08-05",
            datetime: null,
            iso_currency_code: "USD",
            location: {
              address: null,
              city: null,
              country: null,
              lat: null,
              lon: null,
              postal_code: null,
              region: null,
              store_number: null,
            },
            merchant_name: "Starbucks",
            name: "Starbucks",
            payment_channel: "in store",
            payment_meta: {
              by_order_of: null,
              payee: null,
              payer: null,
              payment_method: null,
              payment_processor: null,
              ppd_id: null,
              reason: null,
              reference_number: null,
            },
            pending: false,
            pending_transaction_id: null,
            transaction_code: null,
            transaction_id: "J8aNn6QyWKi3BLlJlz35CMNd9vE91pSbwj5NQ",
            transaction_type: "place",
            unofficial_currency_code: null,
          },
          {
            account_id: "AeQkL64oWvfz4VABA9zZfNzB313r5qiW3woex",
            account_owner: null,
            amount: 89.4,
            authorized_date: null,
            authorized_datetime: null,
            category: ["Food and Drink", "Restaurants"],
            category_id: "13005000",
            check_number: null,
            date: "2021-08-04",
            datetime: null,
            iso_currency_code: "USD",
            location: {
              address: null,
              city: null,
              country: null,
              lat: null,
              lon: null,
              postal_code: null,
              region: null,
              store_number: null,
            },
            merchant_name: "Sparkfun",
            name: "SparkFun",
            payment_channel: "in store",
            payment_meta: {
              by_order_of: null,
              payee: null,
              payer: null,
              payment_method: null,
              payment_processor: null,
              ppd_id: null,
              reason: null,
              reference_number: null,
            },
            pending: false,
            pending_transaction_id: null,
            transaction_code: null,
            transaction_id: "kGbQnPpRorhXpBMaM8X1IyzBlnvlVEuxAE8Rz",
            transaction_type: "place",
            unofficial_currency_code: null,
          },
        ],
      };
      return intialBudget;

    case DELETE_CATEGORY:
      const newCategoryState = { ...state };
      newCategoryState.categories = state.categories.filter(
        (c) => c.name !== action.payload
      );

      return newCategoryState;

    case EDIT_MONTHLY_INCOME:
      const incomeState = { ...state };

      incomeState.monthlyIncome = action.payload;

      return incomeState;

    case EDIT_BUDGETED_AMOUNT:
      const budgetedState = { ...state };
      const amount = action.payload.amount;
      const categoryId = action.payload.categoryId;

      budgetedState.categories = budgetedState.categories.map((category) => {
        if (category.categoryId === categoryId) {
          category.budgeted = amount;
          category.balance = category.budgeted - category.spent;
        }
        return category;
      });

      return budgetedState;

    case ADD_TRANSACTION_TO_CATEGORY:
      const budget = { ...state };

      budget.transactions = budget.transactions.map((t) => {
        if (t.transaction_id === action.payload.transaction.transaction_id) {
          t.budgetCategoryID = action.payload.categoryID;
          return t;
        } else {
          return t;
        }
      });

      budget.categories = budget.categories.map((c) => {
        c.spent = 0;

        budget.transactions.forEach((t) => {
          if (c.categoryId === t.budgetCategoryID) {
            c.spent += t.amount;
          }
        });

        c.balance = c.budgeted - c.spent;

        return c;
      });

      return budget;

    default:
      return state;
  }
};
