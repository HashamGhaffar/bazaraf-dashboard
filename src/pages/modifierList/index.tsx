import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import InputField from "../../components/inputField";
import DescriptionField from "../../components/descripationField/index";
import SimpleButton from "../../components/simpleButton";
import ListComponent from "../../components/ItemLists";
import DropdownComponent from "../../components/dropDown";
import CustomCheckbox from "../../components/checkbox/Checkbox";
import useModifier from "../../pages/modifier/useModifier";
import useModifierList from "./useModifierList";
import {
  createModifierList,
  updateModifierList,
} from "../../api/modifierListApi";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import { toast } from "react-toastify";
import { photoUpload } from "../../api/photoApi";

const ModifierList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data: modifierList,
    loading,
    editModifierList,
    clearForm,
    editingModifierList,
    deleteModifierList,
    setModifierListData,
    startLoading,
    stopLoading,
  } = useModifierList();
  const { data } = useModifier();
  const minData = [1, 2, 3];
  const maxData = [4, 5, 6];

  const initialData = editingModifierList?.modifierList;
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
    isRequired: initialData?.isRequired || false,
    minQuantity: initialData?.minQuantity || 0,
    maxQuantity: initialData?.maxQuantity || 0,
    modifiers: initialData?.modifiers || [],
  });

  const [errors, setErrors] = React.useState<{
    [key: string]: string;
  }>({
    name: "",
    description: "",
    imageUrl: "",
    minQuantity: "",
    maxQuantity: "",
    modifiers: "",
  });

  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("modifierList", editingModifierList);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || "",
        imageUrl: initialData.imageUrl || "",
        isRequired: initialData.isRequired || false,
        minQuantity: initialData.minQuantity || 0,
        maxQuantity: initialData.maxQuantity || 0,
        modifiers: initialData.modifiers || [],
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const { name, description, modifiers, minQuantity, maxQuantity } = formData;
    let isValid = true;
    const errorsCopy = { ...errors };
    const validationRules = [
      { field: name, errorKey: "nameError", errorMessage: "Name is required" },
      {
        field: description,
        errorKey: "descriptionError",
        errorMessage: "Description is required",
      },
      {
        field: minQuantity,
        errorKey: "minQuantityError",
        errorMessage: "Min Quantity is required",
      },
      {
        field: maxQuantity,
        errorKey: "maxQuantityError",
        errorMessage: "Max Quantity is required",
      },
      {
        field: modifiers.length,
        errorKey: "modifiersError",
        errorMessage: "Modifiers are required",
      },
    ];

    validationRules.forEach(({ field, errorKey, errorMessage }) => {
      if (!field) {
        errorsCopy[errorKey] = errorMessage;
        isValid = false;
      } else {
        errorsCopy[errorKey] = "";
      }
    });

    setErrors(errorsCopy);
    return isValid;
  };

  const handelSubmit = async () => {
    const res = validateForm();
    if (!res) {
      toast.error("Please fill all the required fields");
    } else {
      try {
        startLoading();
        const response = editingModifierList?.modifierListId
          ? await updateModifierList(
              accessToken,
              restaurant.restaurantId,
              editingModifierList?.modifierListId,
              formData
            )
          : await createModifierList(
              accessToken,
              restaurant.restaurantId,
              formData
            );

        if (response) {
          setModifierListData(response, "ADD");
          clearForm();
          setFormData({
            name: "",
            description: "",
            imageUrl: "",
            isRequired: false,
            minQuantity: 0,
            maxQuantity: 0,
            modifiers: [],
          });

          toast.success(
            editingModifierList?.modifierListId
              ? "Modifier List Updated Successfully"
              : "Modifier List Created Successfully"
          );
        }
      } catch (e) {
        console.log("An error occurred while creating the modifier list", e);
        toast.error("Something went wrong");
      } finally {
        stopLoading();
      }
    }
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
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.box}>
        <Box sx={styles.avatarContainer}>
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
          <Typography sx={styles.title}>Modifier List</Typography>
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
            label="Description"
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            rows={4}
            required
          />
          <Box sx={styles.dropdownContainer(isMobile)}>
            <DropdownComponent
              value={formData.minQuantity}
              title="min"
              data={minData}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  minQuantity: parseInt(e.target.value),
                });
              }}
            />
            <DropdownComponent
              value={formData.maxQuantity}
              title="max"
              data={maxData}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  maxQuantity: parseInt(e.target.value),
                });
              }}
            />
            <CustomCheckbox
              label="Required"
              value={formData.isRequired}
              onChange={(e) => {
                setFormData({ ...formData, isRequired: e.target.checked });
              }}
              sx={styles.checkbox}
            />
          </Box>
          <Box sx={styles.dropdownWrapper(isMobile)}>
            <DropdownComponent
              title="Select Modifier"
              value={
                formData.modifiers
                  .map((modifier) => modifier.name)
                  .join(", ") || ""
              }
              onChange={(e) => {
                const name = e.target.value;
                const modifier = data.find((item) => item.name === name);

                if (
                  modifier &&
                  !formData.modifiers.some((mod) => mod.name === name)
                ) {
                  setFormData({
                    ...formData,
                    modifiers: [
                      ...formData.modifiers,
                      { ...modifier, restaurant },
                    ],
                  });
                }
              }}
              data={data.map((modifier) => modifier.name)}
            />
            <Box sx={styles.tagsContainer}>
              {formData.modifiers.map((modifier) => (
                <Box
                  sx={styles.tag}
                  key={modifier.name}
                  onClick={() => {
                    setFormData({
                      ...formData,
                      modifiers: formData.modifiers.filter(
                        (mod) => mod.name !== modifier.name
                      ),
                    });
                  }}
                >
                  <Typography fontSize={14} sx={{ textWrap: "nowrap" }}>
                    {modifier.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={styles.buttonContainer}>
          <SimpleButton
            loading={loading}
            text={editingModifierList?.modifierListId ? "Update" : "Save"}
            sx={{ width: "465px", height: "50px" }}
            onClick={handelSubmit}
          />
        </Box>
      </Box>
      <Box sx={styles.listContainer}>
        <ListComponent
          id="modifierListId"
          editHandel={editModifierList}
          deleteHandel={deleteModifierList}
          rows={modifierList}
        />
      </Box>
    </Box>
  );
};

export default ModifierList;

const styles = {
  container: {
    marginX: "15px",
  },
  tag: {
    px: 3,
    py: 1,
    m: 1,
    borderRadius: "10px",
    backgroundColor: "#D9D9D9",
    display: "inline-block",
    cursor: "pointer",
  },
  box: {
    maxWidth: "690px",
    margin: "0 auto",
    borderRadius: "8px",
    boxShadow: "0px 0px 4px 0px #00000040",
    padding: "20px",
  },
  avatarContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 600,
    fontSize: "40px",
    lineHeight: "54px",
    textAlign: "center",
    paddingTop: 0,
    paddingBottom: 1,
  },
  dropdownContainer: (isMobile: boolean) => ({
    display: "flex",
    flexDirection: "row",
    marginLeft: isMobile ? 0 : 11,
    width: isMobile ? "355px" : "470px",
    gap: 1,
    marginTop: 3,
  }),
  checkbox: {
    maxWidth: "150px",
    border: "1px solid grey.400",
    borderRadius: "10px",
    padding: "2px",
    marginLeft: 1,
  },
  dropdownWrapper: (isMobile: boolean) => ({
    width: isMobile ? "355px" : "470px",
    margin: "0 auto",
    marginTop: 3,
  }),
  simpleButton: (isMobile: boolean) => ({
    flex: "0 0 auto",
    width: isMobile ? "170px" : "230px",
    margin: "10px",
    height: "43px",
    color: "black",
    backgroundColor: "#D9D9D9",
    fontSize: "18px",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "#D9D9D9",
      color: "black",
    },
  }),
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  listContainer: {
    maxWidth: "730px",
    margin: "0 auto",
    padding: "20px",
    "@media (max-width: 500px)": {
      padding: "0px",
      marginTop: 2,
    },
  },
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
