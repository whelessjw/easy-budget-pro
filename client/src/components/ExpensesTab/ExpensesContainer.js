import React from "react";
import NavigationTabs from "../Navigation/NavigationTabs";

export default function ExpensesContainer() {
  return (
    <>
      <NavigationTabs defaultActiveKey="/expenses" />
      {"A list of expenses for the month"}
    </>
  );
}
