import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
  Box,
} from "@mui/joy";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import MobileHistoryModal from "./MobileHistoryModal";
import EditModal from "./EditModal";
import AddSharesModal from "./AddSharesModal";

const ShareholdersCard = ({ shareholder, ownship }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddSharesModalOpen, setAddSharesModalOpen] = useState(false);

  const openHistoryModal = (person) => {
    setSelectedPerson(person);
    setHistoryModalOpen(true);
  };

  const openEditModal = (person) => {
    setSelectedPerson(person);
    setEditModalOpen(true);
  };

  const openAddSharesModal = (person) => {
    setSelectedPerson(person);
    setAddSharesModalOpen(true);
  };

  return (
    <Box>
      <Card>
        <CardContent orientation="vertical">
          <Typography level="h3" mb={3}>
            {shareholder.name ?? "Nimi"}
          </Typography>
          <Typography mb={1}>
            <strong>Määrä:</strong> {shareholder.totalShares ?? "Määrä"}
          </Typography>
          <Typography mb={1}>
            <strong>Omistus %: </strong>
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
            <strong>Postiosoite: </strong>{" "}
            {shareholder.address ?? "Postiosoite"}
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
          <Dropdown>
            <MenuButton slots={{ root: IconButton }}>
              <HiDotsVertical />
            </MenuButton>
            <Menu>
              {shareholder.id === 1 && (
                <MenuItem
                  onClick={() => {
                    openAddSharesModal(shareholder);
                  }}
                >
                  Add Shares
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  openEditModal(shareholder);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  openHistoryModal(shareholder);
                }}
              >
                History
              </MenuItem>
            </Menu>
          </Dropdown>
        </CardActions>
      </Card>
      {selectedPerson && (
        <>
          <MobileHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setHistoryModalOpen(false)}
            person={selectedPerson}
          />
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            person={selectedPerson}
          />
          <AddSharesModal
            isOpen={isAddSharesModalOpen}
            onClose={() => setAddSharesModalOpen(false)}
            person={selectedPerson}
          />
        </>
      )}
    </Box>
  );
};

export default ShareholdersCard;
