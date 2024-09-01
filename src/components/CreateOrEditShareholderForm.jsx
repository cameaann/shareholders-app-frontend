import {
  Typography,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@mui/joy";
import { useFormInput } from "../hooks/useFormInput";
import { TextMaskAdapter } from "./TextMaskAdapter";
import { saveShareholder } from "../services/shareholdersService";
import { useState, useEffect } from "react";

const CreateOrEditShareholderForm = () => {
  const nameProps = useFormInput();
  const emailProps = useFormInput();
  const phoneNumberProps = useFormInput("(100) 000-0000");
  const personalIdProps = useFormInput();
  const bankAccountNumberProps = useFormInput();
  const cityProps = useFormInput();
  const addressProps = useFormInput();
  const shareStartProps = useFormInput(0);
  const shareEndProps = useFormInput(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (shareStartProps.value && shareStartProps.value < shareEndProps.value) {
      let shareCount =
        parseInt(shareEndProps.value) - parseInt(shareStartProps.value) + 1;
      setQuantity(shareCount);
    }
  }, [shareStartProps.value, shareEndProps.value]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: nameProps.value,
      phoneNumber: phoneNumberProps.value,
      personalId: personalIdProps.value,
      email: emailProps.value,
      bankAccountNumber: bankAccountNumberProps.value,
      city: cityProps.value,
      address: addressProps.value,
      shares: {
        start: shareStartProps.value,
        end: shareEndProps.value,
        quantity: quantity,
      },
    };
    const isSuccess = saveShareholder(formData);
    if (isSuccess) {
      resetForm();
    }
  };

  function resetForm() {
    nameProps.reset();
    emailProps.reset();
    phoneNumberProps.reset();
    personalIdProps.reset();
    bankAccountNumberProps.reset();
    cityProps.reset();
    addressProps.reset();
    shareStartProps.reset();
    shareEndProps.reset();
    setQuantity(0);
  }

  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      sx={{ margin: "70px auto", width: "100%" }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: "bold" }} alignSelf="center">
        Lisää uusi omistaja
      </Typography>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 4 }}>
          <FormLabel>Nimi</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Nimi"
            value={nameProps.value}
            onChange={nameProps.onChange}
          />
        </FormControl>
        <FormControl sx={{ mt: 4 }}>
          <FormLabel>Hetu/Y-tunnus</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Y-tunnus"
            value={personalIdProps.value}
            onChange={personalIdProps.onChange}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Puhelin numero</FormLabel>
          <Input
            value={phoneNumberProps.value}
            onChange={phoneNumberProps.onChange}
            name="phoneNumber"
            placeholder="Placeholder"
            sx={{ width: "300px" }}
            slotProps={{ input: { component: TextMaskAdapter } }}
          />
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Sähköposti osoite</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Sähköposti osoite"
            value={emailProps.value}
            onChange={emailProps.onChange}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Tili numero</FormLabel>
          <Input
            value={bankAccountNumberProps.value}
            onChange={bankAccountNumberProps.onChange}
            placeholder="Tili numero"
            sx={{ width: "300px" }}
          />
        </FormControl>
        <Typography sx={{ width: "300px" }}></Typography>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Kotipaikka</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Kotipaikka"
            value={cityProps.value}
            onChange={cityProps.onChange}
          />
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Postiosoite</FormLabel>
          <Input
            value={addressProps.value}
            onChange={addressProps.onChange}
            placeholder="Postiosoite"
            sx={{ width: "300px" }}
          />
        </FormControl>
      </Stack>

      <Stack sx={{ mt: 7 }}>
        <Typography
          sx={{ fontSize: 22, fontWeight: "bold" }}
          alignSelf="center"
        >
          Lisää osake
        </Typography>
        <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
          <FormControl sx={{ mt: 3 }}>
            <FormLabel>Alkaen</FormLabel>
            <Input
              sx={{ width: "300px" }}
              placeholder="0"
              value={shareStartProps.value}
              onChange={shareStartProps.onChange}
            />
          </FormControl>
          <FormControl sx={{ mt: 3 }}>
            <FormLabel>Päätyen</FormLabel>
            <Input
              value={shareEndProps.value}
              onChange={shareEndProps.onChange}
              placeholder="0"
              sx={{ width: "300px" }}
            />
          </FormControl>
        </Stack>

        <Stack
          flexDirection="row"
          sx={{ gap: 3, pt: 4 }}
          justifyContent="center"
        >
          <Typography sx={{ width: "300px" }}>Kpl: {quantity} </Typography>
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

export default CreateOrEditShareholderForm;
