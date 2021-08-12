import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Budget from "../Budget";
import { useDispatch, useSelector } from "react-redux";
import { createInitialBudget } from "../../actions";
import NavigationTabs from "../NavigationTabs";

export default function OverviewContainer() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(createInitialBudget());
  };

  const currentBudget = useSelector((state) => state.currentBudget);

  return (
    <>
      <NavigationTabs defaultActiveKey="/overview" />
      <Container>
        <Row>
          <Col className="text-center">
            {!currentBudget && (
              <Button onClick={handleClick} variant="primary">
                Create Your First Budget
              </Button>
            )}
            {currentBudget && <Budget />}
          </Col>
          <Col>{"List of Transactions for month"}</Col>
        </Row>
      </Container>
    </>
  );
}
