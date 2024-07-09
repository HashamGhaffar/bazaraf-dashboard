import { Box, Typography } from "@mui/material";
import InputField from "../../../components/inputField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { AppleIcon, GoogleIcon, FacebookIcon } from "../../../utils";

function SignUpForm() {
  return (
    <>
      <Box sx={{ marginX: "20px", mt: 5 }}>
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
            <InputField label="Name" Icon={PersonIcon} onChange={() => {}} />
            <InputField label="Email" Icon={EmailIcon} onChange={() => {}} />
            <InputField label="Password" Icon={LockIcon} onChange={() => {}} />
            <InputField
              label="Confirm Password"
              Icon={LockIcon}
              onChange={() => {}}
            />
            <InputField
              label="Seller Type"
              Icon={StorefrontIcon}
              onChange={() => {}}
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
