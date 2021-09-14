import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ExpensesByCategoryChart() {
  let incomeObject = {};
  const transactions = useSelector((state) => {
    return Object.values(state.user.currentBudget.transactions);
  });

  transactions.forEach((t) => {
    if (t.amount < 0) {
      incomeObject[t.name]
        ? (incomeObject[t.name] -= t.amount)
        : (incomeObject[t.name] = -t.amount);
    }
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
      text: "Income Sources",
    },
    xAxis: {
      categories: Object.keys(incomeObject),
    },
    yAxis: {
      min: 0,
      title: {
        text: "Net Income",
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
        name: "Income",
        data: Object.values(incomeObject).map((income) => income),
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
