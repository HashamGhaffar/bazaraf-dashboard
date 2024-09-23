import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface ListComponentProps {
  rows: {
    thumbnail: string;
    name: string;
    itemPrice: string;
    quantity: number;
    modifier: string;
    price: string;
  }[];
}

const OrderTable: React.FC<ListComponentProps> = ({ rows }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ overflowX: "auto", overflowY: "auto", minHeight: "30vh", maxHeight: "40vh", height: "35vh" }}>
      <TableContainer sx={{ overflowX: "auto", overflowY: "auto" }} component={Paper}>
        <Table
          sx={{ minWidth: isMobile ? "350px" : "400px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: { xs: "13px", md: "16px" },
                  fontWeight: "400",
                }}
              >
                Image
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: { xs: "13px", md: "16px" },
                  fontWeight: "400",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: { xs: "13px", md: "16px" },
                  fontWeight: "400",
                }}
              >
                Item Price
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: { xs: "13px", md: "16px" },
                  fontWeight: "400",
                }}
              >
                QTY
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: { xs: "13px", md: "16px" },
                  fontWeight: "400",
                }}
              >
                Modifiers
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: { xs: "13px", md: "16px" },
                  fontWeight: "400",
                  textAlign: "right"
                }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ borderBottom: "1px solid grey" }}>
                <TableCell>
                  <Avatar
                    alt={row.name}
                    src={row.thumbnail}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: "12%",
                    maxWidth: "20%",
                    width: "100%",
                    fontSize: { xs: "13px", md: "16px" },
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    width: "17%",
                    fontSize: { xs: "13px", md: "16px" },
                    minWidth: { xs: "93px", md: "17%" },
                  }}
                >
                  {row.itemPrice}
                </TableCell>
                <TableCell
                  sx={{
                    width: "9%",
                    fontSize: { xs: "13px", md: "16px" },
                  }}
                >
                  {row.quantity}
                </TableCell>
                <TableCell
                  sx={{
                    Width: "30%",
                    fontSize: { xs: "13px", md: "16px" },
                    minWidth: { xs: "150px", sm: "30%" },
                    whiteSpace: "pre-line",
                  }}
                >
                  {row.modifier}
                </TableCell>
                <TableCell
                  sx={{
                    width: "8%",
                    fontSize: { xs: "13px", md: "16px" },
                    textAlign: "right"
                  }}
                >
                  {row.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;
