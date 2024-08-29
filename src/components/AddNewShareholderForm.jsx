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

const AddNewShareholderForm = () => {
  const firstNameProps = useFormInput();
  const lastNameProps = useFormInput();
  const phoneNumber = useFormInput("(100) 000-0000");
  const personalIdProps = useFormInput();
  const bankAccountNumberProps = useFormInput();
  const cityProps = useFormInput();
  const addressProps = useFormInput();

  return (
    <Stack justifyContent="center" alignContent="center" sx={{ margin: '70px auto', 
    width:"60%"}}>
      <Typography sx={{ fontSize: 22, fontWeight: "bold" }} alignSelf='center'>
        Lisää uusi omistaja
      </Typography>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent='center'>
        <FormControl sx={{ mt: 4 }}>
          <FormLabel>Nimi</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Nimi"
            {...firstNameProps}
          />
        </FormControl>
        <FormControl sx={{ mt: 4 }}>
          <FormLabel>Sukunimi</FormLabel>
          <Input
            placeholder="Sukunimi"
            sx={{ width: "300px" }}
            {...lastNameProps}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent='center'>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Sähköposti osoite</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Sähköposti osoite"
            {...firstNameProps}
          />
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Puhelin numero</FormLabel>
          <Input
            {...phoneNumber}
            placeholder="Placeholder"
            sx={{ width: "300px" }}
            slotProps={{ input: { component: TextMaskAdapter } }}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent='center'>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Hetu/Y-tunnus</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Y-tunnus"
            {...personalIdProps}
          />
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Tili numero</FormLabel>
          <Input
            {...bankAccountNumberProps}
            placeholder="Tili numero"
            sx={{ width: "300px" }}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent='center'>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Kotipaikka</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Kotipaikka"
            {...cityProps}
          />
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Tili numero</FormLabel>
          <Input
            {...addressProps}
            placeholder="Postiosoite"
            sx={{ width: "300px" }}
          />
        </FormControl>
      </Stack>

      <Stack sx={{mt:7}}>
      <Typography  sx={{ fontSize: 22, fontWeight: "bold" }} alignSelf='center'>Lisää osake</Typography>
        <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent='center'>
          <FormControl sx={{ mt: 3 }}>
            <FormLabel>Alkaen</FormLabel>
            <Input sx={{ width: "300px" }} placeholder="0" {...cityProps} />
          </FormControl>
          <FormControl sx={{ mt: 3 }}>
            <FormLabel>Päätyen</FormLabel>
            <Input {...addressProps} placeholder="0" sx={{ width: "300px" }} />
          </FormControl>
        </Stack>

        <Stack flexDirection="row" sx={{ gap: 3, pt:4 }} justifyContent='center'>
         <Typography  sx={{ width: "300px" }}>Kpl: </Typography>
        <Button sx={{backgroundColor:"#317A26", width: "300px"}}>Submit</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddNewShareholderForm;
