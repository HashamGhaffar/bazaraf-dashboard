import { Box, SelectChangeEvent, Typography } from "@mui/material";
import InputField from "../../../components/inputField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
// import { AppleIcon, GoogleIcon, FacebookIcon } from "../../../utils";
import SimpleButton from "../../../components/simpleButton";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import DropdownComponent from "../../../components/dropDown";
import { toast } from "react-toastify";
import { authSignUp } from "../../../api/AuthApi";
import { SellerType } from "../../../type";

const sellerTypes: SellerType[] = [SellerType.BUSINESS, SellerType.INDIVIDUAL];

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    sellerType: "",
  });
  const handelSingUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // API call for sign up authSignUp
      await authSignUp({
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        sellerType: formData.sellerType as SellerType,
      });
      //
      navigate("/login");
    } catch (error) {
      console.error(error, "error");
    }
  };

  const validateForm = () => {
    // Basic regex for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.username ||
      !formData.fullName ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.sellerType
    ) {
      console.table(formData);
      toast.error("Please enter all fields");
      return false;
    }

    // Check if email is valid
    if (!emailRegex.test(formData.username)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and confirmed password are not the same");
      return false;
    }

    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleDropdownChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setFormData({ ...formData, sellerType: value });
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
          <Box
            sx={{ cursor: "pointer", "&:hover": { color: "#5BB28B" } }}
            onClick={() => navigate("/login")}
          >
            <Typography textAlign={"center"} fontSize={16} lineHeight={"24px"}>
              Do you have an account? Log in
            </Typography>
          </Box>
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
              label="Username"
              Icon={EmailIcon}
              onChange={(e) => handleChange(e, "username")}
            />
            <InputField
              label="Password"
              type="password"
              Icon={LockIcon}
              onChange={(e) => handleChange(e, "password")}
            />
            <InputField
              label="Confirm Password"
              type="password"
              Icon={LockIcon}
              onChange={(e) => handleChange(e, "confirmPassword")}
            />
            <Box
              sx={{
                maxWidth: "470px",
                margin: "10px auto 0 auto",
              }}
            >
              <DropdownComponent
                title={"Seller Type"}
                value={formData.sellerType}
                data={sellerTypes}
                onChange={handleDropdownChange}
              />
            </Box>
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
          {/* <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"end"}
            sx={{ gap: 2, marginY: "20px" }}
          >
            <img src={AppleIcon} alt="apple logo" />
            <img src={GoogleIcon} alt="google logo" />
            <img src={FacebookIcon} alt="facebook logo" />
          </Box> */}
        </Box>
      </Box>
    </>
  );
}

export default SignUpForm;
