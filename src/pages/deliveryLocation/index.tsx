import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField";
import SimpleButton from "../../components/simpleButton";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import NearMeIcon from '@mui/icons-material/NearMe';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationCity from "@mui/icons-material/LocationCity";
import TableComponent from "../../components/table";

const data = [
    { areaName: 'Modal Town', city: 'Lahore', order: '2', Dfee: '12$', store: 'Burger Shop' },
];

function DeliveryLocation() {
    const navigate = useNavigate();

    return (
        <>
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
                    <Typography
                        fontWeight={"600"}
                        fontSize={"40px"}
                        lineHeight={"54px"}
                        textAlign={"center"}
                        sx={{ pt: 3, pb: 1 }}
                    >
                        Delivery Location
                    </Typography>
                    <Typography textAlign={"center"} fontSize={18} lineHeight={"24px"}>
                        Input the information please
                    </Typography>
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <InputField Icon={LocationSearchingIcon} label="Area Name" onChange={() => { }} />
                        <InputField Icon={LocationCity} label="City" onChange={() => { }} />
                        <InputField Icon={BorderColorIcon} label="Minimum Order" onChange={() => { }} />
                        <InputField
                            label="Delivery Fee"
                            Icon={AttachMoneyIcon}
                            onChange={() => { }}
                        />
                        <InputField
                            label="Store Next By"
                            Icon={NearMeIcon}
                            onChange={() => { }}
                        />
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
                        h1="Area Name"
                        h2="City"
                        h3="Minimum Order"
                        h4="Delivery Fee"
                        h5="Store Next By"
                        h6="Edit/Delete" />
                </Box>
            </Box>
        </>
    );
}

export default DeliveryLocation;
