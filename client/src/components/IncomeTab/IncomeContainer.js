import React from "react";
import NavigationTabs from "../NavigationTabs/NavigationTabs";

export default function IncomeContainer() {
  return (
    <>
      <NavigationTabs defaultActiveKey="/income" />
      {"A list of income for the month"}
    </>
  );
}
