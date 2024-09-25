import React, { ChangeEvent, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  useMediaQuery,
  useTheme,
  Autocomplete,
  TextField,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SloganIcon from "@mui/icons-material/EmojiObjects";
import LicenseIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationIcon from "@mui/icons-material/LocationOn";
import InputField from "../../components/inputField";
import SimpleButton from "../../components/simpleButton";
import CustomCheckbox from "../../components/checkbox/Checkbox";
import {
  getRestaurant,
  updateRestaurant,
  createRestaurant,
} from "../../api/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import UpdateIcon from "@mui/icons-material/Update";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { photoUpload } from "../../api/ThemeApi";
import { currencies } from "../../utils/currencies";
const Profile: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [restaurantData, setRestaurantData] = React.useState<any>();
  const [errors, setErrors] = React.useState<{
    [key: string]: string;
  }>({
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
    currency: "",
  });

  const { restaurant, accessToken, user } = useSelector(
    (state: RootState) => state.auth
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fetchResturnat = async () => {
    const response = await getRestaurant(
      accessToken,
      user,
      restaurant?.restaurantId
    );
    setRestaurantData(response);
    if (response) {
      setFormData({
        name: response.name,
        slogan: response.slogan,
        licenseNumber: response?.licenseNumber || "",
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
        currency: "",
      });
    }
  };

  useEffect(() => {
    fetchResturnat();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await photoUpload(file, accessToken);
      setFormData({ ...formData, brandImageUrl: res.imageUrl });
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (name === "address") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [name]: e.target.value,
        },
      }));
    } else if (name === "openingHours") {
      const timeValue = e.target.value; // "18:20"
      const [hours, minutes] = timeValue.split(":");
      const date = new Date();
      date.setHours(Number(hours));
      date.setMinutes(Number(minutes));
      date.setMinutes(Number(minutes));
      date.setSeconds(0);
      date.setMilliseconds(0);
      const isoString = date.toISOString(); // "2024-07-31T03:59:30.532Z"
      setFormData((prevFormData) => ({ ...prevFormData, [name]: isoString }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.value,
      }));
    }
  };
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
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

  const handelSubmit = async () => {
    const res = validateForm();
    if (res && !restaurantData) {
      toast.error("Please fill all the required fields");
    } else {
      restaurantData
        ? await updateRestaurant(
            accessToken,
            user,
            restaurant.restaurantId,
            formData as any
          )
        : createRestaurant(accessToken, user, formData);
      toast.success(
        restaurantData
          ? "Restaurant Updated Successfully"
          : "Restaurant Created Successfully"
      );
    }
  };

  const formatTime = (isoString: string | number | Date) => {
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
          <div>
            <Avatar
              alt="profile"
              src={formData.brandImageUrl}
              sx={{ width: 100, height: 100 }}
              onClick={handleAvatarClick}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
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
            Icon={FiberManualRecordIcon}
            iconColor="#5BB28B"
            onChange={(e) => handleChange(e, "name")}
            value={formData.name}
            disabled={restaurantData ? true : false}
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

          <Box sx={{ marginTop: "10px" }}>
            <Autocomplete
              disablePortal
              options={currencies}
              onChange={(_event, currency) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  currency: currency?.cc ?? "",
                }));
              }}
              sx={{ width: "100%", maxWidth: "470px", margin: "auto" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Currency"
                  sx={{
                    borderRadius: "10px", // Set the border radius
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px", // Ensure the input box has rounded borders
                      borderColor: "grey.400", // Set the border color
                      "& fieldset": {
                        borderColor: "grey.400", // Ensure the border color applies correctly
                        borderWidth: "1px", // Set the default border width
                      },
                      "&:hover fieldset": {
                        borderColor: "grey.400", // Keep the border color consistent on hover
                        borderWidth: "1px", // Ensure the border width remains 1px on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "grey.400", // Keep the border color consistent on focus
                        borderWidth: "1px", // Prevent the border width from increasing on focus
                      },
                      "&:focus": {
                        outline: "none", // Remove the outline on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "grey.500", // Set the label color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "grey.500", // Prevent the label color from changing on focus
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              ml: { sx: 0, sm: 11 },
              width: { sx: "470px", sm: "470px" },
            }}
          >
            <InputField
              type="time"
              label="Opening Hours"
              Icon={UpdateIcon}
              onChange={(e) => handleChange(e, "openingHours")}
              value={formatTime(formData.openingHours)}
              sx={{ mr: 5 }}
            />
            <InputField
              label="Delivery Time"
              Icon={AccessTimeIcon}
              onChange={(e) => handleChange(e, "deliveryTime")}
              value={formData.deliveryTime}
            />
          </Box>
          <Box
            sx={{
              mt: 2,
              ml: { sx: 0, sm: 11 },
              width: { sx: "355px", sm: "470px" },
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
