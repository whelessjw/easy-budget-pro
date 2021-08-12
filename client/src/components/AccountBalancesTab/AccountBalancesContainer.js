import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";

export default function AccountBalancesContainer() {
  return (
    <div>
      <NavigationTabs defaultActiveKey="/balances" />
      {"Bank Account Balances"}
    </div>
  );
}
