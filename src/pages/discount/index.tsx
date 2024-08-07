import React, { ChangeEvent, useState } from "react";
import { Box, Typography, Avatar, useMediaQuery, useTheme } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PercentIcon from "@mui/icons-material/Percent";
import InputField from "../../components/inputField";
import DescriptionField from "../../components/descripationField";
import SimpleButton from "../../components/simpleButton";
import DropdownComponent from "../../components/dropDown";
import DateTimePicker from "../../components/dateTimePicker";
import useDiscount from "./useDiscount";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import { Discount } from "../../type";
import { createDiscount, updateDiscount } from "../../api/discountApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SelectChangeEvent } from "@mui/material/Select";
import TableData from "./table";

const Discounts: React.FC = () => {
    const {
        data,
        loading,
        editDiscount,
        clearForm,
        editingDiscount,
        deleteDiscount,
        setDiscountData,
        startLoading,
        stopLoading,
    } = useDiscount();
    const theme = useTheme();
    const initialData = editingDiscount?.discount;
    const discountId = editingDiscount?.discountId;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { restaurant, accessToken } = useSelector((state: RootState) => state.auth);
    const DiscountType = ["PERCENTAGE", "FIXED_AMOUNT"];

    console.log("discount table data->", data);

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        discountType: initialData?.discountType || "",
        discountValue: initialData?.discountValue || "",
        minimumOrderAmount: initialData?.minimumOrderAmount || "",
        startDate: initialData?.startDate || null,
        endDate: initialData?.endDate || null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleDropdownChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        if (value === "PERCENTAGE" || value === "FIXED_AMOUNT") {
            setFormData({ ...formData, discountType: value });
        }
    };

    const handleDateChange = (date: Date | null, name: string) => {
        setFormData({
            ...formData,
            [name]: date ? Math.floor(date.getTime() / 1000) : null,
        });
    };


    const validateForm = () => {
        const { name, description, discountType, discountValue, minimumOrderAmount, startDate, endDate } = formData;
        let isValid = true;

        if (!name) {
            toast.error("Name is required");
            isValid = false;
        }
        if (!description) {
            toast.error("Description is required");
            isValid = false;
        }
        if (!discountType) {
            toast.error("Discount type is required");
            isValid = false;
        }
        if (isNaN(Number(discountValue)) || Number(discountValue) <= 0) {
            toast.error("Valid discount value is required");
            isValid = false;
        }
        if (isNaN(Number(minimumOrderAmount)) || Number(minimumOrderAmount) <= 0) {
            toast.error("Valid minimum order amount is required");
            isValid = false;
        }
        if (!startDate) {
            toast.error("Start date is required");
            isValid = false;
        }
        if (!endDate) {
            toast.error("End date is required");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        startLoading();
        try {
            const requestData: Partial<Discount> = {
                name: formData.name,
                description: formData.description,
                discountType: formData.discountType as "PERCENTAGE" | "FIXED_AMOUNT",
                discountValue: Number(formData.discountValue),
                minimumOrderAmount: Number(formData.minimumOrderAmount),
                startDate: formData.startDate !== null ? Math.floor(new Date(formData.startDate * 1000).getTime() / 1000) : null,
                endDate: formData.endDate !== null ? Math.floor(new Date(formData.endDate * 1000).getTime() / 1000) : null,
            };

            const response = discountId
                ? await updateDiscount(accessToken, restaurant.restaurantId, discountId, requestData as Discount)
                : await createDiscount(accessToken, restaurant.restaurantId, requestData as Discount);

            if (response) {
                toast.success(discountId ? "Discount updated successfully" : "Discount created successfully");
                setDiscountData(response, discountId ? "UPDATE" : "ADD");
                setFormData({
                    name: "",
                    description: "",
                    discountType: "",
                    discountValue: "",
                    minimumOrderAmount: "",
                    startDate: null,
                    endDate: null,
                });
                clearForm();
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error('Error:', error);
        } finally {
            stopLoading();
        }
    };

    return (
        <Box sx={{ marginX: "15px" }}>
            <Box
                sx={{
                    maxWidth: "750px",
                    margin: "0 auto",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 4px 0px #00000040",
                    padding: "20px",
                }}
            >
                <Box
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        alt="Discount"
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
                        Discount
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <InputField
                        label="Name"
                        Icon={SaveAsIcon}
                        value={formData.name}
                        onChange={(e) => handleChange(e, "name")}
                    />
                    <DescriptionField
                        label="Description"
                        value={formData.description}
                        onChange={(e) => handleChange(e, "description")}
                        rows={4}
                        required
                    />
                    <Box
                        sx={{
                            width: isMobile ? '355px' : '470px',
                            margin: "0 auto",
                            mt: 3,
                        }}
                    >
                        <DropdownComponent
                            title="Discount Type"
                            value={formData.discountType}
                            onChange={handleDropdownChange}
                            data={DiscountType}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            ml: isMobile ? 0 : 11,
                            width: isMobile ? '355px' : '470px',
                            gap: 1,
                        }}
                    >
                        <InputField
                            label="Value"
                            value={formData.discountValue}
                            Icon={PercentIcon}
                            onChange={(e) => handleChange(e, "discountValue")}
                        />
                        <InputField
                            label="Min Order"
                            value={formData.minimumOrderAmount}
                            Icon={PaymentsIcon}
                            onChange={(e) => handleChange(e, "minimumOrderAmount")}
                        />
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: { xs: 0, sm: 11 },
                            width: {xs: '355px', sm: "470px"}
                        }}
                    >
                        <Typography gutterBottom>
                            Valid From
                        </Typography>
                        <DateTimePicker
                            selectedDate={formData.startDate ? new Date(formData.startDate) : null}
                            onDateChange={(date) => handleDateChange(date, "startDate")}
                        />
                    </Box>
                    <Box
                        sx={{
                            ml: isMobile ? 0 : 11,
                            width: isMobile ? '355px' : '470px',
                        }}
                    >
                        <Typography gutterBottom>
                            Valid To
                        </Typography>
                        <DateTimePicker
                            selectedDate={formData.endDate ? new Date(formData.endDate) : null}
                            onDateChange={(date) => handleDateChange(date, "endDate")}
                        />
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
                        text={discountId ? "Update" : "Save"}
                        sx={{ width: '465px', height: '50px' }}
                        onClick={handleSubmit}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    maxWidth: "690px",
                    margin: "0 auto",
                    mt: 3,
                    "@media (max-width: 500px)": {
                        padding: "0px",
                        mt: 2,
                    },
                }}
            >
                <TableData
                    deleteHandel={deleteDiscount}
                    editHandel={editDiscount}
                    rows={data}
                    h1="Name"
                    h2="Description"
                    h3="Discount Type"
                    h4="Value"
                    h5="Min Order"
                    h6="Date"
                    h7="Edit/Delete"
                />
            </Box>
        </Box>
    );
};

export default Discounts;
