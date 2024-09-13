import {
  Typography,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
} from "@mui/joy";
import { useFormInput } from "../hooks/useFormInput";
import { TextMaskAdapter } from "./TextMaskAdapter";
import { saveShareholder } from "../services/shareholdersService";
import { useEffect, useState } from "react";
import { validateField } from "../functions/validateForm";

const CreateOrEditShareholderForm = () => {
  const nameProps = useFormInput();
  const emailProps = useFormInput();
  const phoneNumberProps = useFormInput("(100) 000-0000");
  const personalIdProps = useFormInput();
  const bankAccountNumberProps = useFormInput();
  const cityProps = useFormInput();
  const addressProps = useFormInput();
  const shareQuantity = useFormInput(0);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const formHasErrors = Object.values(errors).some((error) => error);
    const isFormIncomplete = [
      nameProps.value,
      emailProps.value,
      phoneNumberProps.value,
      personalIdProps.value,
      bankAccountNumberProps.value,
      cityProps.value,
      addressProps.value,
    ].some((field) => !field);

    setIsSubmitDisabled(formHasErrors || isFormIncomplete);
  }, [
    errors,
    nameProps.value,
    emailProps.value,
    phoneNumberProps.value,
    personalIdProps.value,
    bankAccountNumberProps.value,
    cityProps.value,
    addressProps.value,
  ]);

  const handleValidation = (field, value) => {
    setErrors(validateField(field, value));
  };

  const handleChange = (props, field) => (event) => {
    props.onChange(event); // Update the value using custom hook
    handleValidation(field, event.target.value); // Validate the input field
    if (touched[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: validateField(field, event.target.value),
      }));
    }
  };

  const handleBlur = (props, field) => (event) => {
    handleValidation(field, event.target.value )
  };

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
      quantity: shareQuantity.value,
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
    shareQuantity.reset();
    setErrors({});
    setTouched({});
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
        <FormControl sx={{ mt: 4 }} error={!!errors.name}>
          <FormLabel>Nimi</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Nimi"
            value={nameProps.value}
            onChange={handleChange(nameProps, "name")}
            onBlur={handleBlur(nameProps, "name")}
          />
          {!!errors.name && <FormHelperText>{errors.name}</FormHelperText>}
        </FormControl>
        <FormControl sx={{ mt: 4 }} error={!!errors.personalId}>
          <FormLabel>Hetu/Y-tunnus</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Y-tunnus"
            value={personalIdProps.value}
            onChange={handleChange(personalIdProps, "personalId")}
            onBlur={handleBlur(personalIdProps, "personalId")}
          />
          {!!errors.personalId && (
            <FormHelperText>{errors.personalId}</FormHelperText>
          )}
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }} error={!!errors.phoneNumber}>
          <FormLabel>Puhelin numero</FormLabel>
          <Input
            value={phoneNumberProps.value}
            onChange={(event) => {
              phoneNumberProps.onChange(event);
              handleChange("phoneNumber", event.target.value);
            }}
            name="phoneNumber"
            placeholder="Placeholder"
            sx={{ width: "300px" }}
            slotProps={{ input: { component: TextMaskAdapter } }}
            onBlur={handleBlur(phoneNumberProps, "phoneNumber")}
          />
          {!!errors.phoneNumber && typeof errors.phoneNumber === "string" && (
            <FormHelperText>{errors.phoneNumber}</FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ mt: 3 }} error={!!errors.email}>
          <FormLabel>Sähköposti osoite</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Sähköposti osoite"
            value={emailProps.value}
            onChange={handleChange(emailProps, "email")}
            onBlur={handleBlur(emailProps, "email")}
          />
          {!!errors.email && <FormHelperText>{errors.email}</FormHelperText>}
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }} error={!!errors.city}>
          <FormLabel>Kotipaikka</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Kotipaikka"
            value={cityProps.value}
            onChange={handleChange(cityProps, "city")}
            onBlur={handleBlur(cityProps, "city")}
          />
          {!!errors.city && <FormHelperText>{errors.city}</FormHelperText>}
        </FormControl>
        <FormControl sx={{ mt: 3 }} error={!!errors.address}>
          <FormLabel>Postiosoite</FormLabel>
          <Input
            value={addressProps.value}
            onChange={handleChange(addressProps, "address")}
            placeholder="Postiosoite"
            sx={{ width: "300px" }}
            onBlur={handleBlur(addressProps, "address")}
          />
          {!!errors.address && (
            <FormHelperText>{errors.address}</FormHelperText>
          )}
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }} error={!!errors.bankAccountNumber}>
          <FormLabel>Tili numero</FormLabel>
          <Input
            value={bankAccountNumberProps.value}
            onChange={handleChange(bankAccountNumberProps, "bankAccountNumber")}
            placeholder="Tili numero"
            sx={{ width: "300px" }}
            onBlur={handleBlur(bankAccountNumberProps, "bankAccountNumber")}
          />
          {!!errors.bankAccountNumber && (
            <FormHelperText>{errors.bankAccountNumber}</FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Lisää osakeet (Kpl)</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="0"
            value={shareQuantity.value}
            onChange={shareQuantity.onChange}
          />
        </FormControl>
      </Stack>

      <Stack sx={{ mt: 7 }}>
        <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
          <Button
            sx={{ backgroundColor: "#317A26", width: "300px", mt: 1 }}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
          <Typography sx={{ width: "300px" }}></Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreateOrEditShareholderForm;
