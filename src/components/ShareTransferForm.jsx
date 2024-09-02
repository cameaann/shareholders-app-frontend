import {
  Typography,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Option,
} from "@mui/joy";
import { useFormInput } from "../hooks/useFormInput";
import { useState, useEffect } from "react";
import { getShareholders } from "../services/shareholdersService";

const ShareTransferForm = () => {
  const [shareholdersList, setShareholders] = useState();

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
  console.log(shareholdersList);

  const renderShareholders = () => {
    return shareholdersList.map((person) => (
      <Option key={person.id} value={person.id}>
        {person.name}
      </Option>
    ));
  };

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
          <Select sx={{ width: "300px" }} placeholder="Omistaja">
            {shareholdersList ? (
              renderShareholders()
            ) : (
              <Option value="Omistaja">Omistaja</Option>
            )}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 4 }}>
          <FormLabel>Saantopäivä</FormLabel>
          <Input
            type="date"
            sx={{ width: "300px" }}
            //   value={}
            //   onChange={}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Saaja / Ostaja</FormLabel>
          <Select sx={{ width: "300px" }} placeholder="Omistaja">
            {shareholdersList ? (
              renderShareholders()
            ) : (
              <Option value="Omistaja">Omistaja</Option>
            )}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>MaksuPvm</FormLabel>
          <Input
            type="date"
            sx={{ width: "300px" }}
            placeholder="MaksuPvm"
            //   value={}
            //   onChange={}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Kpl</FormLabel>
          <Input
            //   value={}
            //   onChange={}
            placeholder=""
            sx={{ width: "300px" }}
          />
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Varainsiirtovero</FormLabel>
          <Input
            //   value={}
            //   onChange={}
            placeholder="Varainsiirtovero"
            sx={{ width: "300px" }}
          />
        </FormControl>
      </Stack>
      <Stack flexDirection="row" sx={{ gap: 2 }} justifyContent="center">
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Hinta per osake</FormLabel>
          <Input
            sx={{ width: "300px" }}
            placeholder="Hinta per osake"
            //   value={}
            //   onChange={}
          />
        </FormControl>
        <Typography sx={{ width: "300px" }}></Typography>
      </Stack>

      <Stack sx={{ mt: 7 }}>
        <Stack
          flexDirection="row"
          sx={{ gap: 3, pt: 4 }}
          justifyContent="center"
        >
          <Typography sx={{ width: "300px" }}>Total:</Typography>
          <Button
            sx={{ backgroundColor: "#317A26", width: "300px" }}
            //   onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ShareTransferForm;
