import React from "react";
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InputField from "../../components/inputField";
import SimpleButton from "../../components/simpleButton";
import CustomCheckbox from "../../components/checkbox/Checkbox";
import TableComponent from "../../components/table";
import DropdownComponent from "../../components/dropDown";

const data = [
  {
    areaName: "Modal Town",
    city: "Lahore",
    order: "2",
    Dfee: "12$",
    store: "Burger Shop",
  },
];

const StaffMember: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ marginX: "15px" }}>
      <Box
        sx={{
          maxWidth: "690px",
          margin: "0 auto",
          borderRadius: "8px",
          boxShadow: "0px 0px 4px 0px #00000040",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt="staff"
            src="path-to-your-image-scan.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <Typography
            fontWeight={"600"}
            fontSize={"40px"}
            lineHeight={"54px"}
            textAlign={"center"}
            sx={{ pt: 0, pb: 1 }}
          >
            Add Staff
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputField label="Name" Icon={PersonIcon} onChange={() => {}} />
          <InputField label="UserName" Icon={PersonIcon} onChange={() => {}} />
          <InputField label="Email" Icon={EmailIcon} onChange={() => {}} />
          <InputField
            label="Phone Number"
            Icon={PhoneIcon}
            onChange={() => {}}
          />
          <Box
            sx={{
              width: isMobile ? "355px" : "470px",
              margin: "0 auto",
              mt: 3,
            }}
          >
            <DropdownComponent
              title="Role"
              value={""}
              onChange={() => {
                ("");
              }}
            />
          </Box>
          <CustomCheckbox
            label="isActive"
            sx={{
              width: isMobile ? "355px" : "470px",
              margin: "0 auto",
              mt: 1,
            }}
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
            text="Save"
            sx={{ width: "465px", height: "50px" }}
            onClick={() => ""}
          />
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: "690px",
          margin: "0 auto",
          mt: 3,
          "@media (max-width: 500px)": {
            padding: "0px",
            mt: 2,
          },
        }}
      >
        <TableComponent
          rows={data}
          h1="Name"
          h2="Email"
          h3="Phone Number"
          h4="Role"
          h5="isActive"
          h6="Edit/Delete"
          deleteHandel={() => {}}
          editHandel={() => {}}
          id={"tableId"}
        />
      </Box>
    </Box>
  );
};

export default StaffMember;
