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
  deleteHandel: (id: string) => void;
  editHandel: (id: string, row: any) => void;
  h6?: string;
}

const ThemeTable: React.FC<ListComponentProps> = ({
  rows,
  h1,
  h2,
  h3,
  h4,
  h5,
  // h6, unused for now
  deleteHandel,
  editHandel,
}) => {
  console.log(rows);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => {
              console.log(row);
              return (
                <TableRow key={index} sx={{ borderBottom: "1px solid grey" }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.isActive ? "Yes" : "No"}</TableCell>
                  <TableCell>{row.isDefault ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        editHandel(row.themeId, row);
                      }}
                      sx={{
                        color: "primary.main",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deleteHandel(row.themeId);
                      }}
                      sx={{ color: "gray", "&:hover": { color: "red" } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ThemeTable;
