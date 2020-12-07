import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const LineChart = ({ data }) => {
  const chartData = data || [];
  const config = {
    type: "line",
    width: "100%",
    height: "500",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Jumlah Pesanan",
        subCaption: "Berdasarkan Pesanan yang diinput dengan status apapun",
        xAxisName: "Tanggal",
        yAxisName: "Pesanan",
        numberPrefix: "",
        theme: "fusion",
      },
      data: chartData,
    },
  };
  return <ReactFC {...config} />;
};

export default LineChart;
