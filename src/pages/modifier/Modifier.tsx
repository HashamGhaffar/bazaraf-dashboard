import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import InputField from "../../components/inputField";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DescriptionField from "../../components/descripationField";
import SimpleButton from "../../components/simpleButton";
import ListComponent from "../../components/ItemLists";
import { createModifier, updateModifier } from "../../api/ModifierApi";
import useModifier from "./useModifier";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { photoUpload } from "../../api/ThemeApi";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log("initialData", initialData);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    priceChange: initialData?.priceChange ?? 0,
    imageUrl: initialData?.imageUrl || "",
  });
  console.log("formData.priceChange", formData.priceChange);

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      description: initialData?.description || "",
      priceChange: initialData?.priceChange ?? 0,
      imageUrl: initialData?.imageUrl || "",
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
            imageUrl: formData.imageUrl,
          }
        )
      : await createModifier(accessToken, restaurant?.restaurantId, {
          name: formData.name,
          description: formData.description,
          priceChange: formData.priceChange as number,
          imageUrl: formData.imageUrl,
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
      imageUrl: "",
    });
    stopLoading();
    clearForm();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const res = await photoUpload(file, accessToken);
      setFormData({ ...formData, imageUrl: res.imageUrl });
    }
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
          {/* <Avatar
            alt="Modifiers"
            src="path-to-your-image-scan.jpg"
            sx={{ width: 100, height: 100 }}
          /> */}
          <div>
            <Avatar
              alt="Category"
              src={formData.imageUrl}
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
            Modifier
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputField
            label="Name"
            Icon={EditNoteIcon}
            onChange={(e) => handleChange(e, "name")}
            value={formData.name}
          />
          <DescriptionField
            label="Description"
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
