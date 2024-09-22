import { Box, Table, FormControl, Input } from "@mui/joy";
import TableHeader from "./TableHeader";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { useState, useContext } from "react";
import { ShareholdersContext } from "./ShareholdersProvider";

const HistoryTable = ({ historyList }) => {
  const [paymentDates, setPaymentDates] = useState({});
  const { shareholdersList } = useContext(ShareholdersContext);

  const handleDateChange = (index, event) => {
    setPaymentDates({
      ...paymentDates,
      [index]: event.target.value
    });
  };
  const rows = historyList.map((note, index) => {
    const totalPrice = `${(note.pricePerShare*note.quantity).toFixed(2)}`
    const seller = shareholdersList
    ? shareholdersList.find((s) => s.id === note.fromShareholderId)
    : { name:""};
    const buyer = shareholdersList
    ? shareholdersList.find((s) => s.id === note.toShareholderId)
    : { name:""};

    return (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{note.transferDate}</TableCell>
        <TableCell>{note.paymentDate ? note.paymentDate : (
          <FormControl>
          <Input sx={{width: "140px"}}
            type="date"
            value={paymentDates[index] || ''}
            onChange={(e) => handleDateChange(index, e)}
          />
        </FormControl>
        )}
        </TableCell>
        <TableCell align="center">{seller.name}</TableCell>
        <TableCell align="center">{buyer.name}</TableCell>
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
            <TableRow sx={{ textAlign: "center"}}>
              <TableCell sx={{ width: "50px" }}>Nro</TableCell>
              <TableCell>Sääntöpäivä</TableCell>
              <TableCell sx={{ width: "150px"}}>Maksupvm</TableCell>
              <TableCell>Luovittaja (Myyjä)</TableCell>
              <TableCell>Saaja (Ostaja)</TableCell>
              <TableCell>Varainsiirtovero</TableCell>
              <TableCell sx={{display: "flex", justifyContent: "right"}}>Kpl</TableCell>
              <TableCell sx={{ width: "100px", justifyContent: "center"}}>Hinta per 1</TableCell>
              <TableCell sx={{display: "flex", justifyContent: "right"}}>EUR</TableCell>
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
