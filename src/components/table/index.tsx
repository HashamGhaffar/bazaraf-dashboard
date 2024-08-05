import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ListComponentProps {
  rows: any;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  deleteHandel: (id: string) => void;
  editHandel: (id: string, row: any) => void;
  id: "tableId" | "otherId";
}

const TableComponent: React.FC<ListComponentProps> = ({
  rows,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  deleteHandel,
  editHandel,
  id,
}) => {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                {h1}
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                {h2}
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                {h3}
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                {h4}
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                {h5}
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                {h6}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.deliveryLocationId}
                sx={{ borderBottom: "1px solid grey" }}
              >
                <TableCell>
                  {id === "tableId" ? rows.indexOf(row) + 1 : row.areaName}
                </TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>
                  {id === "tableId"
                    ? row.seatCapacity ?? "N/A"
                    : row.minimumOrder}
                </TableCell>
                <TableCell>
                  {id === "tableId"
                    ? row.isReserved
                      ? "Yes"
                      : "No"
                    : row.deliveryFee}
                </TableCell>
                <TableCell>{row.storeNextBy}</TableCell>
                <TableCell style={{ display: "flex", flexDirection: "row" }}>
                  <IconButton
                    onClick={() =>
                      editHandel(
                        id === "tableId" && row.tableId
                          ? row.tableId
                          : row.deliveryLocationId,
                        row
                      )
                    }
                    sx={{
                      color: "primary.main",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      deleteHandel(
                        id === "tableId" && row.tableId
                          ? row.tableId
                          : row.deliveryLocationId
                      )
                    }
                    sx={{ color: "gray", "&:hover": { color: "red" } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
