export const CREATE_INITIAL_BUDGET = "CREATE_INITIAL_BUDGET";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_MONTHLY_INCOME = "EDIT_MONTHLY_INCOME";
export const EDIT_BUDGETED_AMOUNT = "EDIT_BUDGETED_AMOUNT";

export const createInitialBudget = () => {
  return {
    type: CREATE_INITIAL_BUDGET,
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
