import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Budget from "./Budget";
import { useDispatch, useSelector } from "react-redux";
import { createInitialBudget } from "../../actions";
import NavigationTabs from "../Navigation/NavigationTabs";
import Transactions from "./Transactions";

export default function OverviewContainer() {
  const dispatch = useDispatch();
  const budgetTitle = useSelector((state) => state.user.currentBudget.title);
  const user = useSelector((state) => state.user);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleClick = () => {
    dispatch(createInitialBudget(month, year));
  };

  const currentBudget = useSelector((state) => state.user.currentBudget);

  return (
    <>
      <NavigationTabs defaultActiveKey="/overview" />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2" className="text-center">
            <Button variant="secondary">Previous Month</Button>
          </Col>
          <Col md="auto" className="text-center">
            <h1>{budgetTitle}</h1>
          </Col>
          <Col xs lg="2" className="text-center">
            <Button variant="secondary">Next Month</Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            {user.budgets.length === 0 && (
              <>
                <Form>
                  <Form.Label>
                    Choose the month and year for your first budget:
                  </Form.Label>
                  <Row>
                    <Col>
                      <Form.Select
                        onChange={(e) => setMonth(e.target.value)}
                        defaultValue={month}
                        aria-label="Month"
                      >
                        <option value={0}>January</option>
                        <option value={1}>February</option>
                        <option value={2}>March</option>
                        <option value={3}>April</option>
                        <option value={4}>May</option>
                        <option value={5}>June</option>
                        <option value={6}>July</option>
                        <option value={7}>August</option>
                        <option value={8}>September</option>
                        <option value={9}>October</option>
                        <option value={10}>November</option>
                        <option value={11}>December</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select
                        onChange={(e) => setYear(e.target.value)}
                        defaultValue={year}
                        aria-label="Year"
                      >
                        <option value={year - 1}>{year - 1}</option>
                        <option value={year}>{year}</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <Button onClick={handleClick} variant="primary">
                    Create Your First Budget
                  </Button>
                </Form>
              </>
            )}
            {currentBudget && <Budget />}
          </Col>
          <Col>{currentBudget && <Transactions />}</Col>
        </Row>
      </Container>
    </>
  );
}
