import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import InputField from "../../components/inputField";
import DescriptionField from "../../components/descripationField";
import SimpleButton from "../../components/simpleButton";
import ListComponent from "../../components/ItemLists";
import useCategory from "./useCategory";
import { createCategory, updateCategory } from "../../api/CategoryApi";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CategoryList: React.FC = () => {
  const {
    data,
    loading,
    editCategory,
    editingCategory,
    deleteCategory,
    setCategoryData,
    startLoading,
    stopLoading,
  } = useCategory();
  const initialData = editingCategory?.category;
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
    });
  }, [initialData]);
  const [errors, setErrors] = useState({
    nameError: "",
    descriptionError: "",
    imageUrlError: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  const validateForm = () => {
    let valid = true;
    const { name, description } = formData;
    const errorsCopy = { ...errors };

    if (!name) {
      errorsCopy.nameError = "Name is required";
      toast.error("Name is required");
      valid = false;
    } else {
      errorsCopy.nameError = "";
    }
    if (!description) {
      toast.error("Description is required");
      errorsCopy.descriptionError = "Description is required";
      valid = false;
    } else {
      errorsCopy.descriptionError = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const handelSubmit = () => {
    if (!validateForm()) {
      return;
    }
    startLoading();
    try {
      const apiFunction = async () => {
        const response = await (editingCategory?.categoryId
          ? updateCategory(
              accessToken,
              restaurant.restaurantId,
              editingCategory?.categoryId || "",
              {
                name: formData.name,
                description: formData.description,
                imageUrl: formData.imageUrl,
              }
            )
          : createCategory(accessToken, restaurant.restaurantId, {
              name: formData.name,
              description: formData.description,
              imageUrl: formData.imageUrl,
            }));
        editingCategory?.categoryId
          ? response && setCategoryData(response, "UPDATE")
          : response && setCategoryData(response, "ADD");
      };
      apiFunction();
      toast.success(
        editingCategory?.categoryId
          ? "Category Update Successfully"
          : "Category Added Successfully"
      );
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error, "error");
    } finally {
      stopLoading();
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
          <Avatar
            alt="Category"
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
            Category
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputField
            label="Name"
            Icon={GridViewIcon}
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
          />
          <DescriptionField
            label="Descripation"
            value={formData.description}
            onChange={(e) => handleChange(e, "description")}
            rows={4}
            required
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
            loading={loading}
            text="Save"
            sx={{ width: "465px", height: "50px" }}
            onClick={() => {
              handelSubmit();
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
          deleteHandel={deleteCategory}
          editHandel={editCategory}
          id="categoryId"
          rows={data}
        />
      </Box>
    </Box>
  );
};

export default CategoryList;
