const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  plaidAccessToken: String,
  plaidItemID: String,
  budgets: [{ type: Schema.Types.ObjectId, ref: "Budget" }],
  currentBudget: { type: Schema.Types.ObjectId, ref: "Budget" },
  bankAccountInfo: {
    account: {
      id: String,
      mask: String,
      name: String,
      subtype: String,
      type: { type: String },
    },
    account_id: String,
    accounts: [
      {
        id: String,
        mask: String,
        name: String,
        subtype: String,
        type: { type: String },
      },
    ],
    institution: {
      name: String,
      institution_id: String,
    },
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
