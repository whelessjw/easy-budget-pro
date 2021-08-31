import React from "react";
import { Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTransactionToCategory } from "../../actions";

export default function Transactions() {
  const transactions = useSelector((state) => state.currentBudget.transactions);
  const currentBudget = useSelector((state) => state.currentBudget);
  const categories = useSelector((state) => state.currentBudget.categories);

  const dispatch = useDispatch();
  const handleCategorySelect = (transaction, categoryID) => {
    dispatch(addTransactionToCategory(transaction, categoryID));
  };

  let categoryKey = 0;
  let formID = 0;
  let rowKey = 0;

  return (
    <>
      <h1 className={"text-center"}>Transactions for {currentBudget.title}</h1>
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
                <tr key={rowKey++}>
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
                          onChange={(e) =>
                            handleCategorySelect(
                              transaction,
                              parseInt(e.target.value)
                            )
                          }
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option
                              key={categoryKey++}
                              value={category.categoryId}
                            >
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
  );
}
