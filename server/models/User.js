const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  plaidAccessToken: String,
  plaidItemID: String,
  budgets: [
    {
      title: { type: String, required: true },
      month: { type: Number, required: true },
      year: { type: Number, required: true },
      monthlyIncome: { type: Number },
      categories: [
        {
          name: { type: String },
          budgeted: { type: Number },
          spent: { type: Number },
          balance: { type: Number },
        },
      ],
      transactions: [
        {
          transaction_id: { type: String },
          date: { type: Date },
          amount: { type: Number },
          merchant_name: { type: String },
          category: { type: String },
        },
      ],
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
