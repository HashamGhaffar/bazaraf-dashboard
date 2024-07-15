import { Box, Typography } from "@mui/material";
import InputField from "../../../components/inputField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { AppleIcon, GoogleIcon, FacebookIcon } from "../../../utils";
import SimpleButton from "../../../components/simpleButton";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ marginX: "15px", mt: 5 }}>
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
                        Login
                    </Typography>
                    <Typography textAlign={"center"} fontSize={16} lineHeight={"24px"}>
                        Don't have an account? Signup
                    </Typography>
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <InputField
                            label="Email"
                            Icon={EmailIcon}
                            onChange={() => { }}
                        />
                        <InputField
                            label="Password"
                            Icon={LockIcon}
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
                            text="Login"
                            sx={{
                                width: '465px',
                                height: '50px',
                                "@media (max-width: 500px)": {
                                    width: '350px'
                                },
                            }}
                            onClick={() => navigate('/category')}
                        />
                    </Box>
                    <Typography textAlign={"center"} fontSize={16} lineHeight={"24px"}
                        sx={{
                            "@media (max-width: 500px)": {
                                width: '350px',
                                fontSize: '12px'
                            },
                        }}>
                        _____________________________ OR ______________________________
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: "20px",
                            rowGap: 2
                        }} >
                        <SimpleButton
                            text="Login with Facebook"
                            icon={FacebookIcon}
                            sx={{
                                width: '465px',
                                height: '50px',
                                fontSize: '18px',
                                backgroundColor: "white",
                                color: "black",
                                border: "1px solid black",
                                fontWeight: '400',
                                "&:hover": {
                                    backgroundColor: "white",
                                    borderColor: "black",
                                },
                                "@media (max-width: 500px)": {
                                    width: '330px'
                                },
                            }}
                            onClick={() => ''}
                        />
                        <SimpleButton
                            text="Login with Google"
                            icon={GoogleIcon}
                            sx={{
                                width: '465px',
                                height: '50px',
                                fontSize: '18px',
                                backgroundColor: "white",
                                color: "black",
                                fontWeight: '400',
                                border: "1px solid black",
                                "&:hover": {
                                    backgroundColor: "white",
                                    borderColor: "black",
                                },
                                "@media (max-width: 500px)": {
                                    width: '330px'
                                },
                            }}
                            onClick={() => ''}
                        />
                        <SimpleButton
                            text="Login with Apple"
                            icon={AppleIcon}
                            sx={{
                                width: '465px',
                                height: '50px',
                                fontSize: '18px',
                                backgroundColor: "white",
                                color: "black",
                                fontWeight: '400',
                                border: "1px solid black",
                                "&:hover": {
                                    backgroundColor: "white",
                                    borderColor: "black",
                                },
                                "@media (max-width: 500px)": {
                                    width: '330px'
                                },
                            }}
                            onClick={() => ''}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default LoginForm;
