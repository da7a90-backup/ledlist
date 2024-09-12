import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { CircularProgress, Box, TextField, Button } from "@mui/material";
import { get_email_list } from "./services/Data"; // Ensure this function is defined and imported properly
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define the themes similar to Productlist.js
const lightTheme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: "5px",
          fontFamily: "Saira",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          padding: "0",
          borderBottom: "1px solid #ED3838",
          borderCollapse: "separate",
          fontFamily: "Saira",
        },
        head: {
          outline: "#ED3838 auto",
          borderCollapse: "separate",
          borderRadius: "15px 15px 15px 15px",
          borderBottom: "0",
          textAlign: "center",
          padding: "10px",
          fontVariantEmoji: "emoji",
          fontWeight: "bold",
          alignContent: "center",
        },
        root: {
          padding: "0px",
          fontFamily: "Saira",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ED3838",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "900",
          fontFamily: "Saira",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#ED3838",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#c42f2f",
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: "5px",
          background: "#000",
          color: "#fff",
          fontFamily: "Saira",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          padding: "0",
          borderBottom: "1px solid #ED3838",
          borderCollapse: "separate",
          background: "#000",
          color: "#fff",
          fontFamily: "Saira",
        },
        head: {
          outline: "#ED3838 auto",
          borderCollapse: "separate",
          borderRadius: "15px 15px 15px 15px",
          borderBottom: "0",
          textAlign: "center",
          padding: "10px",
          fontVariantEmoji: "emoji",
          fontWeight: "bold",
          alignContent: "center",
          background: "#000",
          color: "#fff",
        },
        root: {
          padding: "0px",
          background: "#000",
          color: "#fff",
          fontFamily: "Saira",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ED3838",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "900",
          background: "#000",
          color: "#fff",
          fontFamily: "Saira",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#ED3838",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#c42f2f",
          },
        },
      },
    },
  },
});

const EmailList = ({ dark }) => {
  const [emails, setEmails] = useState([]);
  const [ready, setReady] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      get_email_list().then((data) => {
        setEmails(data); // Ensure the data structure matches your backend response
        setReady(true);
      });
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = () => {
    if (inputPassword === "Red4Win") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const columns = [
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  const options = {
    filter: false, // Disable filter view
    print: false, // Disable print option
    viewColumns: false, // Disable view/hide columns option
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: ready ? "No emails found" : <CircularProgress />,
      },
    },
  };

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      {isAuthenticated ? (
        <Box mt={-10} mb={4} mx={2}> {/* Raised the table up by adding negative margin-top */}
          <MUIDataTable
            title={"Email List"}
            data={emails}
            columns={columns}
            options={options}
          />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" mt={12}> {/* Increased mt to move it down */}
          <TextField
            label="Enter Password"
            variant="outlined"
            type="password" // Set to password type to hide text
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Button variant="contained" color="primary" onClick={handlePasswordSubmit}>
            Submit
          </Button>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default EmailList;
