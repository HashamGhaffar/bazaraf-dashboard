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
import { Discount } from "../../type";

const headerCellStyle = {
  color: "white",
  fontSize: "14px",
  fontWeight: "400",
};

interface TableComponentProps {
  rows: Discount[];
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  h7: string;
  h8: string;
  deleteHandel: (id: string) => void;
  editHandel: (id: string, row: Discount) => void;
}

const TableData: React.FC<TableComponentProps> = ({
  rows,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  h8,
  deleteHandel,
  editHandel,
}) => {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper}>
        <Table aria-label="discount table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={headerCellStyle}>{h1}</TableCell>
              <TableCell sx={headerCellStyle}>{h2}</TableCell>
              <TableCell sx={headerCellStyle}>{h3}</TableCell>
              <TableCell sx={headerCellStyle}>{h4}</TableCell>
              <TableCell sx={headerCellStyle}>{h5}</TableCell>
              <TableCell sx={headerCellStyle}>{h6}</TableCell>
              <TableCell sx={headerCellStyle}>{h7}</TableCell>
              <TableCell sx={headerCellStyle}>{h8}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.discountId} sx={{ borderBottom: "1px solid grey" }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.discountType}</TableCell>
                <TableCell>{row.discountValue}</TableCell>
                <TableCell>{row.minimumOrderAmount}</TableCell>
                <TableCell>
                  {`${new Date(row.startDate * 1000).toLocaleDateString()} - ${new Date(row.endDate * 1000).toLocaleDateString()}`}
                </TableCell>
                <TableCell>
                  {row.isActive ? "True" : "False"}
                </TableCell>
                <TableCell sx={{display: 'flex', flexDirection: 'row', border: 'none'}}>
                  <IconButton
                    onClick={() => editHandel(row.discountId, row)}
                    sx={{
                      color: "primary.main",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteHandel(row.discountId)}
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

export default TableData;
