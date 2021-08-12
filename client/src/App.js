import NavigationBar from "./components/NavigationBar";
import { Switch, Route, Redirect } from "react-router-dom";
import OverviewContainer from "./components/OverviewTab/OverviewContainer";
import IncomeContainer from "./components/IncomeTab/IncomeContainer";
import ExpensesContainer from "./components/ExpensesTab/ExpensesContainer";
import AccountBalancesContainer from "./components/AccountBalancesTab/AccountBalancesContainer";

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/overview" component={OverviewContainer} />
        <Route path="/income" component={IncomeContainer} />
        <Route path="/expenses" component={ExpensesContainer} />
        <Route path="/balances" component={AccountBalancesContainer} />
        <Redirect to="/overview" />
      </Switch>
    </>
  );
}

export default App;
