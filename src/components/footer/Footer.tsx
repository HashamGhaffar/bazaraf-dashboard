import React from "react";
import { Container, Grid, Box, Typography, Link } from "@mui/material";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from "react-icons/bs";

interface FooterProps {
    year: number;
}

const Footer: React.FC<FooterProps> = ({ year }) => {
    return (
        <Box component="footer" sx={{ bgcolor: '#fff', py: 4, mt: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={0} style={{marginLeft: '70px'}} >
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Contact Information
                            </Typography>
                            <Typography variant="body2">
                                Email: info@example.com
                                <br />
                                Phone: +123456789
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Legal Information
                            </Typography>
                            <Typography variant="body2">
                                <Link href="#">Privacy Policy</Link>
                                <br />
                                <Link href="#">Terms &amp; Conditions</Link>
                                <br />
                                <Link href="#">Cookies</Link>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Social Media
                            </Typography>
                            <Link href="#" sx={{ mr: 2 }}>
                                <BsFacebook size={24} />
                            </Link>
                            <Link href="#" sx={{ mr: 2 }}>
                                <BsInstagram size={24} />
                            </Link>
                            <Link href="#" sx={{ mr: 2 }}>
                                <BsTwitter size={24} />
                            </Link>
                            <Link href="#" sx={{ mr: 2 }}>
                                <BsGithub size={24} />
                            </Link>
                            <Link href="#" sx={{ mr: 2 }}>
                                <BsDribbble size={24} />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, borderTop: '1px solid #ddd', pt: 2}}>
                    <Typography variant="body2" align="center">
                        &copy; {year} Flowbite™. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
