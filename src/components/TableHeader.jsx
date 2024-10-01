import React, { useState } from "react";
import { Box, Input, IconButton } from "@mui/joy";
import {
  FaGear,
  FaMagnifyingGlass,
  FaChevronRight,
  FaChevronLeft,
  FaPrint,
  FaDownload,
} from "react-icons/fa6";
import { FaExpandAlt, FaFilter } from "react-icons/fa";

const TableHeader = ({ onSearchChange }) => {
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingRight: "10px",
            borderRight: "solid #d9d9dc 1px",
          }}
        >
          <span style={{ color: "#6e6e71", marginRight: "10px" }}>
            1 - 10 of 52
          </span>
          <IconButton>
            <FaChevronLeft size={15} />
          </IconButton>

          <IconButton>
            <FaChevronRight size={15} />
          </IconButton>
        </Box>

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
          <IconButton>
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
