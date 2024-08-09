import { Box, Typography } from "@mui/material";
import InputField from "../../../components/inputField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { AppleIcon, GoogleIcon, FacebookIcon } from "../../../utils";
import SimpleButton from "../../../components/simpleButton";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChangeEvent } from "react";
function SignUpForm() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    sellerType: "",
  });
  console.log(formData, "formData");
  const handelSingUp = async () => {
    try {
      //   navigate("/login");
      // }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  return (
    <>
      <Box sx={{ marginX: "15px", mt: 5 }}>
        <Box
          sx={{
            maxWidth: "690px",
            margin: "0 auto",
            borderRadius: "8px",
            boxShadow: "0px 0px 4px 0px #00000040",
            padding: "20px",
          }}
        >
          <Typography
            fontWeight={"600"}
            fontSize={"40px"}
            lineHeight={"54px"}
            textAlign={"center"}
            sx={{ pt: 3, pb: 1 }}
          >
            Sign up
          </Typography>
          <Typography textAlign={"center"} fontSize={16} lineHeight={"24px"}>
            Do have an account? Log in
          </Typography>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <InputField
              label="Name"
              Icon={PersonIcon}
              onChange={(e) => handleChange(e, "fullName")}
            />
            <InputField
              label="User Name"
              Icon={EmailIcon}
              onChange={(e) => handleChange(e, "username")}
            />
            <InputField
              label="Password"
              Icon={LockIcon}
              onChange={(e) => handleChange(e, "password")}
            />
            <InputField
              label="Confirm Password"
              Icon={LockIcon}
              onChange={(e) => handleChange(e, "confirmPassword")}
            />
            <InputField
              label="Seller Type"
              Icon={StorefrontIcon}
              onChange={(e) => handleChange(e, "sellerType")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <SimpleButton
              text="SignUp"
              sx={{
                width: "465px",
                height: "50px",
                "@media (max-width: 500px)": {
                  width: "400px",
                },
              }}
              onClick={() => handelSingUp()}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"end"}
            sx={{ gap: 2, marginY: "20px" }}
          >
            <img src={AppleIcon} alt="apple logo" />
            <img src={GoogleIcon} alt="google logo" />
            <img src={FacebookIcon} alt="facebook logo" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SignUpForm;
