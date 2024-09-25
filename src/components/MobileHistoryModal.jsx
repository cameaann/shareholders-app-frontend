import { Box, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import React from "react";
import MobileHistory from "./MobileHistory";

const MobileHistoryModal = ({ isOpen, onClose, person }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog layout="fullscreen" sx={{ overflow: "scroll" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            width: "100%",
            backgroundColor: "white",
            padding: 2,
            borderBottom: "2px solid #ED6930",
          }}
        >
          <Typography level="h4">
            Transaction history of {person.name}
          </Typography>
          <ModalClose sx={{ position: "relative", top: 0, left: 0 }} />
        </Box>
        <Box sx={{ marginTop: "60px" }}>
          <MobileHistory filterId={person.id} />    
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default MobileHistoryModal;
