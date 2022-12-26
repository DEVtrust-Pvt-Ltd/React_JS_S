import React, { useMemo, useState } from "react";
import Popover from "@mui/material/Popover";
import hoverIcon from "../../assets/images/hoverIcon.png";
import { Box } from "@mui/system";
import modalIcon from "../../assets/images/modalIcon.png";
import { Typography } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
export default function Modal({ name }) {
  const [element, setElement] = useState(false);
  const handleClick = (event) => {
    setElement(event.currentTarget);
  };
  const handleClose = () => {
    setElement(false);
  };
  const content = useMemo(() => {
    switch (name) {
      case "Family Income":
        return (
          <>
            <ClearRoundedIcon
              style={{ float: "right" }}
              onClick={handleClose}
            />
            <Box sx={{ display: "flex", gap: 5, maxWidth: "690px", py: 3 }}>
              <Box sx={{ py: 2 }}>
                <img src={modalIcon} alt="modalIcon" />
              </Box>
              <Box sx={{ maxWidth: "492.73px" }}>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#63666A",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{
                    color: "#0052CC",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Annual Gross Income
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Enter your gross family income.
                </Typography>
                <Typography
                  sx={{
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  <span style={{ color: "#4154DC" }}>
                    Pro-tip: Run ‘what-if’ scenarios if you earned more income:
                  </span>
                  <br />
                  You can come back and change the gross income to see what your
                  retirement plan would look like if your income were to
                  increase.
                </Typography>
              </Box>
            </Box>
          </>
        );

      case "Retirement Goals":
        return (
          <>
            <ClearRoundedIcon
              style={{ float: "right" }}
              onClick={handleClose}
            />
            <Box
              sx={{
                display: "flex",
                gap: 5,
                Width: "690px",
                Height: "436px",
                py: 6,
                px: 5,
                pt: 3,
              }}
            >
              <Box sx={{ py: 2 }}>
                <img src={modalIcon} alt="modalIcon" />
              </Box>
              <Box sx={{ maxWidth: "492.73px" }}>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#63666A",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{
                    color: "#0052CC",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Current Age
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Your current age.
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  <span style={{ color: "#4154DC" }}>
                    Target age for retirement
                  </span>
                  <br />
                  This is the age at whoch you would ideally want to retire.
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  <span style={{ color: "#4154DC" }}>% Income Replacement</span>
                  <br />
                  This is the % of your current income that you wish to receive
                  during retirement.
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  <span style={{ color: "#4154DC" }}>Wage Growth</span>
                  <br />
                  Annual growth in wages and salaries.
                </Typography>
              </Box>
            </Box>
          </>
        );
      case "assumption":
        return (
          <>
            <ClearRoundedIcon
              style={{ float: "right" }}
              onClick={handleClose}
            />
            <Box
              sx={{
                display: "flex",
                gap: 5,
                Width: "690px",
                Height: "436px",
                py: 6,
                px: 5,
                pt: 3,
              }}
            >
              <Box sx={{ py: 2 }}>
                <img src={modalIcon} alt="modalIcon" />
              </Box>
              <Box sx={{ maxWidth: "492.73px" }}>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#63666A",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Assumptions
                </Typography>
                <Typography
                  sx={{
                    color: "#0052CC",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Rate of returen before retirement:
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  This is the annual rate of return you expect from your
                  retirement savings and investments
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  <span style={{ color: "#4154DC" }}>
                    Rate of Return During Retirement
                  </span>
                  <br />
                  This is the annual rate of return you expect from your savings
                  and investments during retirement. This is more conservative
                  than before retirment.
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  <span style={{ color: "#4154DC" }}>Inflation</span>
                  <br />
                  This is what you expect for the average long-term inflation
                  rate. A common measure of inflation in the U.S. is the
                  Consumer Price Index (CPI). From 1925 through 2016 the CPI has
                  a long-term average of 2.9% annually.
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  <span style={{ color: "#4154DC" }}>Wage Growth</span>
                  <br />
                  Annual growth in wages and salaries.
                </Typography>
              </Box>
            </Box>
          </>
        );
      default:
        break;
    }
  }, []);
  return (
    <div>
      <img
        style={{ height: "auto" }}
        onMouseOver={handleClick}
        src={hoverIcon}
        alt="detail"
      />
      <Popover
        open={element}
        anchorEl={element}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: "24px",
            border: "1px solid #0052CC",
          },
        }}
      >
        <Box sx={{ px: 4, py: 2 }}>{content}</Box>
      </Popover>
    </div>
  );
}
