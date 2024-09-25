import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/joy";
import { FaEdit } from "react-icons/fa";

const ShareholdersCard = ({ shareholder, ownship }) => {
  return (
    <Card>
      <CardContent orientation="vertical">
        <Typography level="h3" mb={3}>
          {shareholder.name ?? "Nimi"}
        </Typography>
        <Typography mb={1}>
          <strong>Määrä:</strong> {shareholder.totalShares ?? "Määrä"}
        </Typography>
        <Typography mb={1}>
          <strong>Omistus: </strong>
          {ownship ?? "Omistus %"}
        </Typography>
        <Typography mb={1}>
          <strong>Hetu / Y-tunnus: </strong>
          {shareholder.personalIdOrCompanyId ?? "Hetu / Y-tunnus"}
        </Typography>
        <Typography mb={1}>
          <strong>Kotipaikka: </strong>
          {shareholder.placeOfResidenceOrHeadquarters ?? "Kotipaikka"}
        </Typography>
        <Typography mb={1}>
          <strong>Postiosoite: </strong> {shareholder.address ?? "Postiosoite"}
        </Typography>
        <Typography mb={1}>
          <strong>Sähköposti: </strong>
          {shareholder.emailAddress ?? "Sähkoposti osoite"}
        </Typography>
        <Typography mb={1}>
          <strong>Puhelin numero: </strong>
          {shareholder.phoneNumber ?? "Puhelin numero"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton>
          <FaEdit size={20} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ShareholdersCard;
