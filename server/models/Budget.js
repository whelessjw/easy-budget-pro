const mongoose = require("mongoose");
const { Schema } = mongoose;

const BudgetSchema = new Schema(
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
    transactions: {
      type: Map,
      of: {},
    },
  },
  { strict: false }
);

module.exports = mongoose.model("Budget", BudgetSchema);
