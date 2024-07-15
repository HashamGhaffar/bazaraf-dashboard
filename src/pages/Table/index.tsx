import { Box, Typography, useMediaQuery, useTheme  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField";
import SimpleButton from "../../components/simpleButton";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import CreateIcon from '@mui/icons-material/Create';
import TableComponent from "../../components/table";
import CustomCheckbox from "../../components/checkbox/Checkbox";

const data = [
    { areaName: 'Modal Town', city: 'Lahore', order: '2', Dfee: '12$', store: 'Burger Shop' },
];

function  Table() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Box sx={{ marginX: "15px"}}>
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
                        Table
                    </Typography>
                    <Typography textAlign={"center"} fontSize={18} lineHeight={"24px"}>
                        Input the information please
                    </Typography>
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <InputField Icon={DriveFileRenameOutlineIcon} label="Table Number" onChange={() => { }} />
                        <InputField Icon={CreateIcon } label="Seating Capacity" onChange={() => { }} />
                        <InputField Icon={AddLocationIcon} label="Location" onChange={() => { }} />
                        <InputField
                            label="Features"
                            Icon={FeaturedPlayListIcon}
                            onChange={() => { }}
                        />
                         <CustomCheckbox label="isRequired" sx={{width: isMobile ? '355px' : '470px', margin: '0 auto', mt: 1}}/>
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
                        maxWidth: "730px",
                        margin: "0 auto",
                        padding: "20px",
                        "@media (max-width: 500px)": {
                        padding: "0px",
                        mt: 2
                    },
                    }}
                >
                    <TableComponent
                        rows={data}
                        h1="Table No"
                        h2="Seating Capacity"
                        h3="Location"
                        h4="Features"
                        h5="isRequired"
                        h6="Edit/Delete" />
                </Box>
            </Box>
        </>
    );
}

export default Table;
