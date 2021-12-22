import { React, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableCell,
  TableHead,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import Modals from "../Modal";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ContentTable({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customerData, setCustomerData] = useState();
  const [isOpen, setIsOpen] = useState();
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data.customers.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = useCallback((data) => {
    setIsOpen(true);
    setCustomerData(data);
  }, []);
  return (
    <TableContainer component={Paper} sx={{ margin: "2rem", width: "95%" }}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRight: "1px solid white",
              }}
            >
              Name
            </TableCell>
            <TableCell
              align="left"
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRight: "1px solid white",
              }}
            >
              Company
            </TableCell>
            <TableCell
              align="left"
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRight: "1px solid white",
              }}
            >
              Email
            </TableCell>
            <TableCell
              align="left"
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRight: "1px solid white",
              }}
            >
              Phone
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            (rowsPerPage > 0
              ? data?.customers?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data.customers
            ).map((row, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  handleClick(row);
                }}
                sx={{ cursor: "pointer" }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: 160, borderRight: "1px solid black" }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{ width: 160, borderRight: "1px solid black" }}
                  align="left"
                >
                  {row.company}
                </TableCell>
                <TableCell
                  sx={{ width: 160, borderRight: "1px solid black" }}
                  align="left"
                >
                  {row.email}
                </TableCell>
                <TableCell sx={{ width: 160 }} align="left">
                  {row.phone}
                </TableCell>
              </TableRow>
            ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={data?.customers?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Modals data={customerData} open={isOpen} setIsOpen={setIsOpen} />
    </TableContainer>
  );
}
