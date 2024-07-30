import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import InputField from "../../components/inputField";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DescriptionField from "../../components/descripationField";
import SimpleButton from "../../components/simpleButton";
import ListComponent from "../../components/ItemLists";
import CustomInputField from "../../components/inputField/CustomInputField";
import useItem from "./useItem";
import useCategory from "../categoryList/useCategory";
import DropdownComponent from "../../components/dropDown";
import useModifierList from "../modifierList/useModifierList";
import { createItem, updateItem } from "../../api/itemApi";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import { toast } from "react-toastify";

const Items: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    data,
    loading,
    editItem,
    clearForm,
    editingItem,
    deleteItem,
    setItemData,
    startLoading,
    stopLoading,
  } = useItem();
  const { data: modifierList } = useModifierList();
  const { data: categoryList } = useCategory();
  const initialData = editingItem?.item;

  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    imageUrl: initialData?.imageUrl || "",
    categoryId: initialData?.categoryId || "",
    modifiersId: initialData?.modifiersId || [],
    itemStatus: initialData?.itemStatus || "Available",
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      imageUrl: initialData?.imageUrl || "",
      categoryId: initialData?.categoryId || "",
      modifiersId: initialData?.modifiersId || [],
      itemStatus: initialData?.itemStatus || "Available",
    });
  }, [initialData]);

  const categoryName = categoryList.find(
    (category) => category.categoryId === formData.categoryId
  );
  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const handelSubmit = async () => {
    if (!formData.name || !formData.description || !formData.price) {
      return;
    }
    startLoading();
    try {
      const response = editingItem?.itemId
        ? await updateItem(
            accessToken,
            restaurant?.restaurantId,
            editingItem?.itemId,
            formData
          )
        : await createItem(accessToken, restaurant?.restaurantId, formData);

      if (response) {
        setItemData(response, editingItem?.itemId ? "UPDATE" : "ADD");
        setFormData({
          name: "",
          description: "",
          price: 0,
          imageUrl: "",
          categoryId: "",
          modifiersId: [],
          itemStatus: "",
        });
        clearForm();
        toast.success(
          `Item ${editingItem?.itemId ? "updated" : "created"} successfully!`
        );
      }
      clearForm();
      stopLoading();
    } catch (error) {
      console.error("An error occurred while creating the item", error);
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
            alt="Item"
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
            Item
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputField
            label="Name"
            Icon={SaveAsIcon}
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <DescriptionField
            label="Descripation"
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            rows={4}
            required
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 2,
            }}
          >
            <DropdownComponent
              title="Select category"
              value={categoryName?.name || ""}
              onChange={(e) => {
                const name = e.target.value;
                const modifier = categoryList.find(
                  (modifier) => modifier.name === name
                );
                setFormData({
                  ...formData,
                  categoryId: modifier?.categoryId || "",
                });
              }}
              data={categoryList.map((modifier) => modifier.name)}
            />

            <DropdownComponent
              title="Select Modifier"
              value={""}
              onChange={(e) => {
                const name = e.target.value;
                const modifier = modifierList.find(
                  (modifier) => modifier.name === name
                );
                setFormData({
                  ...formData,
                  modifiersId: [
                    ...formData?.modifiersId,
                    modifier.modifierListId,
                  ],
                });
              }}
              data={modifierList.map((modifier) => modifier.name)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              ml: isMobile ? 0 : 11,
              width: isMobile ? "355px" : "470px",
              gap: 1,
            }}
          >
            <CustomInputField
              label="Price"
              Icon={PaymentsIcon}
              type="number"
              onChange={(e) => {
                setFormData({ ...formData, price: Number(e.target.value) });
              }}
            />
            <CustomInputField
              label="Available"
              showSwitch={true}
              Icon={EventAvailableIcon}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({
                  ...formData,
                  itemStatus: value ? "Available" : "Out of stock",
                });
              }}
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
            loading={loading}
            text={editingItem?.itemId ? "Update" : "Create"}
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
          id="itemId"
          editHandel={editItem}
          deleteHandel={deleteItem}
          rows={data}
        />
      </Box>
    </Box>
  );
};

export default Items;
