import NavigationBar from "./components/Navigation/NavigationBar";
import { Switch, Route, Redirect } from "react-router-dom";
import OverviewContainer from "./components/OverviewTab/OverviewContainer";
import IncomeContainer from "./components/IncomeTab/IncomeContainer";
import ExpensesContainer from "./components/ExpensesTab/ExpensesContainer";
import AccountBalancesContainer from "./components/AccountBalancesTab/AccountBalancesContainer";
import WelcomePage from "./components/WelcomePage";
import { useSelector, useDispatch } from "react-redux";
import { checkIfLoggedIn } from "./actions";
import { useEffect, useState } from "react";
import { Spinner, Row, Col } from "react-bootstrap";

function App() {
  const [spinner, setSpinner] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkIfLoggedIn()).then(() => {
      setSpinner(false);
    });
  }, [dispatch]);

  const spinnerStyle = {
    position: "fixed",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      {spinner && (
        <Row style={spinnerStyle}>
          <Col>
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      )}
      {!spinner && (
        <>
          <NavigationBar />
          {!user && (
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Redirect to="/" />
            </Switch>
          )}
          {user && (
            <Switch>
              <Route path="/overview" component={OverviewContainer} />
              <Route path="/income" component={IncomeContainer} />
              <Route path="/expenses" component={ExpensesContainer} />
              <Route path="/balances" component={AccountBalancesContainer} />
              <Redirect to="/overview" />
            </Switch>
          )}
        </>
      )}
    </>
  );
}

export default App;
