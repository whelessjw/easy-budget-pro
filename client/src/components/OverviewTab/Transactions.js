import React from "react";
import { Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTransactionToCategory, getTransactions } from "../../actions";
import PlaidLinkButton from "../Plaid/PlaidLinkButton";

export default function Transactions() {
  const transactions = useSelector((state) => {
    return Object.values(state.user.currentBudget.transactions);
  });
  const currentBudget = useSelector((state) => state.user.currentBudget);
  const categories = useSelector(
    (state) => state.user.currentBudget.categories
  );
  const plaidAccessToken = useSelector((state) => state.user.plaidAccessToken);
  const primaryAccountId = useSelector(
    (state) => state.user.bankAccountInfo.account_id
  );
  const transactionYear = useSelector((state) => state.user.currentBudget.year);
  const transactionMonth = useSelector((state) =>
    (state.user.currentBudget.month + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  );
  const daysInMonth = (transactionMonth, transactionYear) => {
    // Use 1 for January, 2 for February, etc.
    return new Date(transactionYear, transactionMonth, 0).getDate();
  };

  const startDate = `${transactionYear}-${transactionMonth}-01`;
  const endDate = `${transactionYear}-${transactionMonth}-${daysInMonth(
    transactionMonth,
    transactionYear
  )}`;

  const dispatch = useDispatch();
  const handleCategorySelect = (transactionId, categoryId) => {
    dispatch(
      addTransactionToCategory(transactionId, categoryId, currentBudget._id)
    );
  };

  const handleClick = () => {
    dispatch(
      getTransactions(
        plaidAccessToken,
        primaryAccountId,
        startDate,
        endDate,
        currentBudget._id
      )
    );
  };

  let formID = 0;

  return (
    <>
      {!primaryAccountId && (
        <div className="text-center">
          <h3>Connect a bank account to view your transactions</h3>
          <PlaidLinkButton />
        </div>
      )}
      {primaryAccountId && (
        <>
          <h3 className={"text-center"}>
            Income: $
            {transactions
              .reduce((acc, curr) => {
                if (curr.amount < 0) {
                  acc += curr.amount * -1;
                }
                return acc;
              }, 0)
              .toFixed(2)
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </h3>
          <h3 className={"text-center"}>
            Expenses: $
            {transactions
              .reduce((acc, curr) => {
                if (curr.amount >= 0) {
                  acc += curr.amount;
                }
                return acc;
              }, 0)
              .toFixed(2)
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </h3>
          <div className="text-center mb-4 mt-3">
            <button
              onClick={handleClick}
              type="button"
              className="btn btn-success"
            >
              Check for new transactions
            </button>
          </div>
          {transactions && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Merchant Name</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  return (
                    <tr key={transaction.transaction_id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.merchant_name}</td>
                      <td>
                        {transaction.amount >= 0 &&
                          `$${transaction.amount.toFixed(2)}`}
                      </td>
                      <td>
                        {transaction.amount < 0 &&
                          `$${(transaction.amount * -1).toFixed(2)}`}
                      </td>
                      <td>
                        {transaction.amount >= 0 && (
                          <Form.Group controlId={formID++}>
                            <Form.Select
                              id="inlineFormCustomSelect"
                              defaultValue={transaction.categoryId}
                              onChange={(e) =>
                                handleCategorySelect(
                                  transaction.transaction_id,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="uncategorized">
                                Select Category
                              </option>
                              {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                  {category.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        )}
                        {transaction.amount < 0 && `Income`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
}
