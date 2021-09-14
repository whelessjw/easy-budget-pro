import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";
import { Row, Col, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPrevMonthsBudget, getNextMonthsBudget } from "../../actions";

export default function IncomeContainer() {
  const currentBudget = useSelector((state) => state.user.currentBudget);
  const dispatch = useDispatch();
  const budgetTitle = useSelector((state) => state.user.currentBudget?.title);
  return (
    <>
      <NavigationTabs defaultActiveKey="/income" />
      <Container>
        {currentBudget && (
          <>
            <Row className="justify-content-md-center align-items-center text-center">
              <Col xs lg="2">
                <Button
                  onClick={() =>
                    dispatch(getPrevMonthsBudget(currentBudget._id))
                  }
                  variant="secondary"
                >
                  Previous Month
                </Button>
              </Col>
              <Col md="auto">
                <h1>{budgetTitle}</h1>
              </Col>
              <Col xs lg="2">
                <Button
                  onClick={() =>
                    dispatch(getNextMonthsBudget(currentBudget._id))
                  }
                  variant="secondary"
                >
                  Next Month
                </Button>
              </Col>
            </Row>
            <hr />
          </>
        )}
      </Container>

      {"A list of income for the month"}
    </>
  );
}
