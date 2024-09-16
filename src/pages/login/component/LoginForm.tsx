import { Box, Typography } from "@mui/material";
import InputField from "../../../components/inputField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { AppleIcon, GoogleIcon, FacebookIcon } from "../../../utils";
import SimpleButton from "../../../components/simpleButton";
import { ChangeEvent, useState } from "react";
import { authLoginUser } from "../../../api/AuthApi";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../../../store/AuthSlice/index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    usernameError: "",
    passwordError: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  const dispatch = useDispatch();
  const validateForm = () => {
    let valid = true;
    const { username, password } = formData;
    const errorsCopy = { ...errors };

    if (!username) {
      errorsCopy.usernameError = "Email or User Name is required";
      valid = false;
    } else if (!emailRegex.test(username)) {
      errorsCopy.usernameError = "Invalid email address";
      valid = false;
    } else {
      errorsCopy.usernameError = "";
    }
    if (!password) {
      errorsCopy.passwordError = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      errorsCopy.passwordError = "Password must be at least 8 characters";
      valid = false;
    } else {
      errorsCopy.passwordError = "";
    }

    setErrors(errorsCopy);
    return valid;
  };
  const handelSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      console.log(formData, "formData");
      const response = await authLoginUser(formData);
      if (response.accessToken) {
        dispatch(setAccessToken(response?.accessToken || ""));
        dispatch(setRefreshToken(response?.refreshToken || ""));
        dispatch(setUser(response?.userId || ""));
        if (response) {
          navigate("/dashBoard");
        }
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    } catch (error) {
      console.log(error, "error");
    }
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
            Login
          </Typography>
          <Typography textAlign={"center"} fontSize={16} lineHeight={"24px"}>
            Don't have an account? SignUp
          </Typography>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <InputField
              label="Email"
              Icon={EmailIcon}
              onChange={(e) => handleChange(e, "username")}
              errorMessage={errors.usernameError}
            />
            <InputField
              label="Password"
              type="password"
              Icon={LockIcon}
              onChange={(e) => handleChange(e, "password")}
              errorMessage={errors.passwordError}
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
              text="Login"
              sx={{
                width: "465px",
                height: "50px",
                "@media (max-width: 500px)": {
                  width: "350px",
                },
              }}
              onClick={() => handelSubmit()}
            />
          </Box>
          <Typography
            textAlign={"center"}
            fontSize={16}
            lineHeight={"24px"}
            sx={{
              "@media (max-width: 500px)": {
                width: "350px",
                fontSize: "12px",
              },
            }}
          >
            _____________________________ OR ______________________________
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              padding: "20px",
              rowGap: 2,
            }}
          >
            <SimpleButton
              text="Login with Facebook"
              icon={FacebookIcon}
              sx={{
                width: "465px",
                height: "50px",
                fontSize: "18px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                fontWeight: "400",
                "&:hover": {
                  backgroundColor: "white",
                  borderColor: "black",
                },
                "@media (max-width: 500px)": {
                  width: "330px",
                },
              }}
              onClick={() => ""}
            />
            <SimpleButton
              text="Login with Google"
              icon={GoogleIcon}
              sx={{
                width: "465px",
                height: "50px",
                fontSize: "18px",
                backgroundColor: "white",
                color: "black",
                fontWeight: "400",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "white",
                  borderColor: "black",
                },
                "@media (max-width: 500px)": {
                  width: "330px",
                },
              }}
              onClick={() => ""}
            />
            <SimpleButton
              text="Login with Apple"
              icon={AppleIcon}
              sx={{
                width: "465px",
                height: "50px",
                fontSize: "18px",
                backgroundColor: "white",
                color: "black",
                fontWeight: "400",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "white",
                  borderColor: "black",
                },
                "@media (max-width: 500px)": {
                  width: "330px",
                },
              }}
              onClick={() => ""}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;
