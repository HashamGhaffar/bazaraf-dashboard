import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
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

  const insitialData = editingModifierList?.modifierList;
  const [formData, setFormData] = React.useState({
    name: insitialData?.name || "",
    description: insitialData?.description || "",
    imageUrl: insitialData?.imageUrl || "",
    isRequired: insitialData?.isRequired || false,
    minQuantity: insitialData?.minQuantity || 0,
    maxQuantity: insitialData?.maxQuantity || 0,
    modifiers: insitialData?.modifiers || [],
  });
  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    setFormData({
      name: insitialData?.name || "",
      description: insitialData?.description || "",
      imageUrl: insitialData?.imageUrl || "",
      isRequired: insitialData?.isRequired || false,
      minQuantity: insitialData?.minQuantity || 0,
      maxQuantity: insitialData?.maxQuantity || 0,
      modifiers: insitialData?.modifiers || [],
    });
  }, [insitialData]);
  const handelSubmit = async () => {
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
            alt="Modifier-list"
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
            Modifier List
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
            label="Description"
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
              flexDirection: "row",
              ml: isMobile ? 0 : 11,
              width: isMobile ? "355px" : "470px",
              gap: 1,
              mt: 3,
            }}
          >
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
              sx={{
                maxWidth: "150px",
                border: "1px solid grey.400",
                borderRadius: "10px",
                padding: "2px",
                ml: 1,
              }}
            />
          </Box>
          <Box
            sx={{
              width: isMobile ? "355px" : "470px",
              margin: "0 auto",
              mt: 3,
            }}
          >
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

                setFormData({
                  ...formData,
                  modifiers: [...formData.modifiers, modifier as any],
                });
              }}
              data={data.map((modifier) => modifier.name)}
            />
          </Box>

          {formData.modifiers.map((modifier) => {
            return (
              <SimpleButton
                text={modifier.name}
                sx={{
                  flex: "0 0 auto",
                  width: "230px",
                  margin: "10px",
                  height: "43px",
                  color: "black",
                  backgroundColor: "#D9D9D9",
                  fontSize: "18px",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#D9D9D9",
                    color: "black",
                  },
                  "@media (max-width: 500px)": {
                    width: "170px",
                  },
                }}
                onClick={() => ""}
              />
            );
          })}
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              ml: isMobile ? 0 : 11,
              width: isMobile ? "355px" : "470px",
              gap: 1,
              mt: 3,
              scrollbarWidth: "none",
              scrollBehavior: "revert",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <SimpleButton
              text="Pakola"
              sx={{
                flex: "0 0 auto",
                width: "230px",
                height: "43px",
                backgroundColor: "#D9D9D9",
                color: "black",
                fontSize: "18px",
                fontWeight: "400",
                "&:hover": {
                  backgroundColor: "#D9D9D9",
                  color: "black",
                },
                "@media (max-width: 500px)": {
                  width: "170px",
                },
              }}
              onClick={() => ""}
            />
          </Box> */}
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
            text={editingModifierList?.modifierListId ? "Update" : "Save"}
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
