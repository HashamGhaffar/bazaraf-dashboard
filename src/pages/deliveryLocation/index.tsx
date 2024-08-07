import { Box, Typography, Button } from "@mui/material";
import InputField from "../../components/inputField";
import SimpleButton from "../../components/simpleButton";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import NearMeIcon from "@mui/icons-material/NearMe";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationCity from "@mui/icons-material/LocationCity";
import TableComponent from "../../components/table";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import useDeliveryLocation from "./useDeliveryLocation";
import { ChangeEvent, useEffect, useState } from "react";
import { RootState } from "../../type";
import { useSelector } from "react-redux";
import {
  createDeliveryLocation,
  updateDeliveryLocation,
} from "../../api/DeliveryLocationApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DeliveryLocation() {
  const {
    data,
    loading,
    editDeliveryLocation,
    clearForm,
    editingDeliveryLocation,
    deleteDeliveryLocation,
    setDeliveryLocationData,
    startLoading,
    stopLoading,
  } = useDeliveryLocation();
  const initialData = editingDeliveryLocation?.deliveryLocation;
  const deliveryLocationId = editingDeliveryLocation?.deliveryLocationId;
  const [formData, setFormData] = useState({
    areaName: initialData?.areaName || "",
    city: initialData?.city || "",
    minimumOrder: initialData?.minimumOrder || "",
    deliveryFee: initialData?.deliveryFee || "",
    storeNextBy: initialData?.storeNextBy || "",
  });
  console.log("initialData", initialData);
  useEffect(() => {
    setFormData({
      areaName: initialData?.areaName || "",
      city: initialData?.city || "",
      minimumOrder: initialData?.minimumOrder || "",
      deliveryFee: initialData?.deliveryFee || "",
      storeNextBy: initialData?.storeNextBy || "",
    });
  }, [initialData]);
  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  const validateForm = () => {
    let valid = true;
    const { areaName, city, minimumOrder, deliveryFee, storeNextBy } = formData;
    if (!areaName) {
      valid = false;
    }
    if (!city) {
      valid = false;
    }
    if (!minimumOrder) {
      valid = false;
    }
    if (!deliveryFee) {
      valid = false;
    }
    if (!storeNextBy) {
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return toast.error("All fields are required");
    }
    try {
      startLoading();
      const response = deliveryLocationId
        ? await updateDeliveryLocation(
          accessToken,
          restaurant?.restaurantId,
          deliveryLocationId,
          {
            areaName: formData.areaName,
            city: formData.city,
            minimumOrder: formData.minimumOrder as number,
            deliveryFee: formData.deliveryFee as number,
            storeNextBy: formData.storeNextBy,
          }
        )
        : await createDeliveryLocation(accessToken, restaurant?.restaurantId, {
          areaName: formData.areaName,
          city: formData.city,
          minimumOrder: formData.minimumOrder as number,
          deliveryFee: formData.deliveryFee as number,
          storeNextBy: formData.storeNextBy,
        });

      if (response) {
        toast.success(
          deliveryLocationId
            ? "Delivery Location updated successfully"
            : "Delivery Location created successfully"
        );
      }

      setFormData({
        areaName: "",
        city: "",
        minimumOrder: "",
        deliveryFee: "",
        storeNextBy: "",
      });
      if (response) {
        setDeliveryLocationData(
          response,
          deliveryLocationId ? "UPDATE" : "ADD"
        );
      }
      clearForm();

      stopLoading();
    } catch (error) {
      console.log(
        "An error occurred while creating the delivery location",
        error
      );
    }
  };

  return (
    <>
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
          <Typography
            fontWeight={"600"}
            fontSize={"40px"}
            lineHeight={"54px"}
            textAlign={"center"}
            sx={{ pt: 3, pb: 1 }}
          >
            Delivery Location
          </Typography>
          <Typography textAlign={"center"} fontSize={18} lineHeight={"24px"}>
            Input the information please
          </Typography>
          <Button
            sx={{
              backgroundColor: '#EDEDED',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
            }}
          >
            Upload File
            <ArrowUpwardIcon sx={{ marginRight: '6px' }} />
          </Button>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <InputField
              Icon={LocationSearchingIcon}
              label="Area Name"
              onChange={(e) => handleChange(e, "areaName")}
              value={formData.areaName}
            />
            <InputField
              Icon={LocationCity}
              label="City"
              onChange={(e) => handleChange(e, "city")}
              value={formData.city}
            />
            <InputField
              Icon={BorderColorIcon}
              label="Minimum Order"
              onChange={(e) => handleChange(e, "minimumOrder")}
              value={formData.minimumOrder}
            />
            <InputField
              label="Delivery Fee"
              Icon={AttachMoneyIcon}
              onChange={(e) => handleChange(e, "deliveryFee")}
              value={formData.deliveryFee}
            />
            <InputField
              label="Store Next By"
              Icon={NearMeIcon}
              onChange={(e) => handleChange(e, "storeNextBy")}
              value={formData.storeNextBy}
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
              text={deliveryLocationId ? "Update" : "Save"}
              loading={loading}
              sx={{
                width: "465px",
                height: "50px",
              }}
              onClick={() => {
                handleSubmit();
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            maxWidth: "730px",
            margin: "0 auto",
            padding: "20px",
            "@media (max-width: 500px)": {
              padding: "0px",
              mt: 2,
            },
          }}
        >
          <TableComponent
            deleteHandel={deleteDeliveryLocation}
            editHandel={editDeliveryLocation}
            rows={data}
            h1="Area Name"
            h2="City"
            h3="Minimum Order"
            h4="Delivery Fee"
            h5="Store Next By"
            h6="Edit/Delete"
          />
        </Box>
      </Box>
    </>
  );
}

export default DeliveryLocation;
