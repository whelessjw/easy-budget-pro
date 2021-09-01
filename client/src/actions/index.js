import axios from "axios";
export const CREATE_INITIAL_BUDGET = "CREATE_INITIAL_BUDGET";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_MONTHLY_INCOME = "EDIT_MONTHLY_INCOME";
export const EDIT_BUDGETED_AMOUNT = "EDIT_BUDGETED_AMOUNT";
export const ADD_TRANSACTION_TO_CATEGORY = "ADD_TRANSACTION_TO_CATEGORY";

export const createInitialBudget = async () => {
  const response = await axios.post(`http://localhost:8000/api/first_budget`);
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
