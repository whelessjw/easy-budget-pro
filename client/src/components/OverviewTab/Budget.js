import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryRow from "./CategoryRow";
import CurrencyInput from "react-currency-input-field";
import { editMonthlyIncome } from "../../actions";

export default function Budget() {
  const categories = useSelector((state) => state.currentBudget.categories);
  const monthlyIncome = useSelector(
    (state) => state.currentBudget.monthlyIncome
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
      <h1>August 2021</h1>
      <table className="table table-striped table-borderless">
        <thead>
          <tr>
            <td colSpan="2">
              <h2>Monthly Income:</h2>
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
                    dispatch(editMonthlyIncome(parseInt(value)));
                  } else {
                    dispatch(editMonthlyIncome(0));
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              {monthlyIncome !== 0 &&
                `You have $${numberWithCommas(
                  monthlyIncome - totalAmountBudgeted
                )} left to budget`}
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
                balance={category.balance}
              />
            ))}
        </tbody>
      </table>
      {/* <AddToCategoryBtn /> */}
    </div>
  );
}
