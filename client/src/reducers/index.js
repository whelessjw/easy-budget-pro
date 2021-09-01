import { combineReducers } from "redux";
import { currentBudgetReducer } from "./currentBudgetReducer";
import { credentialsReducer } from "./credentialsReducer";

export const rootReducer = combineReducers({
  currentBudget: currentBudgetReducer,
  credentials: credentialsReducer,
});
