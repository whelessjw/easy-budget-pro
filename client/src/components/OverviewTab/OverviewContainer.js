import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Budget from "./Budget";
import { useDispatch, useSelector } from "react-redux";
import { createInitialBudget } from "../../actions";
import NavigationTabs from "../Navigation/NavigationTabs";
import Transactions from "./Transactions";

export default function OverviewContainer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(createInitialBudget());
  };

  const currentBudget = useSelector((state) => state.user.currentBudget);

  return (
    <>
      <NavigationTabs defaultActiveKey="/overview" />
      <Container>
        <Row>
          <Col className="text-center">
            {user.budgets.length === 0 && (
              <Button onClick={handleClick} variant="primary">
                Create Your First Budget
              </Button>
            )}
            {currentBudget && <Budget />}
          </Col>
          <Col>{currentBudget && <Transactions />}</Col>
        </Row>
      </Container>
    </>
  );
}
