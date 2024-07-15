import React from 'react';
import { Box, Typography, Avatar, useMediaQuery, useTheme  } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import GridViewIcon from '@mui/icons-material/GridView';
import InputField from '../../components/inputField';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionField from '../../components/descripationField';
import SimpleButton from '../../components/simpleButton';
import ListComponent from '../../components/ItemLists';
import { thumbnail } from '../../utils';
import CustomInputField from '../../components/inputField/CustomInputField';

const data = [
    { thumbnail: thumbnail, name: 'Drink', description: 'Pakola drink is the Pakistan no.01 drink.' },
];

const Items: React.FC = () => {
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
                <Box sx={{ mt: 2, }}>
                    <InputField label="Name" Icon={SaveAsIcon} onChange={() => { }} />
                    <DescriptionField
                        label='Descripation'
                        value={''}
                        onChange={() => { }}
                        rows={4}
                        required
                    />
                    <InputField label="Catgory" Icon={GridViewIcon} onChange={() => { }} />
                    <InputField label="Modifier" Icon={SaveAsIcon} onChange={() => { }} />
                    <Box sx={{ display: 'flex', flexDirection: 'row', ml: isMobile ? 0 : 11,
                        width: isMobile ? '355px' : '470px', gap: 1 }}>
                        <CustomInputField
                            label="Price"
                            Icon={PaymentsIcon}
                            onChange={() => { }}
                        />
                        <CustomInputField
                            label="Available"
                            showSwitch={true}
                            Icon={EventAvailableIcon}
                            onChange={() => { }}
                        />
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
            <Box
                sx={{
                    maxWidth: "730px",
                    margin: "0 auto",
                    padding: "20px",
                    "@media (max-width: 500px)": {
                        padding: "0px",
                        mt: 2
                    },
                }}
            >
                <ListComponent rows={data} />
            </Box>
        </Box>
    );
}

export default Items;
