import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Logo, MenuBar } from "../../utils";
import SimpleButton from "../simpleButton";

export default function Navbar({ isShowButtons }: { isShowButtons?: boolean }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          height: "100px",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 4 }}
            >
              <img src={MenuBar} alt="Logo" />
            </IconButton>
            <img src={Logo} alt="Logo" />
          </Box>

          {isShowButtons && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              <SimpleButton
                text="Login"
                sx={{
                  backgroundColor: "white",
                  color: "Login",
                  border: "1px solid black",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "primary.main",
                    borderColor: "black",
                  },
                }}
                onClick={() => {}}
              />
              <SimpleButton text="Signup" onClick={() => {}} />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
