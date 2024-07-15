import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import InputField from '../../components/inputField';
import DescriptionField from '../../components/descripationField';
import SimpleButton from '../../components/simpleButton';
import ListComponent from '../../components/ItemLists';
import { thumbnail } from '../../utils';


const data = [
    { thumbnail: thumbnail, name: 'Drink', description: 'Pakola drink is the Pakistan no.01 drink.' },
];

const CategoryList: React.FC = () => {
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
                <Box sx={{ mt: 2, }}>
                    <InputField label="Name" Icon={GridViewIcon} onChange={() => { }} />
                    <DescriptionField
                        label='Descripation'
                        value={''}
                        onChange={() => {}}
                        rows={4}
                        required
                    />
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
            <ListComponent rows={data}/>
            </Box>
        </Box>
    );
}

export default CategoryList;
