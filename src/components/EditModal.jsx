import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import CreateOrEditShareholderForm from "./CreateOrEditShareholderForm";
import { useContext } from "react";
import { SharesQuantityContext } from "./SharesQuantityProvider";

const EditModal = ({ isOpen, onClose, person }) => {
  const { sharesTotalQuantity} = useContext(SharesQuantityContext);


  console.log(isOpen);
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={{ border: "solid #ED6930 2px", borderRadius: "10px" }}>
        <ModalClose />
        <CreateOrEditShareholderForm sharesTotalQuantity = { sharesTotalQuantity } person = {person} isPersonEditing = {isOpen}/>
      </ModalDialog>
    </Modal>
  );
};

export default EditModal;
