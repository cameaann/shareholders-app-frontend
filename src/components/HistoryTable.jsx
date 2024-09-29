import { Box, Table, FormControl, Input, Typography } from "@mui/joy";
import TableHeader from "./TableHeader";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { useState, useContext } from "react";
import { ShareholdersContext } from "./ShareholdersProvider";
import { setPaymentDate } from "../services/historyTransferService";
import { TransferHistoryContext } from "./TransferHistoryProvider";


const HistoryTable = ({ historyList }) => {
  const [paymentDates] = useState({});
  const { shareholdersList } = useContext(ShareholdersContext);
  const { updateHistoryList } = useContext(TransferHistoryContext);

  const handleDateChange = async (index, id, event) => {
    const updatedNote = await setPaymentDate(id, event.target.value);
    if (updatedNote) {
      updateHistoryList(updatedNote);
    }
  };
  const rows = historyList.map((note, index) => {
    const totalPrice = `${(note.pricePerShare * note.quantity).toFixed(2)}`;
    const seller = shareholdersList
      ? shareholdersList.find((s) => s.id === note.fromShareholderId)
      : { name: "" };
    const buyer = shareholdersList
      ? shareholdersList.find((s) => s.id === note.toShareholderId)
      : { name: "" };

    return (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{note.transferDate}</TableCell>
        <TableCell>
          {note.paymentDate ? (
            note.paymentDate
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
              <TableCell>Kpl</TableCell>
              <TableCell>Hinta per 1</TableCell>
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
