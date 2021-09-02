import NavigationBar from "./components/Navigation/NavigationBar";
import { Switch, Route, Redirect } from "react-router-dom";
import OverviewContainer from "./components/OverviewTab/OverviewContainer";
import IncomeContainer from "./components/IncomeTab/IncomeContainer";
import ExpensesContainer from "./components/ExpensesTab/ExpensesContainer";
import AccountBalancesContainer from "./components/AccountBalancesTab/AccountBalancesContainer";
import WelcomePage from "./components/WelcomePage";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  return (
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
  );
}

export default App;
