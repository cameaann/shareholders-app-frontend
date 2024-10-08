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
import { getShareholderById, saveShareholder } from "../services/shareholdersService";
import { useEffect, useState, useContext } from "react";
import { validateField } from "../functions/validateForm";
import { updateShareholder } from "../services/shareholdersService";
import { useMediaQuery } from "@mui/material";
import { ShareholdersContext } from "./ShareholdersProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateOrEditShareholderForm = ({
  sharesTotalQuantity,
  onAddingMainShareholder,
  person,
  isPersonEditing,
  onClose
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 660px)");
  const nameProps = useFormInput(person ? person.name : "");
  const emailProps = useFormInput(person ? person.emailAddress : "");
  const phoneNumberProps = useFormInput(
    person ? person.phoneNumber : ""
  );
  const personalIdProps = useFormInput(
    person ? person.personalIdOrCompanyId : ""
  );
  const bankAccountNumberProps = useFormInput(
    person ? person.bankAccountNumber : ""
  );
  const cityProps = useFormInput(
    person ? person.placeOfResidenceOrHeadquarters : ""
  );
  const addressProps = useFormInput(person ? person.address : "");
  const shareQuantity = useFormInput(0);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { addShareholder, editShareholder } = useContext(ShareholdersContext);

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

    if (touched[field]) {
      handleValidation(field, event.target.value);
    }
  };

  const handleBlur = (props, field) => (event) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
    handleValidation(field, event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: nameProps.value,
      phoneNumber: phoneNumberProps.value,
      email: emailProps.value,
      bankAccountNumber: bankAccountNumberProps.value,
      city: cityProps.value,
      address: addressProps.value,
      quantity: shareQuantity.value,
    };
    if (isPersonEditing) {
      if(personalIdProps.isDirty){
        formData.personalId = personalIdProps.value;
      }
      const res = await updateShareholder(formData, person.id)
        if (res) {
          const shareholder = await getShareholderById(res);
          editShareholder(shareholder)
          onClose();
        } else {
          console.log("Failed");
        }
    } else {
      formData.personalId = personalIdProps.value;
      const res = await saveShareholder(formData)
      if (res) {
        resetForm();
        if(res === 1) {onAddingMainShareholder(res)}
        const shareholder = await getShareholderById(res);
        addShareholder(shareholder)
      } else {
        console.log("Failed");
      }
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
      sx={{ margin: isSmallScreen ? "40px auto" : "70px auto", width: "100%" }}
    >
      {!isSmallScreen ? (
        <Stack justifyContent="center">
          {isPersonEditing ? (
            <Typography
              sx={{ fontSize: 22, fontWeight: "bold" }}
              alignSelf="center"
            >
              Muokata {person.name}
            </Typography>
          ) : (
            <Typography
              sx={{ fontSize: 22, fontWeight: "bold" }}
              alignSelf="center"
            >
              Lisää uusi omistaja
            </Typography>
          )}
        </Stack>
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
          error={!!errors.name}
        >
          <FormLabel>Nimi</FormLabel>
          <Input
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            placeholder="Nimi"
            value={nameProps.value}
            onChange={handleChange(nameProps, "name")}
            onBlur={handleBlur(nameProps, "name")}
          />
          {!!errors.name && <FormHelperText>{errors.name}</FormHelperText>}
        </FormControl>
        <FormControl
          sx={{
            mt: isSmallScreen ? 3 : 4,
            width: isSmallScreen ? "290px" : "300px",
          }}
          error={!!errors.personalId}
        >
          <FormLabel>Hetu/Y-tunnus</FormLabel>
          <Input
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
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
      <Stack
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{ gap: isSmallScreen ? 0 : 2 }}
        justifyContent="center"
        alignItems="center"
      >
        <FormControl
          sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}
          error={!!errors.phoneNumber}
        >
          <FormLabel>Puhelin numero</FormLabel>
          <Input
            value={phoneNumberProps.value}
            onChange={(event) => {
              phoneNumberProps.onChange(event);
              handleChange("phoneNumber", event.target.value);
            }}
            name="phoneNumber"
            placeholder="(+100) 000-0000"
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            slotProps={{ input: { component: TextMaskAdapter } }}
            onBlur={handleBlur(phoneNumberProps, "phoneNumber")}
          />

          {!!errors.phoneNumber && typeof errors.phoneNumber === "string" && (
            <FormHelperText>{errors.phoneNumber}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}
          error={!!errors.email}
        >
          <FormLabel>Sähköposti osoite</FormLabel>
          <Input
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            placeholder="Sähköposti osoite"
            value={emailProps.value}
            onChange={handleChange(emailProps, "email")}
            onBlur={handleBlur(emailProps, "email")}
          />
          {!!errors.email && <FormHelperText>{errors.email}</FormHelperText>}
        </FormControl>
      </Stack>
      <Stack
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{ gap: isSmallScreen ? 0 : 2 }}
        justifyContent="center"
        alignItems="center"
      >
        <FormControl
          sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}
          error={!!errors.city}
        >
          <FormLabel>Kotipaikka</FormLabel>
          <Input
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            placeholder="Kotipaikka"
            value={cityProps.value}
            onChange={handleChange(cityProps, "city")}
            onBlur={handleBlur(cityProps, "city")}
          />
          {!!errors.city && <FormHelperText>{errors.city}</FormHelperText>}
        </FormControl>
        <FormControl
          sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}
          error={!!errors.address}
        >
          <FormLabel>Postiosoite</FormLabel>
          <Input
            value={addressProps.value}
            onChange={handleChange(addressProps, "address")}
            placeholder="Postiosoite"
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            onBlur={handleBlur(addressProps, "address")}
          />
          {!!errors.address && (
            <FormHelperText>{errors.address}</FormHelperText>
          )}
        </FormControl>
      </Stack>
      <Stack
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{ gap: isSmallScreen ? 0 : 2 }}
        justifyContent="center"
        alignItems="center"
      >
        <FormControl
          sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}
          error={!!errors.bankAccountNumber}
        >
          <FormLabel>Tili numero</FormLabel>
          <Input
            value={bankAccountNumberProps.value}
            onChange={handleChange(bankAccountNumberProps, "bankAccountNumber")}
            placeholder="Tili numero"
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
            onBlur={handleBlur(bankAccountNumberProps, "bankAccountNumber")}
          />
          {!!errors.bankAccountNumber && (
            <FormHelperText>{errors.bankAccountNumber}</FormHelperText>
          )}
        </FormControl>
        {sharesTotalQuantity > 0 ? (
          <Typography
            sx={{ width: isSmallScreen ? "290px" : "300px" }}
          ></Typography>
        ) : (
          <FormControl sx={{ mt: 3, width: isSmallScreen ? "290px" : "300px" }}>
            <FormLabel>Lisää osakeet (Kpl)</FormLabel>
            <Input
              sx={{ width: isSmallScreen ? "290px" : "300px" }}
              placeholder="0"
              value={shareQuantity.value}
              onChange={shareQuantity.onChange}
            />
          </FormControl>
        )}
      </Stack>

      <Stack sx={{ mt: isSmallScreen ? 4 : 7 }}>
        <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
          <Button
            sx={{
              backgroundColor: "#317A26",
              width: isSmallScreen ? "290px" : "300px",
              mt: 1,
            }}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
          {!isSmallScreen ? (
            <Typography sx={{ width: "300px" }}></Typography>
          ) : (
            ""
          )}
        </Stack>
      </Stack>
      <ToastContainer/>
    </Stack>
  );
};

export default CreateOrEditShareholderForm;
