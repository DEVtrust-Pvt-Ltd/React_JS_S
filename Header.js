import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import images from "../../assets/images/Top.png";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { timeperiods, days, months } from "../../constant/constant";
const Header = () => {
  const [gretting, setGretting] = useState("");
  const [day, setDay] = useState("");
  const styles = {
    paperContainer: {
      backgroundImage: `url(${images})`,
      objectPosition: "center",
      objectFit: "cover",
      backgroundRepeat: "no-repeat",
      position: "relative",
    },
  };

  const getTimeanddate = () => {
    const systemdateanddate = new Date();
    let grett = "";
    const getday = days[systemdateanddate.getDay()];
    const date = systemdateanddate.getDate();
    const month = months[systemdateanddate.getMonth()];
    const year = systemdateanddate.getFullYear();
    const hours = systemdateanddate.getHours();
    const datemonth = getday + " " + date + " " + month + " " + year + " ";
    if (hours >= 5 && hours < 12) {
      grett = timeperiods[0];
    } else if (hours >= 12 && hours < 17) {
      grett = timeperiods[1];
    } else {
      grett = timeperiods[2];
    }
    setDay(datemonth);
    setGretting(grett);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTimeanddate();
    }, 1000);
    getTimeanddate();
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Box
      style={styles.paperContainer}
      sx={{
        minHeight: "322px",
        backgroundSize: { md: "100%", xs: "cover" },
        px: { md: 13, xs: "auto" },
      }}
    >
      <Navbar />
      <Container>
        <Box sx={{ color: "white", mt: 5, width: { md: "50%", xs: "100%" } }}>
          <Typography
            variant="h3"
            fontSize="30px"
            sx={{
              lineHeightStep: "36px",
              fontFamily: "DM Sans",
              fontWeight: 700,
              letterSpacing: "-0.4px",
              lineHeight: "36px",
            }}
          >
            {gretting} Robin
          </Typography>
          <Typography
            variant="h6"
            sx={{
              letterSpacing: "-0.4px",
              pt: 1,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              fontFamily: "DM Sans",
            }}
          >
            {day}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
