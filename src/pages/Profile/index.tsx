import React, { ChangeEvent, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SloganIcon from "@mui/icons-material/EmojiObjects";
import LicenseIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationIcon from "@mui/icons-material/LocationOn";
import UpdateIcon from "@mui/icons-material/Update";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InputField from "../../components/inputField";
import SimpleButton from "../../components/simpleButton";
import CustomCheckbox from "../../components/checkbox/Checkbox";
import CustomInputField from "../../components/inputField/CustomInputField";
import {
  getRestaurant,
  updateRestaurant,
  createRestaurant,
} from "../../api/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [restaurantData, setRestaurantData] = React.useState<any>();
  const [errors, setErrors] = React.useState({
    nameError: "",
    sloganError: "",
    licenseNumberError: "",
    addressError: "",
    openingHoursError: "",
    phoneNumberError: "",
    deliveryTimeError: "",
    imageUrlError: "",
    brandImageUrlError: "",
    brandColorError: "",
  });

  const [formData, setFormData] = React.useState({
    name: "",
    slogan: "",
    licenseNumber: "",
    address: {
      addressId: "",
      city: "",
      postalCode: "",
      address: "",
    },
    openingHours: "",
    phoneNumber: "",
    hasDineIn: false,
    hasDriveThru: false,
    hasTakeAway: false,
    hasDelivery: false,
    deliveryTime: "",
    imageUrl: "",
    brandImageUrl: "",
    brandColor: "",
  });

  const { restaurant, accessToken, user } = useSelector(
    (state: RootState) => state.auth
  );
  const fetchResturnat = async () => {
    const response = await getRestaurant(
      accessToken,
      user,
      restaurant?.restaurantId
    );
    console.log(response);
    setRestaurantData(response);
    if (response) {
      setFormData({
        name: response.name,
        slogan: response.slogan,
        licenseNumber: response.licenseNumber,
        address: {
          addressId: response.address.addressId,
          city: response.address.city,
          postalCode: response.address.postalCode,
          address: response.address.address,
        },
        openingHours: response.openingHours,
        phoneNumber: response.phoneNumber,
        hasDineIn: response.hasDineIn,
        hasDriveThru: response.hasDriveThru,
        hasTakeAway: response.hasTakeAway,
        hasDelivery: response.hasDelivery,
        deliveryTime: response.deliveryTime,
        imageUrl: response.imageUrl,
        brandImageUrl: response.brandImageUrl,
        brandColor: response.brandColor,
      });
    }
  };

  useEffect(() => {
    fetchResturnat();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (name === "address") {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [e.target.name]: e.target.value,
        },
      });
    } else if (name === "openingHours") {
      const timeValue = e.target.value; // "18:20"
      const [hours, minutes] = timeValue.split(":");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);
      const isoString = date.toISOString(); // "2024-07-31T03:59:30.532Z"
      console.log("isoString", isoString);
      setFormData({ ...formData, [name]: isoString });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const validateForm = () => {
    let valid = true;

    const { name, slogan, licenseNumber, phoneNumber, address } = formData;
    const errorsCopy = { ...errors };

    const validationRules = [
      { field: name, errorKey: "nameError", errorMessage: "Name is required" },
      {
        field: slogan,
        errorKey: "sloganError",
        errorMessage: "Slogan is required",
      },
      {
        field: licenseNumber,
        errorKey: "licenseNumberError",
        errorMessage: "License Number is required",
      },
      {
        field: phoneNumber,
        errorKey: "phoneNumberError",
        errorMessage: "Phone Number is required",
      },
      {
        field: address.address,
        errorKey: "addressError",
        errorMessage: "Address is required",
      },
    ];

    validationRules.forEach(({ field, errorKey, errorMessage }) => {
      if (!field) {
        errorsCopy[errorKey] = errorMessage;
        valid = false;
      } else {
        errorsCopy[errorKey] = "";
      }
    });

    setErrors(errorsCopy);
    return valid;
  };

  // const validateForm = () => {
  //   let valid = true;

  //   const { name, slogan, licenseNumber, phoneNumber, address } = formData;
  //   const errorsCopy = { ...errors };

  //   if (!name) {
  //     errorsCopy.nameError = "Name is required";
  //     valid = false;
  //   } else {
  //     errorsCopy.nameError = "";
  //   }
  //   if (!slogan) {
  //     errorsCopy.sloganError = "Slogan is required";
  //     valid = false;
  //   } else {
  //     errorsCopy.sloganError = "";
  //   }
  //   if (!licenseNumber) {
  //     errorsCopy.licenseNumberError = "License Number is required";
  //     valid = false;
  //   } else {
  //     errorsCopy.licenseNumberError = "";
  //   }
  //   if (!phoneNumber) {
  //     errorsCopy.phoneNumberError = "Phone Number is required";
  //     valid = false;
  //   } else {
  //     errorsCopy.phoneNumberError = "";
  //   }
  //   if (!address.address) {
  //     errorsCopy.addressError = "Address is required";
  //     valid = false;
  //   } else {
  //     errorsCopy.addressError = "";
  //   }
  //   setErrors(errorsCopy);
  // };
  const handelSubmit = async () => {
    const res = validateForm();
    if (res) {
      toast.error("Please fill all the required fields");
    } else {
      console.log("payload", formData);
      const response = restaurantData
        ? await updateRestaurant(
            accessToken,
            user,
            restaurant.restaurantId,
            formData as any
          )
        : createRestaurant(accessToken, user, formData);
      console.log("Response", response);
      toast.success(
        restaurantData
          ? "Restaurant Updated Successfully"
          : "Restaurant Created Successfully"
      );
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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
            alt="profile"
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
            Profile
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputField
            label="Name"
            Icon={PersonIcon}
            onChange={(e) => handleChange(e, "name")}
            value={formData.name}
          />
          <InputField
            label="Slogan"
            Icon={SloganIcon}
            onChange={(e) => handleChange(e, "slogan")}
            value={formData.slogan}
          />
          <InputField
            label="License Number"
            Icon={LicenseIcon}
            onChange={(e) => handleChange(e, "licenseNumber")}
            value={formData.licenseNumber}
          />
          <InputField
            label="Phone"
            Icon={PhoneIcon}
            onChange={(e) => handleChange(e, "phoneNumber")}
            value={formData.phoneNumber}
          />
          <InputField
            label="Location"
            Icon={LocationIcon}
            onChange={(e) => handleChange(e, "address")}
            value={formData.address.address}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              ml: isMobile ? 0 : 11,
              width: isMobile ? "355px" : "470px",
              gap: 1,
            }}
          >
            <InputField
              type="time"
              label="Opening Hours"
              Icon={LocationIcon}
              onChange={(e) => handleChange(e, "openingHours")}
              value={formatTime(formData.openingHours)}
            />
            <InputField
              label="Delivery Time"
              Icon={LocationIcon}
              onChange={(e) => handleChange(e, "deliveryTime")}
              value={formData.deliveryTime}
            />
            {/* <CustomInputField
              label="Opening Hours"
              Icon={UpdateIcon}
              onChange={(e) => handleChange(e, "openingHours")}
            />
            <CustomInputField
              label="Delivery Time"
              Icon={AccessTimeIcon}
              onChange={(e) => handleChange(e, "deliveryTime")}
            /> */}
          </Box>
          <Box
            sx={{
              mt: 2,
              ml: isMobile ? 0 : 11,
              width: isMobile ? "355px" : "470px",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              <Grid item xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                <CustomCheckbox
                  label={"DriveThru"}
                  required={!formData.hasDriveThru}
                  value={formData.hasDriveThru}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      hasDriveThru: !formData.hasDriveThru,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                <CustomCheckbox
                  label={"DineIn"}
                  required={formData.hasDineIn}
                  value={formData.hasDineIn}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      hasDineIn: !formData.hasDineIn,
                    });
                  }}
                />
              </Grid>
              <Grid xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                <CustomCheckbox
                  label={"PickUp"}
                  required={formData.hasTakeAway}
                  value={formData.hasTakeAway}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      hasTakeAway: !formData.hasTakeAway,
                    });
                  }}
                />
              </Grid>
              <Grid xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                <CustomCheckbox
                  label={"Delivery"}
                  required={formData.hasDelivery}
                  value={formData.hasDelivery}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      hasDelivery: !formData.hasDelivery,
                    });
                  }}
                />
              </Grid>
            </Grid>
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
            text={restaurantData ? "Update" : "Save"}
            sx={{ width: "465px", height: "50px" }}
            onClick={() => {
              handelSubmit();
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
