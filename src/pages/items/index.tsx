import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import EditNoteIcon from '@mui/icons-material/EditNote';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import InputField from "../../components/inputField";
import DescriptionField from "../../components/descripationField";
import SimpleButton from "../../components/simpleButton";
import ListComponent from "../../components/ItemLists";
import CustomInputField from "../../components/inputField/CustomInputField";
import DropdownComponent from "../../components/dropDown";
import useItem from "./useItem";
import useCategory from "../categoryList/useCategory";
import useModifierList from "../modifierList/useModifierList";
import { createItem, updateItem } from "../../api/itemApi";
import { RootState } from "../../type";
import { photoUpload } from "../../api/photoApi";

interface FormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  modifiersId: string[];
  itemStatus: string;
}

interface Errors {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  modifiersId: string;
}

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
  const ids = initialData?.modifierList?.map((item) => item.modifierListId);
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    imageUrl: initialData?.imageUrl || "",
    categoryId: initialData?.categoryId || "",
    modifiersId: ids || [],
    itemStatus: initialData?.itemStatus || "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "",
    modifiersId: "",
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      imageUrl: initialData?.imageUrl || "",
      categoryId: initialData?.categoryId || "",
      modifiersId: ids || [],
      itemStatus: initialData?.itemStatus || "AVAILABLE",
    });
  }, [initialData]);

  const categoryName = categoryList.find(
    (category) => category.categoryId === formData.categoryId
  );
  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const validateForm = (): boolean => {
    const { name, description, price, categoryId, modifiersId } = formData;
    let isValid = true;
    const errorsCopy: Errors = { ...errors };

    if (!name) {
      isValid = false;
      errorsCopy.name = "Name is required";
    } else {
      errorsCopy.name = "";
    }

    if (!description) {
      isValid = false;
      errorsCopy.description = "Description is required";
    } else {
      errorsCopy.description = "";
    }

    if (!price) {
      isValid = false;
      errorsCopy.price = "Price is required";
    } else {
      errorsCopy.price = "";
    }

    if (!categoryId) {
      isValid = false;
      errorsCopy.categoryId = "Category is required";
    } else {
      errorsCopy.categoryId = "";
    }

    setErrors(errorsCopy);
    return isValid;
  };

  const handelSubmit = async () => {
    const res = validateForm();
    if (!res) {
      toast.error("Please fill all the required fields");
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
          itemStatus: "AVAILABLE",
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
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            Item
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputField
            label="Name"
            Icon={EditNoteIcon}
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
                const category = categoryList.find(
                  (category) => category.name === name
                );
                setFormData({
                  ...formData,
                  categoryId: category?.categoryId || "",
                });
              }}
              data={categoryList.map((category) => category.name)}
            />

            <Box sx={styles.dropdownWrapper(isMobile)}>
              <DropdownComponent
                title="Select Modifier"
                value={""}
                onChange={(e) => {
                  const name = e.target.value;
                  const modifier = modifierList.find(
                    (modifier) => modifier.name === name
                  );

                  if (modifier) {
                    setFormData({
                      ...formData,
                      modifiersId: [
                        ...(formData && formData.modifiersId
                          ? formData.modifiersId
                          : []),
                        modifier.modifierListId,
                      ],
                    });
                  }
                }}
                data={modifierList.map((modifier) => modifier.name)}
              />
              <Box sx={styles.tagsContainer}>
                {formData.modifiersId.map((modifierId) => {
                  const modifierItem = modifierList.find(
                    (mod) => mod.modifierListId === modifierId
                  );

                  if (!modifierItem) return null;

                  return (
                    <Box
                      sx={{
                        px: 3,
                        py: 1,
                        m: 1,
                        borderRadius: "10px",
                        backgroundColor: "#D9D9D9",
                        display: "inline-block",
                      }}
                      key={modifierItem.modifierListId}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          modifiersId: formData.modifiersId.filter(
                            (id) => id !== modifierItem.modifierListId
                          ),
                        });
                      }}
                    >
                      <Typography fontSize={14} sx={{ textWrap: "nowrap" }}>
                        {modifierItem.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
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
              value={formData.price.toString()}
              type="number"
              onChange={(value: string) => {
                return setFormData({
                  ...formData,
                  price: Number(value),
                });
              }}
            />
            <CustomInputField
              label="Available"
              showSwitch={true}
              Icon={EventAvailableIcon}
              value={formData.itemStatus}
              onChange={(value) => {
                console.log("value==============", value);
                setFormData({
                  ...formData,
                  itemStatus: value ? "AVAILABLE" : `OUT_OF_STOCK`,
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
            text={editingItem?.itemId ? "Update" : "Save"}
            sx={{ width: "465px", height: "50px" }}
            onClick={handelSubmit}
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

const styles = {
  dropdownWrapper: (isMobile: boolean) => ({
    width: isMobile ? "355px" : "470px",
    margin: "0 auto",
    marginTop: 3,
  }),
  tagsContainer: {
    overflowX: "auto",
    display: "flex",
    gap: 1,
    "&::-webkit-scrollbar": {
      height: 8,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: 4,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#888 #f1f1f1",
  },
};
