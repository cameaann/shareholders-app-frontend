import { useContext } from "react";
import { Typography, Card, CardContent } from "@mui/joy";
import { ShareholdersContext } from "./ShareholdersProvider";

const ShareNumbersCard = ({ value }) => {
  const { shareholdersList } = useContext(ShareholdersContext);

  const shareholder = shareholdersList
    ? shareholdersList.find((s) => s.id === value.shareholderId)
    : { name: "" };

  return (
    <Card>
      <CardContent orientation="vertical">
        <Typography mb={1}>
          <strong>Osakenumerot:</strong> {value.startNumber}-{value.endNumber}
        </Typography>
        <Typography mb={1}>
          <strong>Kpl:</strong> {value.quantity}
        </Typography>
        <Typography mb={1}>
          <strong>Omistaja:</strong> {shareholder ? shareholder.name : value.shareholderId}
        </Typography>
        <Typography mb={1}>
          <strong>Tarkistuslaskenta:</strong>{" "}
          {value.endNumber - value.startNumber + 1}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShareNumbersCard;
