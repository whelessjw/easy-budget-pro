import {
  CREATE_INITIAL_BUDGET,
  DELETE_CATEGORY,
  EDIT_MONTHLY_INCOME,
  EDIT_BUDGETED_AMOUNT,
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
          { categoryId: 1, name: "Savings", budgeted: 0, balance: 0 },
          { categoryId: 2, name: "Housing", budgeted: 0, balance: 0 },
          { categoryId: 3, name: "Utilities", budgeted: 0, balance: 0 },
          { categoryId: 4, name: "Groceries", budgeted: 0, balance: 0 },
          { categoryId: 5, name: "Restaurants", budgeted: 0, balance: 0 },
          { categoryId: 6, name: "Car Payment", budgeted: 0, balance: 0 },
          { categoryId: 7, name: "Gas", budgeted: 0, balance: 0 },
          { categoryId: 8, name: "Personal", budgeted: 0, balance: 0 },
        ],
        income: [],
        expenses: [],
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
        }
        return category;
      });

      return budgetedState;

    default:
      return state;
  }
};
