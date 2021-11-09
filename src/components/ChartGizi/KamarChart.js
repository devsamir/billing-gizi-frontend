import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const KamarChart = ({ data }) => {
  const chartData = data || [];
  const config = {
    type: "pie2d",
    width: "100%",
    height: "500",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Kamar Dengan Pesanan Terbanyak",
        subCaption: "Berdasarkan Jumlah Billing",
        showPercentValues: "1",
        useDataPlotColorForLabels: "1",
        theme: "fusion",
      },
      data: chartData,
    },
  };
  return <ReactFC {...config} />;
};

export default KamarChart;
