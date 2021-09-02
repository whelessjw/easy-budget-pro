import axios from "axios";
export const SAVE_PLAID_CREDENTIALS = "SAVE_PLAID_CREDENTIALS";
export const CREATE_INITIAL_BUDGET = "CREATE_INITIAL_BUDGET";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_MONTHLY_INCOME = "EDIT_MONTHLY_INCOME";
export const EDIT_BUDGETED_AMOUNT = "EDIT_BUDGETED_AMOUNT";
export const ADD_TRANSACTION_TO_CATEGORY = "ADD_TRANSACTION_TO_CATEGORY";
export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const HANDLE_LOGOUT = "HANDLE_LOGOUT";

export const handleLogin = async (googleId, name, email) => {
  const response = await axios.post(`api/login`, {
    googleId,
    name,
    email,
  });

  return {
    type: HANDLE_LOGIN,
    payload: response,
  };
};

export const handleLogout = () => {
  return {
    type: HANDLE_LOGOUT,
  };
};

export const savePlaidCredentials = async (
  googleID,
  plaidAccessToken,
  plaidItemID
) => {
  const response = await axios.post(`/api/save_plaid_credentials`, {
    googleID,
    plaidAccessToken,
    plaidItemID,
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

export const editMonthlyIncome = (amount) => {
  return {
    type: EDIT_MONTHLY_INCOME,
    payload: amount,
  };
};

export const editBudgetedAmount = (amount, categoryId) => {
  return {
    type: EDIT_BUDGETED_AMOUNT,
    payload: { amount, categoryId },
  };
};

export const addTransactionToCategory = (transaction, categoryID) => {
  return {
    type: ADD_TRANSACTION_TO_CATEGORY,
    payload: {
      transaction,
      categoryID,
    },
  };
};
