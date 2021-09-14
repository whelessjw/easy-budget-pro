import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";
import { useDispatch, useSelector } from "react-redux";
import { getBalances } from "../../actions/index";

export default function AccountBalancesContainer() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.plaidAccessToken);

  return (
    <div>
      <NavigationTabs defaultActiveKey="/balances" />
      <button onClick={() => dispatch(getBalances(accessToken))}>
        Get Balances
      </button>
    </div>
  );
}
