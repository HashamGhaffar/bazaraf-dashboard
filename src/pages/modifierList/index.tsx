import React from 'react';
import { Box, Typography, Avatar, useMediaQuery, useTheme } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import InputField from '../../components/inputField';
import DescriptionField from '../../components/descripationField/index';
import SimpleButton from '../../components/simpleButton';
import ListComponent from '../../components/ItemLists';
import { thumbnail } from '../../utils';
import DropdownComponent from '../../components/dropDown';
import CustomCheckbox from '../../components/checkbox/Checkbox';

const data = [
    { thumbnail: thumbnail, name: 'Drink', description: 'Pakola drink is the Pakistan no.01 drink.' },
];

const ModifierList: React.FC = () => {
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
                <Box sx={{ mt: 2, }}>
                    <InputField label="Name" Icon={SaveAsIcon} onChange={() => { }} />
                    <DescriptionField
                        label='Description'
                        value={''}
                        onChange={() => { }}
                        rows={4}
                        required
                    />
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', ml: isMobile ? 0 : 11,
                        width: isMobile ? '355px' : '470px', gap: 1, mt: 3
                    }}>
                        <DropdownComponent title="min" />
                        <DropdownComponent title="max" />
                        <CustomCheckbox
                            label='Required'
                            sx={{
                                maxWidth: '150px',
                                border: '1px solid grey.400',
                                borderRadius: '10px',
                                padding: '2px',
                                ml: 1
                            }} />
                    </Box>
                    <Box sx={{
                         width: isMobile ? '355px' : '470px',
                        margin: "0 auto",
                        mt: 3
                    }}>
                        <DropdownComponent title="Select Modifier" />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            ml: isMobile ? 0 : 11,
                            width: isMobile ? '355px' : '470px',
                            gap: 1,
                            mt: 3,
                            scrollbarWidth: 'none',
                            scrollBehavior: 'revert',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <SimpleButton
                            text="Buffalo"
                            sx={{
                                flex: '0 0 auto',
                                width: '230px',
                                height: '43px',
                                color: 'black',
                                backgroundColor: '#D9D9D9',
                                fontSize: "18px", fontWeight: '400',
                                "&:hover": {
                                    backgroundColor: "#D9D9D9",
                                    color: 'black',
                                },
                                "@media (max-width: 500px)": {
                                    width: '170px'
                                },
                            }}
                            onClick={() => ''}
                        />
                        <SimpleButton
                            text="Pakola"
                            sx={{
                                flex: '0 0 auto',
                                width: '230px',
                                height: '43px',
                                backgroundColor: '#D9D9D9',
                                color: 'black',
                                fontSize: "18px", fontWeight: '400',
                                "&:hover": {
                                    backgroundColor: "#D9D9D9",
                                    color: 'black',
                                },
                                "@media (max-width: 500px)": {
                                    width: '170px'
                                },
                            }}
                            onClick={() => ''}
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
        </Box >
    );
};

export default ModifierList;
