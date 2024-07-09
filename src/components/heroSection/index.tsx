import { Box, Typography } from "@mui/material";
import { BackgroundImage } from "../../utils";

function HeroSection() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "calc(100vh - 100px)",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "white", paddingTop: "20vh", marginLeft: "5vw" }}
          >
            Make your shopping <br />
            better with. <br />
            BazarAf
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default HeroSection;
