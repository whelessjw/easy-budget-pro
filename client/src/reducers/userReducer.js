import {
  HANDLE_LOGIN,
  HANDLE_LOGOUT,
  SAVE_PLAID_CREDENTIALS,
} from "../actions";

export const userReducer = function (state = null, action) {
  switch (action.type) {
    case HANDLE_LOGIN:
      return action.payload.data;

    case HANDLE_LOGOUT:
      return null;

    case SAVE_PLAID_CREDENTIALS:
      return action.payload.data;

    default:
      return state;
  }
};
