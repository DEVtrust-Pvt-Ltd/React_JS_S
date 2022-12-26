import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ValidationTextField, blockInvalidChar,formatnum } from "../../constant/constant";
import "./rangepicker.css";
import { Typography } from "@mui/material";

export default function RangePicker(props) {
  const { limit, name, type } = props.data;
  const [value, setValue] = useState(0);
  const [step, setStep] = useState(1);
  const handleChange = (e, newValue) => {
    if (typeof newValue === "number") {
      if (type === "age") {
        setStep(1);
        setValue(newValue);
        return;
      }
      if (value === 1000 && newValue === 900) {
        setStep(20);
        setValue(980);
        return;
      }
      if (value === 50 && newValue === 45) {
        setStep(1);
        setValue(49);
        return;
      }
      if (newValue >= 0 && newValue < 50) {
        setStep(1);
        setValue(newValue);
        return;
      }
      if (newValue >= 50 && newValue <= 100) {
        setStep(5);
        setValue(newValue);
        return;
      }
      if (newValue >= 100 && newValue <= 500) {
        setStep(10);
        setValue(newValue);
        return;
      }
      if (newValue >= 500 && newValue < 1000) {
        setStep(20);
        setValue(newValue);
        return;
      }
      if (newValue >= 1000 && newValue <= Infinity) {
        setStep(100);
        setValue(newValue);
        return;
      }
    }
  };
  console.log(formatnum);
  const handleInput = (e) => {
    const input = e.target;
    console.log(input.value, "input.value");
    let inputvalue = 0;
    if (type === "age") {
      inputvalue = Number(input.value);
    } else {
      inputvalue = Number(input.value) / 1000;
    }
    if (inputvalue > limit) return;
    setValue(formatnum(inputvalue));
  };
  useEffect(() => {
    props?.handleData(name, type === "age" ? value || "" : value * 1000 || "");
  }, [value]);
  return (
    <Box
      sx={{
        display: "flex",
        flexBasis: { md: "50%", xs: "none" },
        flexWrap: { xs: "wrap-reverse", md: "nowrap" },
        mr: 4,
        justifyContent: "space-between",
        gap: 7,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          width: "100%",
          flexWrap: { xs: "wrap-reverse", md: "nowrap" },
        }}
      >
        <Typography
          sx={{
            color: "#8F92A1",
            fontWeight: 500,
            fontFamily: "DM Sans",
            fontSize: "14px",
            letterSpacing: "-0.4px",
          }}
        >
          $0
        </Typography>
        <Slider
          value={value}
          name={name}
          step={step}
          color="primary"
          defaultValue={type === "age" ? 18 : 0}
          max={value + 100 <= limit ? value + 100 : limit}
          min={type === "age" ? 18 : 0}
          scale={type === "age" ? (value) => value : calculateValue}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          valueLabelDisplay={"auto"}
          aria-labelledby="non-linear-slider"
          sx={{
            width: { md: "305px", sx: "100%" },

            "& .MuiSlider-thumb": {
              width: "30px",
              color: "#0052CC",
              height: "30px",
              border: "8px solid #FFF",
              boxShadow: "0px 8px 16px rgba(0, 82, 204, 0.16)",
              "&:hover": {
                boxShadow: "0px 0px 0px 10px rgb(63 81 181 / 10%)",
              },
              "&:focus, &.Mui-active, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 12px rgb(63 81 181 / 16%)",
              },

              "& .MuiSlider-valueLabel": {
                backgroundColor: "#0052cc",
              },
            },
            "& .MuiSlider-rail": {
              color: "#8F92A1",
              height: "6.22px",
              opacity: 0.2,
            },
          }}
        />
      </Box>
      <ValidationTextField
        onKeyDown={blockInvalidChar}
        value={type === "age" ? value || "" : value * 1000 || ""}
        placeholder={type === "age" ? "18" : "0"}
        type="number"
        onChange={(e) => handleInput(e)}
        InputProps={{
          inputProps: { min: type === "age" ? 18 : 0, max: limit },
        }}
        sx={{
          "& input": {
            backgroundColor: "white",
          },
          minWidth: "197px",
          height: "46px",
          borderRadius: "16px",
          textAlign: "center",
        }}
        className="textfield"
      />
    </Box>
  );
}
function valueLabelFormat(value) {
  let scaledValue = value.toLocaleString();
  return `${scaledValue}`;
}
function calculateValue(value) {
  return value * 1000;
}
