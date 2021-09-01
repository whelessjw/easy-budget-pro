import {
  CREATE_INITIAL_BUDGET,
  DELETE_CATEGORY,
  EDIT_MONTHLY_INCOME,
  EDIT_BUDGETED_AMOUNT,
  ADD_TRANSACTION_TO_CATEGORY,
} from "../actions";

export const currentBudgetReducer = function (state = null, action) {
  switch (action.type) {
    case CREATE_INITIAL_BUDGET:
      return action.payload.data;

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
