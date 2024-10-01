import TableHeader from "./TableHeader";
import {
  Table,
  IconButton,
  Box,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
  Typography,
} from "@mui/joy";
import { TableCell, TableRow, TableHead, TableBody } from "@mui/material";
import { useState, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import HistoryModal from "./HistoryModal";
import EditModal from "./EditModal";
import AddSharesModal from "./AddSharesModal";

const ShareholdersTable = ({ shareholders }) => {
  const [totalShares, setTotalShares] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddSharesModalOpen, setAddSharesModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };


  useEffect(() => {
    let sum = shareholders.reduce((acc, person) => {
      return acc + person.totalShares;
    }, 0);
    setTotalShares(sum);
  }, [totalShares, shareholders]);

  const openHistoryModal = (person) => {
    setSelectedPerson(person);
    setHistoryModalOpen(true);
  };

  const openEditModal = (person) => {
    setSelectedPerson(person);
    setEditModalOpen(true);
  };

  const openAddSharesModal = (person) => {
    setSelectedPerson(person);
    setAddSharesModalOpen(true);
  };

  const rows = shareholders.map((person, index) => {
    let ownship = 0;
    if (totalShares) {
      ownship = `${((person.totalShares / totalShares) * 100).toFixed(4)}%`;
    }


    return (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{person.totalShares}</TableCell>
        <TableCell>{person.name}</TableCell>
        <TableCell>{ownship}</TableCell>
        <TableCell>{person.personalIdOrCompanyId}</TableCell>
        <TableCell>{person.placeOfResidenceOrHeadquarters}</TableCell>
        <TableCell>{person.address}</TableCell>
        <TableCell>{person.emailAddress}</TableCell>
        <TableCell>{person.phoneNumber}</TableCell>
        <TableCell>
          <Dropdown>
            <MenuButton slots={{ root: IconButton }}>
              <HiDotsVertical />
            </MenuButton>
            <Menu>
              {index === 0 && (
                <MenuItem onClick={() => openAddSharesModal(person)}>
                  Add Shares
                </MenuItem>
              )}
              <MenuItem onClick={() => openEditModal(person)}>Edit</MenuItem>
              <MenuItem onClick={() => openHistoryModal(person)}>
                History
              </MenuItem>
            </Menu>
          </Dropdown>
        </TableCell>
      </TableRow>
    );
  });

    // Paginated rows to display
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <Box>
      <TableHeader
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box>
        <Table
          aria-label="shares table"
          hoverRow
          variant="plain"
          sx={{ mt: 4 }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "60px" }}>Osakas</TableCell>
              <TableCell>Määrä</TableCell>
              <TableCell>Nimi</TableCell>
              <TableCell>Omistus %</TableCell>
              <TableCell>Hetu / Y-tunn.</TableCell>
              <TableCell>Kotipaikka</TableCell>
              <TableCell>Postiosoite</TableCell>
              <TableCell sx={{ width: "200px" }}>Sähköposti</TableCell>
              <TableCell sx={{ width: "150px" }}>Puhelinnumero</TableCell>
              <TableCell sx={{ width: "50px" }}>Toiminnot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shareholders.length > 0 ? paginatedRows : <Typography></Typography>}
          </TableBody>
        </Table>
      </Box>
      {selectedPerson && (
        <>
          <HistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setHistoryModalOpen(false)}
            person={selectedPerson}
          />
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            person={selectedPerson}
          />
          <AddSharesModal
            isOpen={isAddSharesModalOpen}
            onClose={() => setAddSharesModalOpen(false)}
            person={selectedPerson}
          />
        </>
      )}
    </Box>
  );
};

export default ShareholdersTable;
