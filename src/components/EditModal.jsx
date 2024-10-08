import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import { useContext } from "react";
import { SharesQuantityContext } from "./SharesQuantityProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditModal = ({ isOpen, onClose, isMobile, person }) => {
  const { sharesTotalQuantity } = useContext(SharesQuantityContext);

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog
        sx={{
          border: isMobile ? "none" : "solid #ED6930 2px",
          borderRadius: isMobile ? 0 : "10px",
          overflow: "scroll"
        }}
        layout={isMobile ? "fullscreen" : "center"}
      >
        <ModalClose />
        <CreateOrEditShareholderForm
          sharesTotalQuantity={sharesTotalQuantity}
          person={person}
          isPersonEditing={isOpen}
          onClose={handleClose}
        />
        <ToastContainer/>
      </ModalDialog>
    </Modal>
  );
};

export default EditModal;
