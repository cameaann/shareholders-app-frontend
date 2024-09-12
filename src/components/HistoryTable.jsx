import React from "react";
import { Box, Table } from "@mui/joy";
import TableHeader from "./TableHeader";
import { TableHead, TableRow, TableCell } from "@mui/material";

const HistoryTable = ({ historyList }) => {
  const rows = historyList.map((value, index) => (
    <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{value.settelmentDay}</TableCell>
      <TableCell>{value.paymentDate}</TableCell>
      <TableCell>{value.transferor}</TableCell>
      <TableCell>{value.reciver}</TableCell>
      <TableCell>{value.transferTax}</TableCell>
      <TableCell>{value.quantity}</TableCell>
      <TableCell>{value.pricePerShare}</TableCell>
      <TableCell>{value.eur}</TableCell>
      <TableCell>{value.note}</TableCell>
    </TableRow>
  ));
  return (
    <Box>
      <TableHeader />
      <Box>
        <Table
          aria-label="share history table"
          hoverRow
          variant="plain"
          sx={{ mt: 4 }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Nro</TableCell>
              <TableCell>Sääntöpäivä</TableCell>
              <TableCell>Maksupvm</TableCell>
              <TableCell>Luovittaja (Myyjä)</TableCell>
              <TableCell>Saaja (Ostaja)</TableCell>
              <TableCell>Varainsiirtovero</TableCell>
              <TableCell>Kpl</TableCell>
              <TableCell>Hinta per osake</TableCell>
              <TableCell>EUR</TableCell>
              <TableCell>Huom</TableCell>
            </TableRow>
          </TableHead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default HistoryTable;
