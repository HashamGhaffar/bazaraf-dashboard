import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { Logo, MenuBar } from "../../utils";
import SimpleButton from "../simpleButton";

export default function Navbar({ isShowButtons }: { isShowButtons?: boolean }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          height: "100px",
          justifyContent: "center",
          "@media (max-width: 500px)": {
            height: "60px",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            width: "100%",
            margin: "10px 30px",
            "@media (max-width: 500px)": {
              margin: "0 10px",
              padding: "0 10px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              "@media (max-width: 500px)": {
                gap: 1,
              },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 4,
                "@media (max-width: 500px)": {
                  mr: 2,
                },
              }}
            >
              <img
                src={MenuBar}
                alt="Menu"
                style={{ width: "24px", height: "24px" }}
              />
            </IconButton>

            <img src={Logo} alt="Logo" style={{ height: "50px" }} />
          </Box>

          {isShowButtons && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                "@media (max-width: 500px)": {
                  flexDirection: "row",
                  gap: 1,
                },
              }}
            >
              <SimpleButton
                text="Login"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "primary.main",
                    borderColor: "black",
                  },
                  "@media (max-width: 600px)": {
                    width: "90px",
                    height: "40px",
                    fontSize: "16px",
                    mr: 1,
                  },
                }}
                onClick={() => navigate("/login")}
              />
              <SimpleButton
                text="Signup"
                sx={{
                  "@media (max-width: 600px)": {
                    width: "90px",
                    height: "40px",
                    fontSize: "16px",
                    mr: 1,
                  },
                }}
                onClick={() => navigate("/signup")}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
