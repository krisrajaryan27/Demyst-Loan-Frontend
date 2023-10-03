import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CreateIcon from "@mui/icons-material/Create";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";

const Dashboard = () => {
  const navigation = useNavigate();
  const defaultTheme = createTheme();
  const [accountSoftwareName, setAccountSoftwareName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    businessName: "",
    establishedYear: "",
  });

  const authToken = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    if (!authToken) {
      navigation("/sign-in");
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(SERVER_URL + "/api/users/tokenized", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const userData = response.data;
        setUser({
          name: userData.name || "",
          businessName: userData.businessName || "",
          establishedYear: userData.establishYear || "",
          email: userData.email || "",
        });
      } catch (error) {
        // Handle error if the API request fails
        console.error("Error fetching user details", error);
      }
    };
    fetchUserDetails();
  }, [navigation, authToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sheetData = await axios.get(SERVER_URL + "/api/users/balance-sheet", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const sheet = sheetData.data;

    navigation("/balance-sheet", {
      state: { sheet, loanAmount, accountSoftwareName, user  },
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Function to handle changes in the numeric input field
  const handleNumericInputChange = (event) => {
    const value = event.target.value;
    setLoanAmount(value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Fill up the following details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="businessName"
                  label="Business Name"
                  name="businessName"
                  value={user?.businessName}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="establishedYear"
                  label="Established Year"
                  name="establishedYear"
                  value={user?.establishedYear}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="loanAmount"
                  label="Loan Amount"
                  name="loanAmount"
                  autoComplete="loan-amount"
                  type="number"
                  value={loanAmount}
                  onChange={handleNumericInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-acc-soft">
                    Choose accounting software
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={accountSoftwareName}
                      label="accountList"
                      onChange={(e) => {
                        setAccountSoftwareName(e.target.value);
                      }}
                    >
                    <MenuItem value="MYOB">MYOB</MenuItem>
                    <MenuItem value="XERO">XERO</MenuItem>
                  </Select>

                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="I agree terms and conditions."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isChecked || loanAmount <= 0 || accountSoftwareName === ""}
            >
              Get Balance Sheet
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
