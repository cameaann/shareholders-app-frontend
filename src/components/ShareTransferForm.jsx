import {
  Typography,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Option,
  Checkbox,
  Textarea,
} from "@mui/joy";
import { useState, useContext } from "react";
import { getShareholders } from "../services/shareholdersService";
import { FormGroup } from "@mui/material";
import { useFormInput } from "../hooks/useFormInput";
import { getTotalSharesQuantity, makeTransfer } from "../services/sharesService";
import { useMediaQuery } from "@mui/material";
import { ShareholdersContext } from "./ShareholdersProvider";
import { SharesQuantityContext } from "./SharesQuantityProvider";
import { TransferHistoryContext } from "./TransferHistoryProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ShareTransferForm = () => {
  const isSmallScreen = useMediaQuery("(max-width: 660px)");
  const { shareholdersList, setShareholders } = useContext(ShareholdersContext);
  const { setSharesTotalQuantity } = useContext(SharesQuantityContext);
  const { setHistoryList} = useContext(TransferHistoryContext);
  const [checked, setChecked] = useState(false);
  const sellerProps = useFormInput(null);
  const buyerProps = useFormInput(null);
  const kplProps = useFormInput(0);
  const priceProps = useFormInput(0);
  const saantoDayProps = useFormInput("");
  const notesProps = useFormInput("");


  const renderShareholders = () => {
    return shareholdersList.map((person) => (
      <Option key={person.id} value={person.id}>
        {person.name}
      </Option>
    ));
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSelectChange = (shareholder) => (e, newVal) => {
    if (shareholder === "seller") {
      sellerProps.onChange({ target: { value: newVal } }); // Update seller
    } else if (shareholder === "buyer") {
      buyerProps.onChange({ target: { value: newVal } }); // Update buyer
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      fromShareholderId: sellerProps.value,
      toShareholderId: buyerProps.value,
      quantity: kplProps.value,
      pricePerShare: priceProps.value,
      saantoDay: saantoDayProps.value,
      notes: notesProps.value,
      transferTax: checked,
    };

    const transferHistory = await makeTransfer(formData);
    if (transferHistory) {
      const shareholders = await getShareholders();
      const totalShares = await getTotalSharesQuantity();
      setSharesTotalQuantity(totalShares.totalShares);
      setShareholders(shareholders);
      setHistoryList(transferHistory)
      resetForm();
    }
  };

  function resetForm() {
    setChecked(false);
    sellerProps.reset();
    buyerProps.reset();
    kplProps.reset();
    priceProps.reset();
    saantoDayProps.reset();
    notesProps.reset();
  }

  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      sx={{ margin: isSmallScreen ? "40px auto" : "70px auto", width: "100%" }}
    >
      {!isSmallScreen ? (
        <Typography
          sx={{ fontSize: 22, fontWeight: "bold" }}
          alignSelf="center"
        >
          Siirto osake
        </Typography>
      ) : (
        ""
      )}

      <Stack
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{ gap: isSmallScreen ? 0 : 2 }}
        justifyContent="center"
        alignItems="center"
      >
        <FormControl
          sx={{
            mt: isSmallScreen ? 1 : 4,
            width: isSmallScreen ? "290px" : "300px",
          }}
        >
          <FormLabel>Luovuttaja / Myyjä</FormLabel>
          <Select
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            placeholder="Omistaja"
            name="seller"
            onChange={handleSelectChange("seller")}
          >
            {shareholdersList ? (
              renderShareholders()
            ) : (
              <Option value="Omistaja">Omistaja</Option>
            )}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            mt: isSmallScreen ? 3 : 4,
            width: isSmallScreen ? "290px" : "300px",
          }}
        >
          <FormLabel>Saaja / Ostaja</FormLabel>
          <Select
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            placeholder="Omistaja"
            name="buyer"
            onChange={handleSelectChange("buyer")}
          >
            {shareholdersList ? (
              renderShareholders()
            ) : (
              <Option value="Omistaja">Omistaja</Option>
            )}
          </Select>
        </FormControl>
      </Stack>
      <Stack
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{ gap: isSmallScreen ? 0 : 2 }}
        justifyContent="center"
        alignItems="center"
      >
        <FormControl sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}>
          <FormLabel>Kpl</FormLabel>
          <Input
            value={kplProps.value}
            onChange={kplProps.onChange}
            placeholder=""
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
          />
        </FormControl>
        <FormControl sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}>
          <FormLabel>Hinta per osake</FormLabel>
          <Input
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            placeholder="Hinta per osake"
            value={priceProps.value}
            onChange={priceProps.onChange}
          />
        </FormControl>
      </Stack>
      <Stack
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{ gap: isSmallScreen ? 0 : 2 }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack>
          <FormControl sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}>
            <FormLabel>Saantopäivä</FormLabel>
            <Input
              type="date"
              sx={{ width: isSmallScreen ? "290px" : "300px" }}
              value={saantoDayProps.value}
              onChange={saantoDayProps.onChange}
            />
          </FormControl>
          <FormGroup sx={{ width: isSmallScreen ? "290px" : "300px", mt: 5 }}>
            <Checkbox
              label="Varainsiirtovero"
              onChange={handleChange}
              checked={checked}
            />
          </FormGroup>
        </Stack>
        <FormControl
          sx={{
            mt: isSmallScreen ? 4 : 3,
            width: isSmallScreen ? "290px" : "300px",
          }}
        >
          <FormLabel>Huomautus</FormLabel>
          <Textarea
            minRows={4}
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            value={notesProps.value}
            onChange={notesProps.onChange}
          />
        </FormControl>
      </Stack>
      <Stack sx={{ mt: isSmallScreen ? 2 : 7 }}>
        <Stack
          flexDirection={isSmallScreen ? "column" : "row"}
          sx={{ gap: isSmallScreen ? 0 : 2, pt: isSmallScreen ? 2 : 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{
              mb: isSmallScreen ? 4 : 0,
              width: isSmallScreen ? "290px" : "300px",
            }}
          >
            Total: {priceProps.value * kplProps.value} euro
          </Typography>
          <Button
            sx={{
              backgroundColor: "#317A26",
              width: isSmallScreen ? "290px" : "300px",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
        <ToastContainer/>
      </Stack>
    </Stack>
  );
};

export default ShareTransferForm;
