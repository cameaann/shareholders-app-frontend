import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import TableHeader from "./TableHeader";
import { Table, Box, Typography } from "@mui/joy";
import { useState, useContext } from "react";
import { ShareholdersContext } from "./ShareholdersProvider";

const ShareNumbersTable = ({ sharenumbers, sharesTotalQuantity }) => {
  const { shareholdersList } = useContext(ShareholdersContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  const getTotalAmount = () => {
    let total = 0;
    filteredShares.forEach((e) => {
      total += e.endNumber - e.startNumber + 1;
    });
    return total;
  };

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const filteredShares = sharenumbers.filter((share) => {
    const shareholder = shareholdersList?.find(
      (s) => s.id === share.shareholderId
    ) || { name: "" };

    return (
      shareholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      share.startNumber.toString().includes(searchTerm) ||
      share.endNumber.toString().includes(searchTerm)
    );
  });

  const rows = filteredShares.map((share, i) => {
    const shareholder = shareholdersList
      ? shareholdersList.find((s) => s.id === share.shareholderId)
      : { name: "" };
    return (
      <TableRow key={i}>
        <TableCell align="right">{share.startNumber}</TableCell>
        <TableCell align="right">{share.endNumber}</TableCell>
        <TableCell align="right">{share.quantity}</TableCell>
        <TableCell align="center">
          {shareholder ? shareholder.name : share.id}
        </TableCell>
        <TableCell align="right">
          {share.endNumber - share.startNumber + 1}
        </TableCell>
      </TableRow>
    );
  });
  // Paginated rows to display
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <TableHeader
      onSearchChange={handleSearchChange}
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box>
        <Table aria-label="share numbers table" hoverRow variant="plain" sx={{ mt: 4 }}>
          <TableHead>
            <TableRow sx={{ "& th": { color: "rgba(96, 96, 96)" } }}>
              <TableCell align="center">Osakenumerot</TableCell>
              <TableCell align="center">Alkaen</TableCell>
              <TableCell align="center">Päättyen</TableCell>
              <TableCell align="center">Kpl</TableCell>
              <TableCell align="center">Omistaja</TableCell>
              <TableCell>Tarkistuslaskenta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredShares.length > 0 ? (
              paginatedRows
            ) : (
              <Typography></Typography>
            )}
          </TableBody>
        </Table>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", alignItems: "center", marginTop: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>Yhteensä</Typography>
          <Typography>{getTotalAmount()}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShareNumbersTable;
