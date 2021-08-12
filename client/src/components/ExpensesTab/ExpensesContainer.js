import React from "react";
import NavigationTabs from "../NavigationTabs";

export default function ExpensesContainer() {
  return (
    <>
      <NavigationTabs defaultActiveKey="/expenses" />
      {"A list of expenses for the month"}
    </>
  );
}
