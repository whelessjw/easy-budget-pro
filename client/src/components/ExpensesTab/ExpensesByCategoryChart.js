import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ExpensesByCategoryChart() {
  let expensesObject = {};
  const categories = useSelector(
    (state) => state.user.currentBudget.categories
  );

  categories.forEach((c) => {
    return (expensesObject[c.name] = c.spent);
  });

  const chartOptions = {
    chart: {
      type: "column",
      style: {
        fontFamily: "Quicksand",
        fontWeight: "bold",
      },
      events: {
        load() {
          setTimeout(this.reflow.bind(this), 0);
        },
      },
    },
    title: {
      text: "Expenses By Category",
    },
    xAxis: {
      categories: Object.keys(expensesObject),
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount Spent",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    series: [
      {
        name: "Amount Spent",
        data: Object.values(expensesObject).map((category) => category),
        showInLegend: false,
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        oneToOne={true}
      />
    </>
  );
}
