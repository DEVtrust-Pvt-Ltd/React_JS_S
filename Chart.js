import React, { useEffect, useState, useMemo } from "react";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import lefticon from "../../assets/images/lefticon.png";
import hoc from "../../hoc";
import { LoadingButton } from "@mui/lab";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ValidationTextField } from "../../constant/constant";
import { sendPdfdata } from "../../utils/index";
import { Link } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);
function ResultGraph({ kidsreport }) {
  const [chart_y_axis_data, setChart_Y_Axis_Data] = useState([
    1000, 1000, 1000,
  ]);
  const [chart_x_axis_data, setChart_X_Axis_Data] = useState([
    1000, 1000, 1000,
  ]);
  const [chartlimit, setChartLimit] = useState(2000);
  const [labels, setLabels] = useState(["Child1", "Child2", "Child3"]);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [pdfdata, setPdfdata] = useState({ parent_name: "", parent_email: "" });
  const [pdfdataerr, setPdfdataerr] = useState({});
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (kidsreport.kid_reports === undefined) return;
    let labelsname = [];
    let monthly_saving_needed = [];
    let additional_monthly_savings_needed = [];
    let length = kidsreport.kid_reports.length;
    for (let i = 0; i < length; i++) {
      let label_name = "Child" + (kidsreport.kid_reports[i].child_id + 1);
      monthly_saving_needed = [
        ...monthly_saving_needed,
        kidsreport.kid_reports[i].monthly_saving_needed,
      ];
      additional_monthly_savings_needed = [
        ...additional_monthly_savings_needed,
        kidsreport.kid_reports[i].additional_monthly_savings_needed,
      ];
      labelsname = [...labelsname, label_name];
    }
    setChartLimit(
      Math.max(...additional_monthly_savings_needed) +
        Math.max(...monthly_saving_needed)
    );
    setChart_Y_Axis_Data(additional_monthly_savings_needed);
    setChart_X_Axis_Data(monthly_saving_needed);
    setLabels(labelsname);
  }, [kidsreport]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    let checkField = validate(name, value);
    setPdfdata({ ...pdfdata, [name]: value });
    setPdfdataerr({ ...pdfdataerr, ...checkField });
  };
  const validate = (name, value) => {
  
    let validationerr = {};
    if (name == "parent_name") {
      if (value === "" || value === undefined) {
        validationerr["parent_name"] = "Required";
      } else {
        validationerr["parent_name"] = "";
      }
    }
    if (name == "parent_email") {
      if (value === "" || value === undefined) {
        validationerr["parent_email"] = "Required";
      } else if (!regexEmail.test(value)) {
        validationerr["parent_email"] = "Email Not Valid";
      } else {
        validationerr["parent_email"] = "";
      }
    }
    return validationerr;
  };

  useEffect(() => {
    if (pdfdataerr?.parent_email !== "" || pdfdataerr?.parent_name !== "") {
      setDisable(true);
      return;
    }
    setDisable(false);
  }, [pdfdataerr]);
  const handlePdfSubmit = async () => {
    setLoader(true);
    let data = {
      email: pdfdata?.parent_email,
      parent: pdfdata?.parent_name,
      kids_report: kidsreport,
    };
    if (disable === false) {
      const res = await sendPdfdata(data);
      if (res.status === 200) {
        setPdfdata({ parent_name: "", parent_email: "" });
        setLoader(false);
        setMessage("Message sent successfully");
      } else {
        setMessage("Something went wrong");
      }
    }
  };
  const graph = useMemo(() => {
    const options = {
      type: "bar",
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          left: 15,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      plugins: {
        datalabels: {
          anchor: "left",
          align: "left",
          display: true,
          formatter: (val) => {
            return "$" + Math.floor(val);
          },
          labels: {
            precision: 0,
            title: {
              font: {
                size: "12px",
                weight: "bold",
                family: "DM Sans",
              },

              color: "#c3c3c3",
              padding: 35,
            },
          },
        },
        title: {
          display: true,
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            font: {
              size: 12,
              weight: 600,
              lineHeight: 1,
              family: "DM Sans",
            },
            color: "#000000",
            boxWidth: 15,
            boxHeight: 18,
            padding: 20,
            textAlign: "start",
          },
        },
      },
      scales: {
        position: "right",
        x: {
          stacked: true,
          grid: {
            display: false,
          },

          ticks: {
            beginAtZero: true,
            font: {
              size: 20,
              weight: "bold",
              family: "DM Sans",
            },
            color: "#979797",
          },
        },

        y: {
          stacked: true,
          grid: {
            display: false,
            drawBorder: false,
            lineWidth: 0.5,
          },
          ticks: {
            crossAlign: "far",
            stepSize: 500,
            font: {
              size: 14,
              weight: "bold",
              family: "DM Sans",
            },
            color: "#c3c3c3",
            callback: function (value) {
              return "$" + value;
            },
          },
          suggestedMin: 0,
          suggestedMax: chartlimit,
        },
      },
    };
    const data = {
      labels,
      datasets: [
        {
          label: ["Amount you are currently saving", "(Monthly)"],
          defaultFontColor: "#979797",
          barThickness: 60,
          scaleStepWidth: 1,

          data: chart_x_axis_data,
          backgroundColor: "#4FBF67",
          datalabels: {
            color: "gray",
          },
          borderRadius: 20,
          categoryPercentage: 0.8,
          barPercentage: 0.8,
          borderSkipped: false,
        },
        {
          label: ["Additional Amoun42 mt You Need to Save", "(Monthly)"],
          defaultFontColor: "#979797",
          barThickness: 60,
          data: chart_y_axis_data,
          backgroundColor: "#C1EFCB",
          datalabels: {
            color: "gray",
          },
          borderRadius: 20,
          categoryPercentage: 0.8,
          barPercentage: 0.8,
        },
      ],
      tooltips: {
        enabled: false,
      },
    };
    return <Bar height={500} options={options} data={data} />;
  }, [chart_x_axis_data, chart_y_axis_data, labels, chartlimit]);
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: { md: "1106px", xs: "auto" },
        backgroundColor: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        mb: 4,
        p: 2,
        borderRadius: "22px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          mb: 4,
          boxShadow: 3,
          p: 9,
          px: { md: 8, xs: 0 },
          borderRadius: "22px",
        }}
      >
        {graph}
      </Box>
      <Box
        sx={{
          mx: { md: 14, xs: 0 },
          ml: { md: 25, xs: 0 },
          mt: { md: 0, xs: 0 },
        }}
      >
        <Box
          sx={{
            pt: 4,
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: { md: 25, xs: 1 },
            pr: { md: 16, xs: 0 },
            justifyContent: { md: "center", xs: "center" },
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            sx={{
              color: "#4154DC",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "-0.4px",
              lineHeight: "20.83px",
            }}
          >
            Parent Name*
          </Typography>
          <ValidationTextField
            placeholder="Parent Name"
            sx={{
              width: { md: "249px", xs: "auto" },
              "& input::placeholder": { color: " #8F92A1" },
            }}
            id="standard-basic"
            className="textfield"
            name="parent_name"
            variant="outlined"
            onChange={(e) => {
              handleChange(e);
            }}
            value={pdfdata?.parent_name}
            error={pdfdataerr?.parent_name ? true : false}
            label={pdfdataerr.parent_name !== "" ? pdfdataerr.parent_name : ""}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: { md: 25, xs: 1 },
            pr: { md: 16, xs: 0 },
            justifyContent: { md: "center", xs: "center" },
            alignItems: "start",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              color: "#4154DC",
              fontSize: "16px",
              fontWeight: 700,
              fontStyle: "DM Sans",
              letterSpacing: "-0.4px",
              lineHeight: "20.83px",
            }}
          >
            Parent Email*
          </Typography>
          <ValidationTextField
            placeholder="Parent Email"
            sx={{
              width: { md: "249px", xs: "auto" },
              borderColor: "primary",
              "& input::placeholder": { color: " #8F92A1" },
            }}
            id="standard-basic"
            className="textfield"
            onChange={(e) => {
              handleChange(e);
            }}
            value={pdfdata?.parent_email}
            name="parent_email"
            variant="outlined"
            error={pdfdataerr?.parent_email ? true : false}
            label={
              pdfdataerr?.parent_email !== "" ? pdfdataerr?.parent_email : ""
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { md: "end", xs: "center" },
          py: 5,
          pr: { md: 3, sx: 0 },
        }}
      >
        <div>
          <LoadingButton
            disabled={disable}
            loading={loader}
            onClick={handlePdfSubmit}
            style={{ backgroundColor: disable ? "#c4c4c4" : "#4FBF67" }}
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "335px",
              p: "10px",
              pr: 3,
              height: "50px",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "20px",
              color: "#FFFFFF",
              fontFamily: "DM Sans",
              borderRadius: 0,
              boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            variant="contained"
          >
            <Box sx={{ display: "flex", gap: 13 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "DM Sans",
                  fontWeight: 700,
                  letterSpacing: "-0.2px",
                  lineHeight: "20px",
                }}
              >
                {!loader ? "Email PDF" : "Sending"}
              </Typography>
              <img
                style={{ opacity: disable ? "25%" : "100%" }}
                src={lefticon}
              />
            </Box>
          </LoadingButton>
          {message && (
            <span
              style={{
                textAlign: "center",
                display: "block",
                paddingTop: "7px",
                color: "red",
              }}
            >
              {message}
            </span>
          )}
        </div>
      </Box>
      <Typography
        component={Link}
        to="/"
        onClick={() => window.open("/", "_blank")}
        sx={{
          letterSpacing: "-0.4px",
          mb: 3,
          textAlign: "center",
          width: "100%",
          display: "block",
          mx: "auto",
          fontFamily: "DM Sans",
          fontSize: "16px",
          fontWeight: 700,
          color: "#4854A9",
          pb: 4,
        }}
      >
        How do we generate these results?
      </Typography>
    </Container>
  );
}

export default hoc(ResultGraph);
