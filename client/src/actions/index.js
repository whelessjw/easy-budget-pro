import axios from "axios";
export const SAVE_PLAID_CREDENTIALS = "SAVE_PLAID_CREDENTIALS";
export const CREATE_INITIAL_BUDGET = "CREATE_INITIAL_BUDGET";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_MONTHLY_INCOME = "EDIT_MONTHLY_INCOME";
export const EDIT_BUDGETED_AMOUNT = "EDIT_BUDGETED_AMOUNT";
export const ASSIGN_TRANSACTION_TO_CATEGORY = "ASSIGN_TRANSACTION_TO_CATEGORY";
export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const HANDLE_LOGOUT = "HANDLE_LOGOUT";
export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const CHECK_IF_LOGGED_IN = "CHECK_IF_LOGGED_IN";
export const NEXT_MONTH_BUDGET = "NEXT_MONTH_BUDGET";
export const PREV_MONTH_BUDGET = "PREV_MONTH_BUDGET";
export const ADD_CATEGORY = "ADD_CATEGORY";

export const handleLogin = async (tokenId) => {
  const response = await axios.post(`api/login`, {
    tokenId,
  });

  return {
    type: HANDLE_LOGIN,
    payload: response,
  };
};

export const checkIfLoggedIn = async () => {
  const response = await axios.get(
    `/api/check_if_logged_in`,
    {},
    { withCredentials: true }
  );

  return {
    type: CHECK_IF_LOGGED_IN,
    payload: response,
  };
};

export const handleLogout = async () => {
  await axios.get("/api/logout");

  return {
    type: HANDLE_LOGOUT,
  };
};

export const savePlaidCredentials = async (
  plaidAccessToken,
  plaidItemID,
  bankAccountInfo
) => {
  const response = await axios.post(
    `/api/save_plaid_credentials`,
    {
      plaidAccessToken,
      plaidItemID,
      bankAccountInfo,
    },
    { withCredentials: true }
  );

  return {
    type: SAVE_PLAID_CREDENTIALS,
    payload: response,
  };
};

export const createInitialBudget = async (month, year) => {
  const response = await axios.post(
    `/api/first_budget`,
    { month, year },
    { withCredentials: true }
  );
  return {
    type: CREATE_INITIAL_BUDGET,
    payload: response,
  };
};

export const editMonthlyIncome = async (budgetId, monthlyIncome) => {
  const response = await axios.post(
    "/api/monthly_income",
    {
      budgetId,
      monthlyIncome,
    },
    { withCredentials: true }
  );
  return {
    type: EDIT_MONTHLY_INCOME,
    payload: response,
  };
};

export const editBudgetedAmount = async (budgetId, categoryId, amount) => {
  const response = await axios.post(
    "/api/category_budget_amount",
    {
      budgetId,
      categoryId,
      amount,
    },
    { withCredentials: true }
  );

  return {
    type: EDIT_BUDGETED_AMOUNT,
    payload: response,
  };
};

export const addTransactionToCategory = async (
  transactionId,
  categoryId,
  currentBudgetId
) => {
  const response = await axios.post(
    `/api/assign_transaction_to_category`,
    {
      transactionId,
      categoryId,
      currentBudgetId,
    },
    { withCredentials: true }
  );
  return {
    type: ASSIGN_TRANSACTION_TO_CATEGORY,
    payload: response,
  };
};

export const getTransactions = async (
  accessToken,
  primaryAccount,
  startDate,
  endDate,
  currentBudgetId
) => {
  const response = await axios.post(
    "/api/get_transactions",
    {
      accessToken,
      primaryAccount,
      startDate,
      endDate,
      currentBudgetId,
    },
    { withCredentials: true }
  );

  return {
    type: GET_TRANSACTIONS,
    payload: response,
  };
};

export const getNextMonthsBudget = async (currentBudgetId) => {
  const response = await axios.post(
    "/api/next_budget",
    {
      currentBudgetId,
    },
    { withCredentials: true }
  );

  return {
    type: NEXT_MONTH_BUDGET,
    payload: response,
  };
};

export const getPrevMonthsBudget = async (currentBudgetId) => {
  const response = await axios.post(
    "/api/prev_budget",
    {
      currentBudgetId,
    },
    { withCredentials: true }
  );

  return {
    type: PREV_MONTH_BUDGET,
    payload: response,
  };
};

export const addCategory = async (currentBudgetId, newCategoryName) => {
  const response = await axios.post(
    "/api/add_category",
    {
      currentBudgetId,
      newCategoryName,
    },
    { withCredentials: true }
  );

  return {
    type: ADD_CATEGORY,
    payload: response,
  };
};

export const deleteCategory = async (currentBudgetId, categoryId) => {
  const response = await axios.post(
    "/api/delete_category",
    {
      currentBudgetId,
      categoryId,
    },
    { withCredentials: true }
  );

  return {
    type: DELETE_CATEGORY,
    payload: response,
  };
};
