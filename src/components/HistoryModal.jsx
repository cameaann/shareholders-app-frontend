import { Box, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import React from "react";
import History from "./History";

const HistoryModal = ({ isOpen, onClose, person }) => {
  return (
    <Modal open={isOpen} onClose={onClose} sx={{ m: 4 }}>
      <ModalDialog
        layout="fullscreen"
        sx={{ border: "solid #ED6930 2px", borderRadius: "10px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h4">
            Transaction history of {person.name}
          </Typography>
          <ModalClose sx={{ position: "relative", top: 0, left: 0 }} />
        </Box>
        <History filterId={person.id} />
      </ModalDialog>
    </Modal>
  );
};

export default HistoryModal;
