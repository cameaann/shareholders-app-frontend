import {
  Button,
  DialogTitle,
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React, { useContext, useState } from "react";
import { addShares } from "../services/sharesService";
import { getShareholderById } from "../services/shareholdersService";
import { ShareholdersContext } from "./ShareholdersProvider";

const AddSharesModal = ({ isOpen, onClose, person }) => {
  const [inputValue, setInputValue] = useState(null);
  const { editShareholder } = useContext(ShareholdersContext);

  const handleSubmit = async(event) => {
    event.preventDefault();

    const shares = await addShares(person, parseInt(inputValue));
    if(shares){
      const shareholder = await getShareholderById(shares.shareholderId);
      editShareholder(shareholder) 
    }

    onClose(); // this closes the modal
    setInputValue(null); // reset value
  };

  const handleInputChange = (event) => setInputValue(event.target.value);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={{ border: "solid #ED6930 2px", borderRadius: "10px" }}>
        <ModalClose />
        <DialogTitle>Add shares to {person.name}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <Input
                autoFocus
                required
                placeholder="Amount"
                onChange={handleInputChange}
              />
            </FormControl>
            <Button type="submit">Add</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default AddSharesModal;
