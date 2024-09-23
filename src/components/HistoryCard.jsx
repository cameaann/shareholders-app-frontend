import React, { useContext } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import { ShareholdersContext } from "./ShareholdersProvider";

const HistoryCard = ({ item }) => {
  const shareholdersList = useContext(ShareholdersContext);

  const fromShareholder = shareholdersList.find(
    (shareholder) => shareholder.id === item.fromShareholderId
  );
  const toShareholder = shareholdersList.find(
    (shareholder) => shareholder.id === item.toShareholderId
  );

  return (
    <Card>
      <CardContent orientation="vertical">
        <Typography>
          <strong>Sääntöpäivä:</strong> {item.transferDate}
        </Typography>
        <Typography>
          <strong>Maksupvm:</strong> {item.paymentDate}
        </Typography>
        <Typography>
          <strong>Luovuttaja:</strong> {fromShareholder ? fromShareholder.name : item.fromShareholderId}
        </Typography>
        <Typography>
          <strong>Saaja:</strong> {toShareholder ? toShareholder.name : item.toShareholderId}
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
