import React from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { deleteCategory, editBudgetedAmount } from "../../actions";
import CurrencyInput from "react-currency-input-field";

export default function CategoryRow({
  budgetId,
  name,
  budgeted,
  spent,
  balance,
  categoryId,
}) {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  function MyVerticallyCenteredModal(props) {
    const handleDelete = () => {
      dispatch(deleteCategory(name));

      props.onHide();
    };

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the '{name}' category?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button className="btn-danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <tr>
        <td style={{ "text-align": "left" }}>
          <span>
            <Button
              className="btn-sm"
              style={{ border: "none" }}
              variant="outline-danger"
              onClick={() => setModalShow(true)}
            >
              X
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </span>
          {` ${name}`}
        </td>
        <td className="text-center">
          <CurrencyInput
            id={categoryId}
            size={9}
            allowNegativeValue={false}
            name="input-monthly-income"
            prefix="$"
            placeholder="Amount"
            defaultValue={budgeted}
            decimalsLimit={2}
            onValueChange={(value) => {
              if (value) {
                dispatch(
                  editBudgetedAmount(budgetId, categoryId, parseFloat(value))
                );
              } else {
                dispatch(
                  editBudgetedAmount(budgetId, categoryId, parseFloat(value))
                );
              }
            }}
          />
          {/* ${budgeted.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} */}
        </td>
        <td className="text-center">
          ${spent.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td className="text-center">
          ${balance.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
        </td>
      </tr>
    </>
  );
}
