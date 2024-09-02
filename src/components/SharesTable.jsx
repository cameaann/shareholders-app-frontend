import React from "react";
import TableHeader from "./TableHeader";
import { Table, IconButton, Box } from "@mui/joy";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";


const SharesTable = () => {
  const rows = Array.from({ length: 10 }, (_, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>Cell Content</td>
      <td>Cell Content</td>
      <td>Cell Content</td>
      <td>Cell Content</td>
      <td>Cell Content</td>
      <td>Cell Content</td>
      <td>Cell Content</td>
      <td>Cell Content</td>
      <td>
        <IconButton>
          <FaEdit size={20} />
        </IconButton>

        <IconButton>
          <FaTrashCan size={20} />
        </IconButton>
      </td>
    </tr>
  ));

  return (
    <Box>
      <TableHeader />
      <Box>
        <Table aria-label="shares table" hoverRow variant="plain">
          <thead>
            <tr>
              <th>Osakas</th>
              <th>Määrä</th>
              <th>Nimi</th>
              <th>Omistus %</th>
              <th>Hetu / Y-tunn.</th>
              <th>Kotipaikka</th>
              <th>Postiosoite</th>
              <th>Sähköposti osoite</th>
              <th>Puhelin numero</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SharesTable;
