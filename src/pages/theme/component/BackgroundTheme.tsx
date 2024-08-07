import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InputField from "../../../components/inputField";
import SimpleButton from "../../../components/simpleButton";
import TableComponent from "../../../components/themeTable";
import DropdownComponent from "../../../components/dropDown";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
import CustomInputField from "../../../components/inputField/CustomInputField";
import CustomCheckbox from "../../../components/checkbox/Checkbox";
import { ChangeEvent, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import useThemeApi from "../useTheme";
import { createTheme, updateTheme, photoUpload } from "../../../api/ThemeApi";
import { RootState } from "../../../type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import SelectImage from "../../../components/selectImage";

function ThemeComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data,
    loading,
    editTheme,
    clearForm,
    editingTheme,
    deleteTheme,
    setThemeData,
    startLoading,
    stopLoading,
  } = useThemeApi();
  const initialData = editingTheme?.theme;
  const themeId = editingTheme?.themeId;
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    primaryColor: initialData?.primaryColor || "",
    secondaryColor: initialData?.secondaryColor || "",
    textColor: initialData?.textColor || "",
    linkColor: initialData?.linkColor || "",
    primaryFont: initialData?.primaryFont || "",
    secondaryFont: initialData?.secondaryFont || "",
    fontSize: initialData?.fontSize || 0,
    backgroundImageUrl: initialData?.backgroundImageUrl || "",
    backgroundColor: initialData?.backgroundColor || "",
    isActive: initialData?.isActive || false,
    isDefault: initialData?.isDefault || false,
    primaryLogo: initialData?.primaryLogo || "",
    secondaryLogo: initialData?.secondaryLogo || "",
  });

  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  const handleDropdownChange = (name: string) => (e: SelectChangeEvent) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleCheckboxChange =
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [name]: e.target.checked });
    };

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        primaryColor: initialData.primaryColor,
        secondaryColor: initialData.secondaryColor,
        textColor: initialData.textColor,
        linkColor: initialData.linkColor,
        primaryFont: initialData.primaryFont,
        secondaryFont: initialData.secondaryFont,
        fontSize: initialData.fontSize,
        backgroundImageUrl: initialData.backgroundImageUrl,
        backgroundColor: initialData.backgroundColor,
        isActive: initialData.isActive,
        isDefault: initialData.isDefault,
        primaryLogo: initialData.primaryLogo,
        secondaryLogo: initialData.secondaryLogo,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    if (
      formData.name &&
      formData.primaryColor &&
      formData.secondaryColor &&
      formData.primaryFont &&
      formData.secondaryFont &&
      formData.backgroundColor
    ) {
      return true;
    }

    toast.error("Please fill all the required fields");
    return false;
  };

  const handleSubmit = async () => {
    startLoading();
    if (!validateForm()) {
      stopLoading();
      return;
    }

    const response = themeId
      ? await updateTheme(
        accessToken,
        restaurant.restaurantId,
        themeId,
        formData as any
      )
      : await createTheme(
        accessToken,
        restaurant.restaurantId,
        formData as any
      );
    setThemeData(response, editingTheme ? "UPDATE" : "ADD");
    setFormData({
      name: "",
      primaryColor: "",
      secondaryColor: "",
      textColor: "",
      linkColor: "",
      primaryFont: "",
      secondaryFont: "",
      fontSize: 0,
      backgroundImageUrl: "",
      backgroundColor: "",
      isActive: false,
      isDefault: false,
      primaryLogo: "",
      secondaryLogo: "",
    });
    stopLoading();
    clearForm();
    toast.success(
      editingTheme ? "Theme Updated Successfully" : "Theme Added Successfully"
    );
  };
  const handleImageChange = (url: string) => {
    setFormData({ ...formData, primaryLogo: url });
  };

  const handleFileChanges = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await photoUpload(file, accessToken);
        setFormData({ ...formData, backgroundImageUrl: res.imageUrl });
      } catch (error) {
        console.error("Error request:", error);
      }
    }
  };

  return (
    <>
      <Box sx={{ marginX: "15px", backgroundColor: "white" }}>
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
            Theme
          </Typography>
          <Typography textAlign={"center"} fontSize={18} lineHeight={"24px"}>
            Select the theme please
          </Typography>
          <Box sx={{ mt: 3 }}>
            <InputField
              Icon={PersonIcon}
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                margin: "0 auto",
                width: isMobile ? "355px" : "470px",
                mt: 3,
                gap: 1,
              }}
            >
              <DropdownComponent
                value={formData.primaryFont}
                title="Primary font"
                onChange={handleDropdownChange("primaryFont")}
              />
              <DropdownComponent
                title="Secondary font"
                value={formData.secondaryFont}
                onChange={handleDropdownChange("secondaryFont")}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                margin: "0 auto",
                width: isMobile ? "355px" : "470px",
                mt: 3,
                gap: 1,
              }}
            >
              <DropdownComponent
                title="Primary color"
                onChange={handleDropdownChange("primaryColor")}
                value={formData.primaryColor}
              />
              <DropdownComponent
                title="Secondary color"
                onChange={handleDropdownChange("secondaryColor")}
                value={formData.secondaryColor}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                margin: "0 auto",
                width: isMobile ? "355px" : "470px",
                gap: 1,
              }}
            >
              <CustomInputField
                Icon={ColorLensIcon}
                value={formData.backgroundColor}
                label="Background Color"
                onChange={(e) => {
                  setFormData({ ...formData, backgroundColor: e });
                }}
              />
              <div
                onClick={() => document.getElementById("fileInputss").click()}
              >
                <CustomInputField
                  disabled={true}
                  Icon={ImageIcon}
                  value={formData.backgroundImageUrl}
                  label="Background Image"
                  onChange={() => { }}
                />
              </div>
              <input
                id="fileInputss"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChanges}
              />
            </Box>
            <Box
              sx={{
                mt: 2,
                ml: isMobile ? 0 : 9,
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
                  marginLeft: "17px",
                }}
              >
                <Grid item xs={isMobile ? 6 : 12} sm={isMobile ? 2 : 6}>
                  <CustomCheckbox
                    label={"isActive"}
                    required={true}
                    onChange={handleCheckboxChange("isActive")}
                    value={formData.isActive}
                  />
                </Grid>
                <Grid item xs={isMobile ? 6 : 12} sm={isMobile ? 2 : 6}>
                  <CustomCheckbox
                    label={"isDefault"}
                    required={true}
                    onChange={handleCheckboxChange("isDefault")}
                    value={formData.isDefault}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '5px auto', width: isMobile ? '355px' : '470px', gap: 1, }}>
              <Typography variant="h6" fontSize={"16px"} marginBottom={'0px'}>
                Primary Logo
                <SelectImage />
              </Typography>
              <Typography variant="h6" fontSize={"16px"} marginBottom={'0px'}>
                Seconary Logo
                <SelectImage />
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 2,
                ml: isMobile ? 0 : 9,
                width: isMobile ? '355px' : '470px',
                border: '1px solid gray',
                borderRadius: '10px',
              }}>
              <Grid container
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '20px'
                }}>
                <Grid item xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                  <CustomCheckbox label={'Grid View'} required={true} />
                </Grid>
                <Grid item xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                  <CustomCheckbox label={'Text View'} required={true} />
                </Grid>
                <Grid xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                  <CustomCheckbox label={'Category View'} required={true} />
                </Grid>
                <Grid xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                  <CustomCheckbox label={'List View'} required={true} />
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
            loading={loading}
            text={editingTheme ? "Update" : "Save"}
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
          maxWidth: "750px",
          margin: "0 auto",
          mt: 3,
          "@media (max-width: 500px)": {
            padding: "0px",
            mt: 2,
          },
        }}
      >
        <TableComponent
          deleteHandel={deleteTheme}
          editHandel={editTheme}
          rows={data}
          h1="Theme No."
          h2="Theme Name"
          h3="is Active"
          h4="is Default"
          h5={""}
          h6={""}
        />
      </Box>
    </Box >
    </>
  );
}

export default ThemeComponent;
