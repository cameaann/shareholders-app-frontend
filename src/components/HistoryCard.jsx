import React, { useContext } from "react";
import { Card, CardContent, Typography, FormControl, Input, Stack } from "@mui/joy";
import { ShareholdersContext } from "./ShareholdersProvider";
import { TransferHistoryContext } from "./TransferHistoryProvider";
import { setPaymentDate } from "../services/historyTransferService";

const HistoryCard = ({ item }) => {
  const { shareholdersList } = useContext(ShareholdersContext);
  const { updateHistoryList } = useContext(TransferHistoryContext);

  const fromShareholder = shareholdersList
    ? shareholdersList.find(
        (shareholder) => shareholder.id === item.fromShareholderId
      )
    : { name: "" };
  const toShareholder = shareholdersList
    ? shareholdersList.find(
        (shareholder) => shareholder.id === item.toShareholderId
      )
    : { name: "" };

  const handleDateChange = async (id, event) => {
    const updatedNote = await setPaymentDate(id, event.target.value);
    if (updatedNote) {
      updateHistoryList(updatedNote);
    }
  };

  return (
    <Card>
      <CardContent orientation="vertical">
        <Typography>
          <strong>Sääntöpäivä:</strong> {item.transferDate}
        </Typography>
        <Stack flexDirection="row" gap={.5} alignItems="center">
          <Typography sx={{ fontWeight: "bold" }}>Maksupvm: </Typography>
          {item.paymentDate ? (
            item.paymentDate
          ) : item.pricePerShare > 0 ? (
            <FormControl>
              <Input
                sx={{ width: "140px" }}
                type="date"
                onChange={(e) => handleDateChange(item.id, e)}
              />
            </FormControl>
          ) : (
            <Typography></Typography>
          )}
        </Stack>

        <Typography>
          <strong>Luovuttaja:</strong>{" "}
          {fromShareholder ? fromShareholder.name : item.fromShareholderId}
        </Typography>
        <Typography>
          <strong>Saaja:</strong>{" "}
          {toShareholder ? toShareholder.name : item.toShareholderId}
        </Typography>
        <Typography>
          <strong>Varainsiirtovero:</strong> {item.transferTax ? "+" : "-"}
        </Typography>
        <Typography>
          <strong>Kpl:</strong> {item.quantity}
        </Typography>
        <Typography>
          <strong>Hinta per osake:</strong> {item.pricePerShare}
        </Typography>
        <Typography>
          <strong>Kokonaishinta:</strong> {item.pricePerShare * item.quantity}
        </Typography>
        <Typography>
          <strong>Huomautus:</strong> {item.additionalNotes}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
