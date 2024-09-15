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
// import { useFormInput } from "../hooks/useFormInput";
import { useState, useEffect } from "react";
import { getShareholders } from "../services/shareholdersService";
import { FormGroup } from "@mui/material";
import { useFormInput } from "../hooks/useFormInput";
import { makeTransfer } from "../services/sharesService";

const ShareTransferForm = () => {
  const [shareholdersList, setShareholders] = useState();
  const [checked, setChecked] = useState(false);
  const sellerProps = useFormInput(null);
  const buyerProps = useFormInput(null);
  const kplProps = useFormInput(0);
  const priceProps = useFormInput(0);
  const saantoDayProps = useFormInput("");
  const notesProps = useFormInput("");

  useEffect(() => {
    getShareholders()
      .then((res) => {
        if (Array.isArray(res)) {
          setShareholders(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const handleSubmit = (event) => {
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

    const isSuccess = makeTransfer(formData);
    if (isSuccess) {
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
      sx={{ margin: "70px auto", width: "100%" }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: "bold" }} alignSelf="center">
        Siirto osake
      </Typography>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 4 }}>
          <FormLabel>Luovuttaja / Myyjä</FormLabel>
          <Select
            sx={{ width: "300px" }}
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
        <FormControl sx={{ mt: 4 }}>
          <FormLabel>Saaja / Ostaja</FormLabel>
          <Select
            sx={{ width: "300px" }}
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
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Kpl</FormLabel>
          <Input
            value={kplProps.value}
            onChange={kplProps.onChange}
            placeholder=""
            sx={{ width: "300px" }}
          />
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Hinta per osake</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Hinta per osake"
            value={priceProps.value}
            onChange={priceProps.onChange}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
      <Stack>
      <FormControl sx={{ mt: 3 }}>
          <FormLabel>Saantopäivä</FormLabel>
          <Input
            type="date"
            sx={{ width: "300px" }}
            value={saantoDayProps.value}
            onChange={saantoDayProps.onChange}
          />
        </FormControl>
        <FormGroup sx={{ width: "300px", mt: 5 }}>
            <Checkbox
              label="Varainsiirtovero"
              onChange={handleChange}
              checked={checked}
            />
          </FormGroup>
      </Stack>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Huomautus</FormLabel>
          <Textarea
            minRows={4}
            sx={{ width: "300px" }}
            value={notesProps.value}
            onChange={notesProps.onChange}
          />
        </FormControl>
      </Stack>
      <Stack sx={{ mt: 7 }}>
        <Stack
          flexDirection="row"
          sx={{ gap: 3, pt: 4 }}
          justifyContent="center"
        >
          <Typography sx={{ width: "300px" }}>
            Total:{priceProps.value * kplProps.value}
          </Typography>
          <Button
            sx={{ backgroundColor: "#317A26", width: "300px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ShareTransferForm;
