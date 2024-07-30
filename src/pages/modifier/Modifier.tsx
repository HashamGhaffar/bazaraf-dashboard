import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import InputField from "../../components/inputField";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DescriptionField from "../../components/descripationField";
import SimpleButton from "../../components/simpleButton";
import ListComponent from "../../components/ItemLists";
import { createModifier, updateModifier } from "../../api/ModifierApi";
import useModifier from "./useModifier";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Modifiers: React.FC = () => {
  const {
    data,
    deleteModifier,
    editingModifier,
    editModifier,
    setModifierData,
    clearForm,
    startLoading,
    stopLoading,
  } = useModifier();
  const initialData = editingModifier?.modifier;
  const modifierId = editingModifier?.modifierId;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    priceChange: initialData?.priceChange,
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      description: initialData?.description || "",
      priceChange: initialData?.priceChange || "",
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
    const { name, description, priceChange } = formData;

    if (!name) {
      valid = false;
    }
    if (!description) {
      valid = false;
    }
    if (!priceChange) {
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return toast.error("All fields are required");
    }
    startLoading();
    const response = modifierId
      ? await updateModifier(
          accessToken,
          restaurant?.restaurantId,
          modifierId,
          {
            name: formData.name,
            description: formData.description,
            priceChange: formData.priceChange as number,
          }
        )
      : await createModifier(accessToken, restaurant?.restaurantId, {
          name: formData.name,
          description: formData.description,
          priceChange: formData.priceChange as number,
        });
    if (response) {
      setModifierData(response, modifierId ? "UPDATE" : "ADD");
    }
    toast.success(
      modifierId
        ? "Modifier Updated Successfully "
        : "Modifier Added Successfully"
    );
    setFormData({
      name: "",
      description: "",
      priceChange: "",
    });
    stopLoading();
    clearForm();
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
            alt="Modifiers"
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
            Modifiers
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputField
            label="Name"
            Icon={SaveAsIcon}
            onChange={(e) => handleChange(e, "name")}
            value={formData.name}
          />
          <DescriptionField
            label="Descripation"
            value={formData.description}
            onChange={(e) => handleChange(e, "description")}
            rows={4}
            required
          />
          <InputField
            label="Price"
            value={formData.priceChange}
            Icon={PaymentsIcon}
            onChange={(e) => handleChange(e, "priceChange")}
            type="number"
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
            text={modifierId ? "Update" : "Save"}
            sx={{ width: "465px", height: "50px" }}
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
        <ListComponent
          deleteHandel={deleteModifier}
          editHandel={editModifier}
          id="modifierId"
          rows={data}
        />
      </Box>
    </Box>
  );
};

export default Modifiers;
