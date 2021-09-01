import { SAVE_ACCESS_TOKEN_AND_ITEM_ID } from "../actions";

export const credentialsReducer = function (state = null, action) {
  switch (action.type) {
    case SAVE_ACCESS_TOKEN_AND_ITEM_ID:
      return {
        accessToken: action.payload.data.accessToken,
        itemID: action.payload.data.itemID,
      };

    default:
      return state;
  }
};
