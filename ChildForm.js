import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { Typography, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { NumericFormat } from "react-number-format";

import {
  ValidationTextField,
  BpIcon,
  BpCheckedIcon,
  blockInvalidChar,
  SelectBox,
} from "../../constant/constant";
import Radio from "@mui/material/Radio";
function ChildForm(props) {
  const { data, setInputData, count, fieldValidation, error } = props;
  const [select, setSelect] = useState("");

  const handleSelect = (e) => {
    const { value } = e.target;
    setSelect(value);
    if (value === "collegetype") {
      data[count] = { ...data[count], ["target_college_fee"]: "107280" };
      setInputData([...data]);
    }
    if (data[count] !== undefined && value !== "collegetype") {
      data[count] = { ...data[count], ["target_college_fee"]: "" };
      setInputData([...data]);
    }
  };
  console.log(data, "checknull");
  useEffect(() => {
    if (data.length === 0) {
      data[count] = { ...data[count], ["target_college_fee"]: "107280" };
      setInputData([...data]);
    }
  }, [data]);
  console.log(data, "new");
  const handleChange = (e) => {
    const { name, value } = e.target;
    let checkField = validateForm(name, value);
    data[count] = {
      ...data[count],
      assumed_age_to_college: "18",
      [name]: value,
    };
    error[count] = { ...error[count], ...checkField };
    setInputData([...data]);
    fieldValidation([...error]);
  };
  const validateForm = (name, value) => {
    let validationerr = {};
    let reg = /^\d+$/;
    if (name === "current_age") {
      if (value === "") {
        validationerr["current_age"] = "Required";
      } else if (value >= 100) {
        validationerr["current_age"] = "Invalid Age";
      } else if (!reg.test(value)) {
        validationerr["current_age"] = "Invalid Age";
      } else {
        validationerr["current_age"] = "";
      }
    }
    if (name === "percentage_of_fee_covered") {
      if (value === "") {
        validationerr["percentage_of_fee_covered"] = "Required";
      } else {
        validationerr["percentage_of_fee_covered"] = "";
      }
    }
    if (name === "current_saving") {
      if (value === "") {
        validationerr["current_saving"] = "Required";
      } else {
        validationerr["current_saving"] = "";
      }
    }
    if (name === "current_saving_per_month") {
      if (value === "") {
        validationerr["current_saving_per_month"] = "Required";
      } else {
        validationerr["current_saving_per_month"] = "";
      }
    }
    if (name === "target_college_fee") {
      if (value === "") {
        validationerr["target_college_fee"] = "Required";
      } else {
        validationerr["target_college_fee"] = "";
      }
    }
    return validationerr;
  };
  return (
    <Box sx={{ py: 2, minWidth: { md: "720px", xs: "auto" } }}>
      <Typography
        sx={{
          borderTopRightRadius: "22px",
          borderTopLeftRadius: "22px",
          textAlign: "center",
          backgroundColor: "#2837A3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "16px",
          fontWeight: 700,
          fontFamily: "DM Sans",
          letterSpacing: "-0.4px",
          lineHeight: "22px",
          height: "64px",
        }}
      >
        Child {count + 1}
      </Typography>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "100%" },
          boxShadow: 1,
          borderRadius: "22px",
          backgroundColor: "#F3F4FD",
          p: 6,
          pl: { md: 11, xs: 4 },
          pr: { md: 7, xs: 4 },
        }}
        noValidate
        autoComplete="on"
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 1,
            justifyContent: { md: "space-between", xs: "start" },
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            sx={{
              letterSpacing: "-0.4px",
              fontFamily: "DM Sans",
              fontSize: "16px",
              fontWeight: 500,
              color: "#1D1F27",
              lineHeight: "20.83px",
            }}
          >
            Age of child
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 1,
              justifyContent: "center",
              width: "249px",
            }}
          >
            <ValidationTextField
              error={error[count]?.["current_age"] ? true : false}
              sx={{
                width: { md: "98px", xs: "100%" },
                backgroundColor: "white",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "DM Sans",
              }}
              onKeyPress={(e) => {
                blockInvalidChar(e);
              }}
              id="standard-basic"
              className="textfield"
              value={data[count]?.["current_age"] || ""}
              name="current_age"
              type="text"
              placeholder="0"
              autoComplete="off"
              min={0}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    sx={{ color: "white", display: "none" }}
                    position="center"
                  >
                    {data[count]?.["current_age"] ? "" : <span>0</span>}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              label={
                error[count]?.["current_age"]
                  ? error[count]?.["current_age"]
                  : ""
              }
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 1,
            justifyContent: { md: "space-between", xs: "start" },
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            sx={{
              letterSpacing: "-0.4px",
              color: "#1D1F27",
              fontFamily: "DM Sans",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "20.83px",
            }}
          >
            How much have you already saved <br /> for Child 1 college?
          </Typography>
          <NumericFormat
            customInput={ValidationTextField}
            thousandsGroupStyle="thousend"
            thousandSeparator=","
            error={error[count]?.["current_saving"] ? true : false}
            onKeyPress={(e) => {
              blockInvalidChar(e);
            }}
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <InputAdornment sx={{ textAlign: "center" }} position="center">
                  {data[count]?.["current_saving"] ? (
                    <span
                      style={{
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: 700,
                        fontFamily: "DM Sans",
                      }}
                    >
                      $
                    </span>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: { md: "249px", xs: "100%" },
              backgroundColor: "white",
              borderRadius: "16px",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "DM Sans",
            }}
            placeholder="$0"
            id="standard-basic"
            autoComplete="off"
            className="textfield"
            onChange={(e) => handleChange(e)}
            value={data[count]?.["current_saving"] || ""}
            type="text"
            name="current_saving"
            variant="outlined"
            label={
              error[count]?.["current_saving"]
                ? error[count]?.["current_saving"]
                : ""
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 1,
            justifyContent: { md: "space-between", xs: "start" },
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "-0.4px",
              color: "#1D1F27",
              fontFamily: "DM Sans",
              lineHeight: "20.83px",
            }}
          >
            How much do you contribute every month?{" "}
          </Typography>
          <NumericFormat
            customInput={ValidationTextField}
            thousandsGroupStyle="thousend"
            thousandSeparator=","
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <InputAdornment sx={{ textAlign: "center" }} position="center">
                  {data[count]?.["current_saving_per_month"] ? (
                    <span
                      style={{
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: 700,
                        fontFamily: "DM Sans",
                      }}
                    >
                      $
                    </span>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              blockInvalidChar(e);
            }}
            error={error[count]?.["current_saving_per_month"] ? true : false}
            id="standard-basic"
            onChange={(e) => handleChange(e)}
            value={data[count]?.["current_saving_per_month"] || ""}
            type="text"
            sx={{
              minWidth: { md: "249px", xs: "100%" },
              backgroundColor: "white",
              borderRadius: "16px",
            }}
            autoComplete="off"
            className="textfield"
            name="current_saving_per_month"
            variant="outlined"
            placeholder="$0"
            label={
              error[count]?.["current_saving_per_month"]
                ? error[count]?.["current_saving_per_month"]
                : ""
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 1,
            justifyContent: { md: "space-between", xs: "start" },
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            sx={{
              color: "#1D1F27",
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "-0.4px",
              fontFamily: "DM Sans",
              lineHeight: "20.83px",
            }}
          >
            College Cost
            <br />
            <span
              style={{
                color: "#8F92A1",
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: "DM Sans",
                lineHeight: "20.83px",
                letterSpacing: "-0.4px",
              }}
            >
              (Total 4-year Cost)
            </span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <FormControl>
              <RadioGroup
                defaultValue="collegetype"
                row
                onChange={(e) => handleSelect(e)}
                sx={{
                  display: "flex",
                  flexWrap: { xs: "wrap", md: "nowrap" },
                  justifyContent: { md: "end", xs: "start" },
                  pb: 1,
                  ml: { md: 7, xs: "auto" },
                  alignItems: "center",
                  width: "100%",
                }}
                aria-labelledby="demo-customized-radios"
                name="customized-radios"
              >
                <FormControlLabel
                  sx={{
                    "&$checked": {
                      color: "red",
                    },
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#130F26",
                      letterSpacing: "0.2px",
                    },
                  }}
                  onChange={(e) => handleSelect(e)}
                  value="collegetype"
                  control={<BpRadio />}
                  label="College Type"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#130F26",
                      letterSpacing: "0.2px",
                    },
                  }}
                  value="collegeyear"
                  control={<BpRadio />}
                  label="Custom Cost: 4-Year"
                />
              </RadioGroup>
            </FormControl>
            {select === "collegeyear" ? (
              <NumericFormat
                customInput={ValidationTextField}
                thousandsGroupStyle="thousend"
                thousandSeparator=","
                InputProps={{
                  inputProps: { min: 0 },
                  startAdornment: (
                    <InputAdornment
                      sx={{ textAlign: "center" }}
                      position="center"
                    >
                      {data[count]?.["target_college_fee"] ? (
                        <span
                          style={{
                            color: "#000000",
                            fontSize: "14px",
                            fontWeight: 700,
                            fontFamily: "DM Sans",
                          }}
                        >
                          $
                        </span>
                      ) : (
                        ""
                      )}
                    </InputAdornment>
                  ),
                }}
                onKeyPress={(e) => {
                  blockInvalidChar(e);
                }}
                error={error[count]?.["target_college_fee"] ? true : false}
                onChange={(e) => handleChange(e)}
                placeholder="$0"
                sx={{
                  minWidth: { md: "249px", xs: "100%" },
                  backgroundColor: "white",
                  borderRadius: "16px",
                }}
                value={data[count]?.["target_college_fee"] || ""}
                type="text"
                autoComplete="off"
                id="outlined"
                className="textfield"
                name="target_college_fee"
                variant="outlined"
                label={
                  error[count]?.["target_college_fee"]
                    ? error[count]?.["target_college_fee"]
                    : ""
                }
              />
            ) : (
              <FormControl sx={{ minWidth: { md: "249px", xs: "100%" } }}>
                <InputLabel id="demo-simple-select-helper-label"></InputLabel>

                <SelectBox
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: "16px",
                        "& .MuiMenuItem-root": {
                          padding: 2,
                        },
                        "&& .Mui-selected": {
                          color: "#0052CC",
                        },
                      },
                    },
                  }}
                  sx={{
                    borderRadius: "16px",
                    textAlign: "center",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0052CC",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0052CC",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#2F80ED",
                    },
                    backgroundColor: "white",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    letterSpacing: "-.2px",
                    width: "100%",
                    color: "#000000",
                  }}
                  name="target_college_fee"
                  onChange={(e) => handleChange(e)}
                  value={data[count]?.["target_college_fee"] || "Select"}
                >
                  <MenuItem
                    sx={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "-.2px",
                      color: "#0052CC",
                    }}
                    value="107280"
                  >
                    <span
                      style={{
                        color: "#000000",
                        fontSize: "14px",
                        letterSpacing: "-0.2px",
                        fontWeight: 700,
                        fontFamily: "DM Sans",
                      }}
                    >
                      Public In-State
                    </span>
                    <b>: $107,280</b>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "-.2px",
                      width: "100%",
                      textAlign: "center",
                      color: "#0052CC",
                    }}
                    value="173,120"
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        color: "#000000",
                        fontSize: "14px",
                        letterSpacing: "-0.2px",
                        fontWeight: 700,
                      }}
                    >
                      Public Out-State
                    </span>
                    <b>: $173,120</b>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                      letterSpacing: "-.2px",
                      color: "#0052CC",
                    }}
                    value="219,520"
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        color: "#000000",
                        fontSize: "14px",
                        letterSpacing: "-0.2px",
                        fontWeight: 700,
                      }}
                    >
                      Private
                    </span>{" "}
                    <b>: $219,520</b>
                  </MenuItem>
                </SelectBox>
              </FormControl>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 1,
            justifyContent: { md: "space-between", xs: "start" },
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              letterSpacing: "-0.4px",
              fontFamily: "DM Sans",
              color: "#1D1F27",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "20.83px",
            }}
          >
            {" "}
            % You Plan to Fund
          </Typography>
          <NumericFormat
            allowNegative={false}
            customInput={ValidationTextField}
            thousandsGroupStyle="thousend"
            thousandSeparator=","
            suffix="%"
            error={error[count]?.["percentage_of_fee_covered"] ? true : false}
            sx={{
              minWidth: { md: "249px", xs: "100%" },
              backgroundColor: "white",
              borderRadius: "16px",
            }}
            id="outlined"
            autoComplete="off"
            placeholder="100%"
            className="textfield"
            onChange={(e) => handleChange(e)}
            value={data[count]?.["percentage_of_fee_covered"] || ""}
            type="text"
            name="percentage_of_fee_covered"
            variant="outlined"
            label={
              error[count]?.["percentage_of_fee_covered"]
                ? error[count]?.["percentage_of_fee_covered"]
                : ""
            }
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ChildForm;
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
