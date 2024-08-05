import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import InputField from "../../components/inputField";
import SimpleButton from "../../components/simpleButton";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import CreateIcon from "@mui/icons-material/Create";
import TableComponent from "../../components/table";
import CustomCheckbox from "../../components/checkbox/Checkbox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTable, updateTable } from "../../api/tabelApi";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
import useTable from "./useTabel";

function Table() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    data,
    loading,
    editTable,
    clearForm,
    editingTable,
    deleteTables,
    setTableData,
  } = useTable();
  const initialData = editingTable?.table;
  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState({
    tableNumber: initialData?.tableNumber || "",
    seatCapacity: initialData?.seatCapacity || 0,
    isReserved: initialData?.isReserved || false,
  });

  useEffect(() => {
    setFormData({
      tableNumber: initialData?.tableNumber || "",
      seatCapacity: initialData?.seatCapacity || 0,
      isReserved: initialData?.isReserved || false,
    });
  }, [initialData]);

  const validateForm = () => {
    if (formData.tableNumber === "" && formData.seatCapacity === 0) {
      toast.error("Please enter table number and seat capacity");

      return false;
    }

    return true;
  };

  const handelSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    const response = editingTable?.tableId
      ? await updateTable(
          accessToken,
          restaurant.restaurantId,
          editingTable.tableId,
          formData
        )
      : await createTable(accessToken, restaurant.restaurantId, formData);
    console.log(response);
    setTableData(response, editingTable?.tableId ? "UPDATE" : "ADD");
    setFormData({
      tableNumber: "",
      seatCapacity: 0,
      isReserved: false,
    });
    toast.success(
      editingTable?.tableId
        ? "Table Updated Successfully"
        : "Table Added Successfully"
    );
    clearForm();
  };

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
            <InputField
              Icon={DriveFileRenameOutlineIcon}
              label="Table Number"
              value={formData.tableNumber}
              onChange={(e) => {
                setFormData({ ...formData, tableNumber: e.target.value });
              }}
            />
            <InputField
              Icon={CreateIcon}
              type="number"
              value={formData.seatCapacity}
              label="Seating Capacity"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  seatCapacity: parseInt(e.target.value),
                });
              }}
            />

            <CustomCheckbox
              label="isReserved"
              onChange={(e) => {
                setFormData({ ...formData, isReserved: e.target.checked });
              }}
              value={formData.isReserved}
              sx={{
                width: isMobile ? "355px" : "470px",
                margin: "0 auto",
                mt: 1,
              }}
            />
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
              text={editingTable?.tableId ? "Update" : "Save"}
              sx={{
                width: "465px",
                height: "50px",
              }}
              loading={loading}
              onClick={() => {
                handelSubmit();
              }}
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
              mt: 2,
            },
          }}
        >
          <TableComponent
            deleteHandel={deleteTables}
            editHandel={editTable}
            rows={data}
            h1="Table No"
            h3="Seating Capacity"
            h2=""
            h5=""
            h4="isRequired"
            h6="Edit/Delete"
            id="tableId"
          />
        </Box>
      </Box>
    </>
  );
}

export default Table;
