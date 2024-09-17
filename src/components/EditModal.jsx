import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import React from "react";

const EditModal = ({ isOpen, onClose, person }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={{ border: "solid #ED6930 2px", borderRadius: "10px" }}>
        <ModalClose />
        <Typography level="h4">Edit {person.name}</Typography>
        <Typography level="h4">TODO!</Typography>
      </ModalDialog>
    </Modal>
  );
};

export default EditModal;
