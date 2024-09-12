import { Typography, Card, CardContent } from "@mui/joy";
import React from "react";

const ShareNumbersCard = ({ value }) => {
  return (
    <Card>
      <CardContent orientation="vertical">
        <Typography mb={1}>
          <strong>Osakenumerot (Alkaen):</strong> {value.startNumber}
        </Typography>
        <Typography mb={1}>
          <strong>Osakenumerot (Päättyen):</strong> {value.endNumber}
        </Typography>
        <Typography mb={1}>
          <strong>Kpl:</strong> {value.quantity}
        </Typography>
        <Typography mb={1}>
          <strong>Omistaja:</strong> {value.shareholderId}
        </Typography>
        <Typography mb={1}>
          <strong>Tarkistuslaskenta (Osakaiden määrä):</strong> {value.endNumber-value.startNumber + 1}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShareNumbersCard;
