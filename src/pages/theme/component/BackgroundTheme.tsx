import { Box, Typography, Grid, useMediaQuery, useTheme  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import InputField from "../../../components/inputField";
import SimpleButton from "../../../components/simpleButton";
import TableComponent from "../../../components/table";
import DropdownComponent from "../../../components/dropDown";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ImageIcon from '@mui/icons-material/Image';
import CustomInputField from "../../../components/inputField/CustomInputField";
import CustomCheckbox from "../../../components/checkbox/Checkbox";
import ImageUpload from "../../../components/ImageUpload";

const data = [
    { areaName: 'Modal Town', city: 'Lahore', order: '2', Dfee: '12$', store: 'Burger Shop' },
];

function ThemeComponent() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Box sx={{ marginX: "15px",  backgroundColor: 'white', }}>
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
                        <InputField Icon={PersonIcon} label="Name" onChange={() => { }} />
                        <Box sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto',  width: isMobile ? '355px' : '470px', mt: 3, gap: 1 }}>
                            <DropdownComponent title="Primary font" />
                            <DropdownComponent title="Secondary font" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto', width: isMobile ? '355px' : '470px', mt: 3, gap: 1 }}>
                            <DropdownComponent title="Primary color" />
                            <DropdownComponent title="Secondary color" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto', width: isMobile ? '355px' : '470px', gap: 1, }}>
                            <CustomInputField Icon={ColorLensIcon} label="Background Color" onChange={() => { }} />
                            <CustomInputField Icon={ImageIcon} label="Background Image" onChange={() => { }} />
                        </Box>
                        <Box
                            sx={{
                                mt: 2,
                                ml: isMobile ? 0 : 10,
                                width: isMobile ? '355px' : '470px',
                                border: '1px solid gray',
                                borderRadius: '10px',
                            }}>
                            <Grid container
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '17px'
                                }}>
                                <Grid item xs={isMobile ? 6 : 12} sm={isMobile ? 2 : 6}>
                                    <CustomCheckbox label={'isActive'} required={true} />
                                </Grid>
                                <Grid item xs={isMobile ? 6 : 12} sm={isMobile ? 2 : 6}>
                                    <CustomCheckbox label={'isDefault'} required={true} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                mt: 2,
                                ml: isMobile ? 0 : 11,
                                width: isMobile ? '300px' : '470px',
                            }}>
                            <Typography variant="h6"  fontSize={"16px"}>
                                Select Logo
                            </Typography>
                            <ImageUpload />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: "20px",
                        }} >
                        <SimpleButton
                            text="SignUp"
                            sx={{
                                width: '465px',
                                height: '50px'
                            }}
                            onClick={() => navigate('/profile')}
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
                        mt: 2
                    },
                    }}
                >
                    <TableComponent
                        rows={data}
                        h1="Area Name"
                        h2="City"
                        h3="Minimum Order"
                        h4="Delivery Fee"
                        h5="Store Next By"
                        h6="Edit/Delete" />
                </Box>
            </Box >
        </>
    );
}

export default ThemeComponent;
