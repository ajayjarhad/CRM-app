import { React, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableCell,
  TableHead,
  CircularProgress,
} from "@mui/material";

import { GET_CUSTOMERS } from "../../gql/query";
import { TablePaginationActions } from "../Pagination";
import Modals from "../Modal";

export default function ContentTable() {
  const { data, loading } = useQuery(GET_CUSTOMERS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customerData, setCustomerData] = useState();
  const [isOpen, setIsOpen] = useState();
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data.customers.length)
      : 0;

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleClick = useCallback((data) => {
    setIsOpen(true);
    setCustomerData(data);
  }, []);

  return (
    <>
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}
      {!loading && (
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
      )}
    </>
  );
}
