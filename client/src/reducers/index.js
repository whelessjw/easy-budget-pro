import { combineReducers } from "redux";
import { currentBudgetReducer } from "./currentBudgetReducer";

export const rootReducer = combineReducers({
  currentBudget: currentBudgetReducer,
});
