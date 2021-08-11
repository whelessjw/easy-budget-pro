import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryRow from "./CategoryRow";
import CurrencyInput from "react-currency-input-field";
import { editMonthlyIncome } from "../actions";

export default function Budget() {
  const categories = useSelector((state) => state.currentBudget.categories);
  const monthlyIncome = useSelector(
    (state) => state.currentBudget.monthlyIncome
  );
  const dispatch = useDispatch();

  return (
    <div className="text-center col-md-10 offset-md-1">
      <h1>August 2021</h1>
      <table className="table table-success table-striped table-borderless">
        <thead>
          <tr>
            <td colSpan="2">Monthly Income:</td>
            <td className="text-right" colSpan="1" id="income-to-budget">
              <CurrencyInput
                id="input-monthly-income"
                name="input-monthly-income"
                size={9}
                allowNegativeValue={false}
                prefix="$"
                placeholder="Income"
                defaultValue={monthlyIncome}
                decimalsLimit={2}
                onValueChange={(value, name) =>
                  dispatch(editMonthlyIncome(parseInt(value)))
                }
              />
            </td>
          </tr>
        </thead>
      </table>
      <table className="table table-primary table-striped  table-borderless table-sm">
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
