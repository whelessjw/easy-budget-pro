import { combineReducers } from "redux";
import { currentBudgetReducer } from "./currentBudgetReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  currentBudget: currentBudgetReducer,
});
