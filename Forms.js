import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import lefticon from "../../assets/images/lefticon.png";
import ChildForm from "../childForm/ChildForm";
import "./Form.css";
import { SelectBox, ValidationTextField } from "../../constant/constant";
import { NumericFormat } from "react-number-format";
import { setChildData } from "../../store/actions";
import { useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const Forms = () => {
  let obj = {
    current_age: "",
    current_saving: "",
    current_saving_per_month: "",
    target_college_fee: "107280",
    percentage_of_fee_covered: "100%",
  };
  const [count, setCount] = useState(1);
  const [data, setData] = useState([obj]);
  const [btndisable, setBtnDisable] = useState(true);
  const [error, setError] = useState([]);
  const [assumption, setAssumption] = useState({
    est_net_return: "4.00%",
    est_growth_college_fee: "5.00%",
  });
  const [assumptionerr, setAssumptionerr] = useState({});
  const dispatch = useDispatch();
  const handleFormLength = (e) => {
    let { value } = e.target;
    setCount(value);
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    let checkField = validate(name, value);
    setAssumption({ ...assumption, [name]: value });
    setAssumptionerr({ ...assumptionerr, ...checkField });
  };
  useEffect(() => {
    let newobj = [...Array(Number(count))].map((item) => {
      console.log(item, "random");
      return obj;
    });
    setData(newobj);
  }, [count]);
  useEffect(() => {
    const result = [
      ...new Set(
        data?.flatMap((obj) =>
          Object.keys(obj).filter(
            (key) =>
              obj[key] === "" ||
              obj[key] == "0" ||
              obj[key] === undefined ||
              obj["current_age"] > 100
          )
        )
      ),
    ];

    if (result.length === 0) {
      setBtnDisable(false);
      return;
    }
    setBtnDisable(true);
  }, [data]);
  const handleSubmit = async () => {
    console.log(data, "checknull");
    if (data.length != 0 && btndisable === false) {
      data?.map((item) => {
        var keyse = Object.keys(item);
        for (var i in keyse) {
          console.log(item[keyse[i]]);
          item[keyse[i]] = parseFloat(
            item[keyse[i]].toString()?.replace(/,/g, "")
          );
        }
      });
      const childdata = {
        assumption,
        kids: data,
      };
      if (btndisable === false) {
        dispatch(setChildData(childdata));
      }
    }
  };
  console.log(btndisable);
  const handleBtnDisable = (status) => {
    setBtnDisable(status);
  };

  const fieldValidation = useCallback(
    (fielderror) => {
      setError(fielderror);
    },
    [error]
  );

  const setInputData = useCallback(
    (datas) => {
      setData(datas);
    },
    [data]
  );

  const childForms = useMemo(() => {
    return [...Array(count)].map((item, index) => (
      <ChildForm
        count={index}
        key={index}
        data={data}
        error={error}
        setInputData={setInputData}
        handleBtnDisable={handleBtnDisable}
        fieldValidation={fieldValidation}
      />
    ));
  }, [count, setInputData, handleBtnDisable, fieldValidation]);
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 16px 44px rgba(176, 183, 195, 0.14)",
        mb: 4,
        maxWidth: { md: "1090px", xs: "auto" },
        p: 2,
        borderRadius: "22px",
        pt: 7,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { md: 19, sx: 10 },
            maxWidth: { md: "718px", xs: "auto" },
            justifyContent: "center",
            mr: { md: 3, xs: 0 },
            width: "100%",
            flexWrap: { xs: "wrap", md: "nowrap" },
            alignItems: "center",
            py: 0,
            color: "#4154DC",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "DM Sans",
              letterSpacing: "-0.4px",
              lineHeight: "20.83px",
            }}
          >
            How many children do you have?
          </Typography>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <SelectBox
                data-testid="chlid"
                labelId="chlid"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "16px",
                      "& .MuiMenuItem-root": {
                        padding: 2,
                      },
                    },
                  },
                }}
                sx={{
                  borderRadius: "16px",
                  textAlign: "center",
                  width: "98px",
                  height: "46px",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0052CC",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0052CC",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#2F80ED",
                  },
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "DM Sans",
                }}
                displayEmpty
                onChange={(e) => {
                  handleFormLength(e);
                }}
                value={count}
              >
                <MenuItem
                  sx={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  value={1}
                >
                  1
                </MenuItem>
                <MenuItem
                  sx={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  value={2}
                >
                  2
                </MenuItem>
                <MenuItem
                  sx={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  value={3}
                >
                  3
                </MenuItem>
                <MenuItem
                  sx={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  value={4}
                >
                  4
                </MenuItem>
                <MenuItem
                  sx={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  value={5}
                >
                  5
                </MenuItem>
                <MenuItem
                  sx={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  value={6}
                >
                  6
                </MenuItem>
              </SelectBox>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        className="formfield"
        sx={{
          maxWidth: { md: "718px", xs: "auto" },
          display: "block",
          mx: "auto",
          my: "20px",
        }}
      >
        {childForms}
        <Box>
          <Accordion sx={{ boxShadow: 0, borderTop: "none", outline: "none" }}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "& .MuiAccordionSummary-content": {
                  flexGrow: 0,
                },
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  pb: 0,
                  pt: 1,
                  color: "#979797",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "-0.4px",
                  fontFamily: "DM Sans",
                  pl: { md: 15, xs: 4 },
                  lineHeight: "26.04px",
                }}
              >
                View/ Edit Assumptions
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  borderRadius: "22px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  pl: { md: "0px", xs: "auto" },
                }}
              >
                <Box
                  sx={{
                    pb: 2,
                    borderRadius: "22px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    pl: { md: "80px", xs: "auto" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: { xs: "wrap", md: "nowrap" },
                      gap: { md: 10, xs: 2 },
                      alignItems: "center",
                      py: 2,
                      px: 5,
                    }}
                  >
                    <Typography
                      sx={{
                        letterSpacing: "-0.4px",
                        fontFamily: "DM Sans",
                        color: "#1D1F27",
                        fontSize: "16px",
                        lineHeight: "20.83px",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      Net Annual Return of College Savings{" "}
                    </Typography>
                    <NumericFormat
                      customInput={ValidationTextField}
                      allowNegative={false}
                      thousandsGroupStyle="thousend"
                      thousandSeparator=","
                      suffix="%"
                      placeholder="5.00%"
                      sx={{
                        width: { md: "131px", xs: "100%" },
                        "& input": { color: " #000000", opacity: "100%" },
                        "& input::placeholder": {
                          textAlign: "start",
                          color: " #8F92A1",
                        },
                      }}
                      onChange={(e) => handleChange(e)}
                      id="standard-basic"
                      className="textfield"
                      value={assumption["est_net_return"]}
                      type="text"
                      name="est_net_return"
                      variant="outlined"
                      error={assumptionerr?.["est_net_return"] ? true : false}
                      label={
                        assumptionerr?.["est_net_return"]
                          ? assumptionerr?.["est_net_return"]
                          : ""
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: { xs: "wrap", md: "nowrap" },
                      gap: { md: 10, xs: 2 },
                      alignItems: "center",
                      pt: 2,
                      px: 5,
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
                      Annual Growth Rate in College Fees &nbsp; &nbsp;
                    </Typography>
                    <NumericFormat
                      customInput={ValidationTextField}
                      thousandsGroupStyle="thousend"
                      thousandSeparator=","
                      suffix="%"
                      id="standard-basic"
                      allowNegative={false}
                      className="textfield"
                      placeholder="4.00%"
                      onChange={(e) => handleChange(e)}
                      value={assumption["est_growth_college_fee"]}
                      type="text"
                      name="est_growth_college_fee"
                      variant="outlined"
                      error={
                        assumptionerr?.["est_growth_college_fee"] ? true : false
                      }
                      label={
                        assumptionerr?.["est_growth_college_fee"]
                          ? assumptionerr?.["est_growth_college_fee"]
                          : ""
                      }
                      sx={{
                        width: { md: "131px", xs: "100%" },
                        "& input": { color: " #000000", opacity: "100%" },
                        "& input::placeholder": {
                          textAlign: "start",
                          color: " #8F92A1",
                        },
                        colorSecondary: {
                          color: "#FFFFFF",
                          "&$checked": {
                            color: "hotpink",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { md: "end", xs: "center" },
          pb: 5,
          mr: { md: 4, xs: 0 },
        }}
      >
        <Button
          disabled={btndisable}
          onClick={() => handleSubmit()}
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
            color: btndisable ? "#c4c4c4" : "#FFFFFF",
            fontFamily: "DM Sans",
            borderRadius: 0,
            boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
          style={{ backgroundColor: btndisable ? "#c4c4c4" : "#4FBF67" }}
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
              SUBMIT
            </Typography>
            <img
              style={{ opacity: btndisable ? "25%" : "100%" }}
              src={lefticon}
            />
          </Box>
        </Button>
      </Box>
    </Container>
  );
};

export default Forms;

const validate = (name, value) => {
  let validationerr = {};
  if (name == "est_net_return") {
    if (value === "" || undefined) {
      validationerr["est_net_return"] = "Required";
    } else {
      validationerr["est_net_return"] = "";
    }
  }
  if (name == "est_growth_college_fee") {
    if (value === "" || undefined) {
      validationerr["est_growth_college_fee"] = "Required";
    } else {
      validationerr["est_growth_college_fee"] = "";
    }
  }
  return validationerr;
};
