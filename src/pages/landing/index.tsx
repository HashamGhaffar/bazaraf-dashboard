import React from "react";
import Navbar from "../../components/navbar";
import HeroSection from "../../components/heroSection";
import { Box } from "@mui/material";

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Navbar isShowButtons />
      <HeroSection />
    </Box>
  );
};

export default LandingPage;
