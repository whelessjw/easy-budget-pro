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
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
