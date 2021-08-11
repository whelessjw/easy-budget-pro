import {
  Navbar,
  Container,
  Nav,
  Tabs,
  Tab,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Budget from "./components/Budget";
import { useDispatch, useSelector } from "react-redux";
import { createInitialBudget } from "./actions";

function App() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(createInitialBudget());
  };

  const currentBudget = useSelector((state) => state.currentBudget);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Easy Budget Pro</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="#link-bank-account">Link a Bank Account</Nav.Link>
            <Nav.Link href="#log-in">Log in with Google</Nav.Link>
            <Nav.Link href="#log-out">Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Tabs
        defaultActiveKey="overview"
        id="uncontrolled-tab-example"
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="overview" title="Overview">
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
        </Tab>
        <Tab eventKey="income" title="Income">
          {"A list of income for the month"}
        </Tab>
        <Tab eventKey="expenses" title="Expenses">
          {"A list of expenses for the month"}
        </Tab>
        <Tab eventKey="balances" title="Account Balances">
          {"Bank Account Balances"}
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
