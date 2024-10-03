import React, { useState } from "react";
import { Box, Input, IconButton } from "@mui/joy";
import { TablePagination } from "@mui/material";
import {
  FaGear,
  FaMagnifyingGlass,
  FaPrint,
  FaDownload,
} from "react-icons/fa6";
import { FaExpandAlt, FaFilter } from "react-icons/fa";

const TableHeader = ({ onSearchChange, rows, page, rowsPerPage, onPageChange, onRowsPerPageChange, onDownload  }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingRight: "10px",
            borderRight: "solid #d9d9dc 1px",
          }}
        >
          <IconButton>
            <FaGear size={20} />
          </IconButton>
        </Box>

        <Box
          sx={{
            marginLeft: "20px",
          }}
        >
          <Input
            placeholder="search"
            startDecorator={<FaMagnifyingGlass />}
            size="sm"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TablePagination
          component="div"
          count={rows ? rows.length : 10} // Total number of rows
          page={page} // Current page
          onPageChange={onPageChange} // Trigger function to change page
          rowsPerPage={rowsPerPage} // Current rows per page
          onRowsPerPageChange={onRowsPerPageChange} // Handle rows per page change
          rowsPerPageOptions={[5, 10, 25]} // Rows per page options
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
            paddingRight: "20px",
            borderRight: "solid #d9d9dc 1px",
          }}
        >
          <IconButton>
            <FaFilter size={20} />
          </IconButton>
          <IconButton>
            <FaPrint size={20} />
          </IconButton>
          <IconButton onClick={onDownload}>
            <FaDownload size={20} />
          </IconButton>
        </Box>

        <IconButton sx={{ marginLeft: "20px" }}>
          <FaExpandAlt size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TableHeader;
