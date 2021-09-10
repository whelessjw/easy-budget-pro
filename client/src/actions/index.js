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
  googleID,
  plaidAccessToken,
  plaidItemID,
  bankAccountInfo
) => {
  const response = await axios.post(`/api/save_plaid_credentials`, {
    googleID,
    plaidAccessToken,
    plaidItemID,
    bankAccountInfo,
  });

  return {
    type: SAVE_PLAID_CREDENTIALS,
    payload: response,
  };
};

export const createInitialBudget = async (googleId) => {
  const response = await axios.post(`/api/first_budget`, { googleId });
  return {
    type: CREATE_INITIAL_BUDGET,
    payload: response,
  };
};

export const deleteCategory = (name) => {
  return {
    type: DELETE_CATEGORY,
    payload: name,
  };
};

export const editMonthlyIncome = async (googleId, budgetId, monthlyIncome) => {
  const response = await axios.post("/api/monthly_income", {
    googleId,
    budgetId,
    monthlyIncome,
  });
  return {
    type: EDIT_MONTHLY_INCOME,
    payload: response,
  };
};

export const editBudgetedAmount = async (
  googleId,
  budgetId,
  categoryId,
  amount
) => {
  const response = await axios.post("/api/category_budget_amount", {
    googleId,
    budgetId,
    categoryId,
    amount,
  });

  return {
    type: EDIT_BUDGETED_AMOUNT,
    payload: response,
  };
};

export const addTransactionToCategory = async (
  transactionId,
  categoryId,
  currentBudgetId,
  googleId
) => {
  const response = await axios.post(`/api/assign_transaction_to_category`, {
    transactionId,
    categoryId,
    currentBudgetId,
    googleId,
  });
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
  currentBudgetId,
  googleId
) => {
  const response = await axios.post("/api/get_transactions", {
    accessToken,
    primaryAccount,
    startDate,
    endDate,
    currentBudgetId,
    googleId,
  });

  return {
    type: GET_TRANSACTIONS,
    payload: response,
  };
};
