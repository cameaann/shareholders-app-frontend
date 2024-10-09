import React, { useState, useContext } from "react";
import { Box, Table, FormControl, Input, Typography } from "@mui/joy";
import TableHeader from "./TableHeader";
import { TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { ShareholdersContext } from "./ShareholdersProvider";
import { setPaymentDate } from "../services/historyTransferService";
import { TransferHistoryContext } from "./TransferHistoryProvider";
import * as XLSX from "xlsx";

const HistoryTable = ({ historyList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentDates] = useState({});
  const { shareholdersList } = useContext(ShareholdersContext);
  const { updateHistoryList } = useContext(TransferHistoryContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  const handleDateChange = async (index, id, event) => {
    const updatedNote = await setPaymentDate(id, event.target.value);
    if (updatedNote) {
      updateHistoryList(updatedNote);
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredHistoryList = historyList.filter((note) => {
    const seller =
      shareholdersList
        ?.find((s) => s.id === note.fromShareholderId)
        ?.name.toLowerCase() || "";
    const buyer =
      shareholdersList
        ?.find((s) => s.id === note.toShareholderId)
        ?.name.toLowerCase() || "";

    return (
      seller.includes(searchQuery.toLowerCase()) ||
      buyer.includes(searchQuery.toLowerCase()) ||
      note.transferDate.includes(searchQuery) ||
      note.pricePerShare.toString().includes(searchQuery)
    );
  });

  const rows = filteredHistoryList.map((note, index) => {
    const totalPrice = `${(note.pricePerShare * note.quantity).toFixed(2)}`;
    const seller = shareholdersList
      ? shareholdersList.find((s) => s.id === note.fromShareholderId)
      : { name: "" };
    const buyer = shareholdersList
      ? shareholdersList.find((s) => s.id === note.toShareholderId)
      : { name: "" };

    return (
      <TableRow key={index}>
        <TableCell>
          <Typography sx={{ textAlign: "center" }}> {index + 1}</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ textAlign: "center" }}>
            {note.transferDate}
          </Typography>
        </TableCell>
        <TableCell>
          {note.paymentDate ? (
            <Typography sx={{ textAlign: "center" }}>
              {note.paymentDate}
            </Typography>
          ) : note.pricePerShare > 0 ? (
            <FormControl>
              <Input
                sx={{ width: "140px" }}
                type="date"
                value={paymentDates[index] || ""}
                onChange={(e) => handleDateChange(index, note.id, e)}
              />
            </FormControl>
          ) : (
            <Typography></Typography>
          )}
        </TableCell>
        <TableCell align="center">
          {seller ? seller.name : note.fromShareholderId}
        </TableCell>
        <TableCell align="center">
          {buyer ? buyer.name : note.toShareholderId}
        </TableCell>
        <TableCell align="center">{note.transferTax ? "+" : ""}</TableCell>
        <TableCell align="right">{note.quantity}</TableCell>
        <TableCell align="center">{note.pricePerShare}</TableCell>
        <TableCell align="right">{totalPrice}</TableCell>
        <TableCell>{note.additionalNotes}</TableCell>
      </TableRow>
    );
  });

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDownload = () => {
    const data = filteredHistoryList.map((note) => {
      const seller = shareholdersList
        ? shareholdersList.find((s) => s.id === note.fromShareholderId)
        : { name: "" };
      const buyer = shareholdersList
        ? shareholdersList.find((s) => s.id === note.toShareholderId)
        : { name: "" };

      return {
        Sääntöpäivä: note.transferDate,
        Maksupvm: note.paymentDate,
        "Luovittaja (Myyjä)": seller.name,
        "Saaja (Ostaja)": buyer.name,
        Varainsiirtovero: note.transferTax ? "+" : "",
        Kpl: note.quantity,
        "Hinta per osake": note.pricePerShare,
        EUR: note.totalAmount,
        Huom: note.additionalNotes,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Historia");

    XLSX.writeFile(workbook, "historia.xlsx");
  };

  return (
    <Box>
      <TableHeader
        onSearchChange={handleSearchChange}
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onDownload={handleDownload}
      />
      <Box>
        <Table
          aria-label="share history table"
          hoverRow
          variant="plain"
          borderAxis="bothBetween"
          sx={{ mt: 4 }}
        >
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(96, 96, 96)",
                  textAlign: "center",
                },
              }}
            >
              <TableCell sx={{ width: "50px" }}>Nro</TableCell>
              <TableCell>Sääntöpäivä</TableCell>
              <TableCell sx={{ width: "150px" }}>Maksupvm</TableCell>
              <TableCell>Luovittaja (Myyjä)</TableCell>
              <TableCell>Saaja (Ostaja)</TableCell>
              <TableCell>Varainsiirtovero</TableCell>
              <TableCell>
                <Typography sx={{ textAlign: "right" }}>Kpl</Typography>
              </TableCell>
              <TableCell>Hinta per 1</TableCell>
              <TableCell>
                <Typography sx={{ textAlign: "right" }}>EUR</Typography>
              </TableCell>
              <TableCell>Huom</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistoryList.length > 0 ? paginatedRows : null}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default HistoryTable;
