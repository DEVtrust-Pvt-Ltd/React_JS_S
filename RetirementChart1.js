import React from "react";
/* eslint-disable */
import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);
const RetirementChart1 = ({ result }) => {
  console.log(result);
  // let result = localStorage?.getItem("response") || {};
  // result = JSON.parse(result);
  const options = {
    type: "bar",
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        left: 15,
        right: 0,
        top: 50,
        bottom: 0,
      },
    },
    plugins: {
      labels: {
        font: {
          size: 10,
        },
      },
      legend: {
        display: false,
      },

      datalabels: {
        display: true,
        align: "top",
        anchor: "end",
        font: { size: "30" },
        formatter: (val) => {
          return "$" + val?.toString()?.slice(0, 4) + "M";
        },
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: "23px",
            weight: 700,
            letterSpacing: "-0.4px",
            lineHeight: "29.05px",
          },
          color: "#979797",
          family: "DM Sans",
          padding: 10,
        },
      },

      y: {
        stacked: true,
        display: false,
        ticks: {
          stepSize: 40,
        },
      },
    },
  };
  const labels = [
    ["Amount Needed", "at Target Age"],
    ["Amount You Will Have at", "Target Age"],
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Retirement",
        data: [
          result?.savings_needed_at_retirement,
          result?.present_value_of_all_retirement_income,
        ],
        backgroundColor: ["#BBC3FE", "#C0C8FF"],
        datalabels: {
          color: "#4154DC",
        },
        barThickness: 70,
        borderSkipped: false,
        borderRadius: 20,
      },
    ],
    tooltips: {
      enabled: false,
    },
  };

  return (
    <>
      <Box sx={{ display: "block", mx: "auto", maxWidth: "793.96px" }}>
        <Bar height={500} options={options} data={data} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: { md: "nowrap", xs: "wrap" },
          justifyContent: { md: "center", xs: "center" },
          alignItems: "center",
          pt: 12,
          gap: 1,
        }}
      >
        <Typography
          sx={{
            maxWidth: { md: "527.13px", xs: "auto" },
            textAlign: "center",
            fontSize: "30px",
            fontWeight: 700,
            color: "#0052CC",
            letterSpacing: "-0.4px",
            lineHeight: "39.06px",
            fontStyle: "DM Sans",
          }}
        >
          Additional Savings Needed
          <br />
          <span style={{ paddingLeft: "7px" }}>
            to Retire at Your Target Age
          </span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 0,
            flexWrap: "wrap",
            justifyContent: { md: "space-between", xs: "center" },
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              width: "136px",
              mr: -6,
              textAlign: "center",
              fontWeight: 700,
              color: "#7B89F2",
              fontFamily: "DM Sans",
              letterSpacing: "-0.4px",
              lineHeight: "65.1px",
            }}
          >
            $
          </Typography>
          <Button
            variant="contained"
            sx={{
              "&:hover": {
                bgcolor: "#6476F5",
              },
              textAlign: "center",
              fontSize: "30px",
              fontWeight: 700,
              backgroundColor: "#6476F5",
              width: "226px",
              height: "100.05px",
              borderRadius: 0,
              letterSpacing: "-0.2px",
            }}
          >
            10,000
          </Button>
          <Typography
            sx={{ fontSize: "30px", fontWeight: 700, color: "#979797", ml: 7 }}
          >
            Annually
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default RetirementChart1;
