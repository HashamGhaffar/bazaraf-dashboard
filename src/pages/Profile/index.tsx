import React from 'react';
import { Box, Typography, Avatar, Grid, useMediaQuery, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SloganIcon from '@mui/icons-material/EmojiObjects';
import LicenseIcon from '@mui/icons-material/Assignment';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationIcon from '@mui/icons-material/LocationOn';
import UpdateIcon from '@mui/icons-material/Update';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InputField from '../../components/inputField';
import SimpleButton from '../../components/simpleButton';
import CustomCheckbox from '../../components/checkbox/Checkbox';
import CustomInputField from '../../components/inputField/CustomInputField';

const Profile: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                <Box sx={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Avatar
                        alt="profile"
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
                        Profile
                    </Typography>
                </Box>
                <Box sx={{ mt: 2, }}>
                    <InputField label="Name" Icon={PersonIcon} onChange={() => { }} />
                    <InputField label="Slogan" Icon={SloganIcon} onChange={() => { }} />
                    <InputField label="License Number" Icon={LicenseIcon} onChange={() => { }} />
                    <InputField label="Phone" Icon={PhoneIcon} onChange={() => { }} />
                    <InputField label="Location" Icon={LocationIcon} onChange={() => { }} />
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', ml: isMobile ? 0 : 11,
                        width: isMobile ? '355px' : '470px', gap: 1
                    }}>
                        <CustomInputField
                            label="Opening Hours"
                            Icon={UpdateIcon}
                            onChange={() => { }}
                        />
                        <CustomInputField
                            label="Delivery Time"
                            Icon={AccessTimeIcon}
                            onChange={() => { }}
                        />
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                            ml: isMobile ? 0 : 11,
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
                                <CustomCheckbox label={'DriveThru'} required={true} />
                            </Grid>
                            <Grid item xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                                <CustomCheckbox label={'DineIn'} required={true} />
                            </Grid>
                            <Grid xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                                <CustomCheckbox label={'PickUp'} required={true} />
                            </Grid>
                            <Grid xs={isMobile ? 5 : 12} sm={isMobile ? 2 : 6}>
                                <CustomCheckbox label={'Delivery'} required={true} />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: "20px",
                    }}
                >
                    <SimpleButton
                        text="Save"
                        sx={{ width: '465px', height: '50px' }}
                        onClick={() => ''}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Profile;
