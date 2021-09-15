import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";
import { useDispatch, useSelector } from "react-redux";
import { getBalances } from "../../actions/index";
import BalancesTable from "./BalancesTable";
import PlaidLinkButton from "../Plaid/PlaidLinkButton";

export default function AccountBalancesContainer() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.plaidAccessToken);
  const primaryAccountId = useSelector(
    (state) => state.user.bankAccountInfo.account_id
  );

  return (
    <div>
      <NavigationTabs defaultActiveKey="/balances" />

      {!primaryAccountId && (
        <div className="text-center">
          <h3>Connect a bank account to view your transactions</h3>
          <PlaidLinkButton />
        </div>
      )}

      {primaryAccountId && (
        <>
          <div className="text-center mb-4 mt-3">
            <button
              onClick={() => dispatch(getBalances(accessToken))}
              type="button"
              className="btn btn-success"
            >
              Get Account Balances
            </button>
          </div>
          <BalancesTable />
        </>
      )}
    </div>
  );
}
