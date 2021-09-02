import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryRow from "./CategoryRow";
import CurrencyInput from "react-currency-input-field";
import { editMonthlyIncome } from "../../actions";

export default function Budget() {
  const budgetTitle = useSelector((state) => state.user.currentBudget.title);
  const budgetId = useSelector((state) => state.user.currentBudget._id);
  const googleId = useSelector((state) => state.user.googleId);
  const categories = useSelector(
    (state) => state.user.currentBudget.categories
  );
  const monthlyIncome = useSelector(
    (state) => state.user.currentBudget.monthlyIncome
  );
  const totalAmountBudgeted = categories.reduce((total, category) => {
    return category.budgeted + total;
  }, 0);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const dispatch = useDispatch();

  return (
    <div className="text-center col-md-10 offset-md-1">
      <h1>{budgetTitle}</h1>
      <table className="table table-striped table-borderless">
        <thead>
          <tr>
            <td colSpan="2">
              <h2>Estimated Income:</h2>
            </td>
            <td className="align-middle" colSpan="1" id="income-to-budget">
              <CurrencyInput
                id="input-monthly-income"
                name="input-monthly-income"
                size={9}
                allowNegativeValue={false}
                prefix="$"
                placeholder="Income"
                defaultValue={monthlyIncome}
                decimalsLimit={2}
                onValueChange={(value, name) => {
                  if (value) {
                    dispatch(
                      editMonthlyIncome(googleId, budgetId, parseFloat(value))
                    );
                  } else {
                    dispatch(editMonthlyIncome(googleId, budgetId, 0));
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              {monthlyIncome === 0 && (
                <h5 className="text-primary">
                  Enter Your Monthly Income to Get Started
                </h5>
              )}
              {monthlyIncome !== 0 &&
                monthlyIncome - totalAmountBudgeted > 0 && (
                  <h5 className="text-warning">
                    You have $
                    {numberWithCommas(
                      (monthlyIncome - totalAmountBudgeted).toFixed(2)
                    )}{" "}
                    left to budget
                  </h5>
                )}
              {monthlyIncome !== 0 &&
                monthlyIncome - totalAmountBudgeted === 0 && (
                  <h5 className="text-success">Your Budget is Balanced!</h5>
                )}
              {monthlyIncome !== 0 &&
                monthlyIncome - totalAmountBudgeted < 0 && (
                  <h5 className="text-danger">
                    You've budgeted $
                    {numberWithCommas(
                      (monthlyIncome - totalAmountBudgeted).toFixed(2) * -1
                    )}{" "}
                    too much!
                  </h5>
                )}
            </td>
          </tr>
        </thead>
      </table>

      <table className="table table-striped  table-borderless table-sm">
        <thead>
          <tr>
            <th>
              <u>Category</u>
            </th>
            <th className="text-center">
              <u>Budgeted</u>
            </th>
            <th className="text-center">
              <u>Spent</u>
            </th>
            <th className="text-center">
              <u>Balance</u>
            </th>
          </tr>
        </thead>
        <tbody id="category-table">
          {categories &&
            categories.map((category) => (
              <CategoryRow
                key={category.name}
                id={category.categoryId}
                name={category.name}
                budgeted={category.budgeted}
                spent={category.spent}
                balance={category.balance}
              />
            ))}
        </tbody>
      </table>
      {/* <AddToCategoryBtn /> */}
    </div>
  );
}
