import {
  CREATE_INITIAL_BUDGET,
  HANDLE_LOGIN,
  HANDLE_LOGOUT,
  SAVE_PLAID_CREDENTIALS,
  EDIT_MONTHLY_INCOME,
  EDIT_BUDGETED_AMOUNT,
  GET_TRANSACTIONS,
  ASSIGN_TRANSACTION_TO_CATEGORY,
  CHECK_IF_LOGGED_IN,
  NEXT_MONTH_BUDGET,
  PREV_MONTH_BUDGET,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_BALANCES,
} from "../actions";

export const userReducer = function (state = null, action) {
  switch (action.type) {
    case CHECK_IF_LOGGED_IN:
      return action.payload.data;

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

    case NEXT_MONTH_BUDGET:
      return action.payload.data;

    case PREV_MONTH_BUDGET:
      return action.payload.data;

    case ADD_CATEGORY:
      return action.payload.data;

    case DELETE_CATEGORY:
      return action.payload.data;

    case GET_BALANCES:
      return action.payload.data;

    default:
      return state;
  }
};
