import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { Box, Card } from "@mui/material";
// utils
import { fNumber } from "../../utils/formatNumbers";
// components
import useChart from "../../utils/useChart";

// ----------------------------------------------------------------------

ScoreChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function ScoreChart({ title, subheader, chartData, ...other }) {
  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: true },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "10%",
        borderRadius: 5,
        distributed: true,
      },
    },
    xaxis: {
      categories: chartLabels,
      labels: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: "9px",
      width: "100%",
      markers: {
        width: 8,
        height: 8,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
    },
    title: {
      text: title,
    },
  });

  return (
    <Card {...other}>
      <Box sx={{ mx: 2 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={240}
        />
      </Box>
    </Card>
  );
}
