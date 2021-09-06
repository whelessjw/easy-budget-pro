import {
  CREATE_INITIAL_BUDGET,
  HANDLE_LOGIN,
  HANDLE_LOGOUT,
  SAVE_PLAID_CREDENTIALS,
  EDIT_MONTHLY_INCOME,
  EDIT_BUDGETED_AMOUNT,
  GET_TRANSACTIONS,
  ASSIGN_TRANSACTION_TO_CATEGORY,
} from "../actions";

export const userReducer = function (state = null, action) {
  switch (action.type) {
    case HANDLE_LOGIN:
      return action.payload.data;

    case HANDLE_LOGOUT:
      return null;

    case SAVE_PLAID_CREDENTIALS:
      return action.payload.data;

    case CREATE_INITIAL_BUDGET:
      return action.payload.data;

    case EDIT_MONTHLY_INCOME:
      return action.payload.data;

    case EDIT_BUDGETED_AMOUNT:
      return action.payload.data;

    case GET_TRANSACTIONS:
      return action.payload.data;

    case ASSIGN_TRANSACTION_TO_CATEGORY:
      return action.payload.data;

    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////

//     case DELETE_CATEGORY:
//       const newCategoryState = { ...state };
//       newCategoryState.categories = state.categories.filter(
//         (c) => c.name !== action.payload
//       );

//       return newCategoryState;

//     case ADD_TRANSACTION_TO_CATEGORY:
//       const budget = { ...state };

//       budget.transactions = budget.transactions.map((t) => {
//         if (t.transaction_id === action.payload.transaction.transaction_id) {
//           t.budgetCategoryID = action.payload.categoryID;
//           return t;
//         } else {
//           return t;
//         }
//       });

//       budget.categories = budget.categories.map((c) => {
//         c.spent = 0;

//         budget.transactions.forEach((t) => {
//           if (c.categoryId === t.budgetCategoryID) {
//             c.spent += t.amount;
//           }
//         });

//         c.balance = c.budgeted - c.spent;

//         return c;
//       });

//       return budget;

//     default:
//       return state;
//   }
// };
