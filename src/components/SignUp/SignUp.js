import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios, { HttpStatusCode } from "axios";
import { SERVER_URL } from "../../utils/constants";


const defaultTheme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    businessName: "",
    establishYear: "",
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newRecord = {
        ...userRegistration,
        id: new Date().getTime().toString(),
      };
      const response = await axios.post(SERVER_URL + "/api/users/register", newRecord);
  
      if (response.status === HttpStatusCode.Created) {
        navigate("/sign-in");
      } else {
        // Handle other response statuses here, e.g., display an error message
        console.error("Unexpected response status:", response.status);
        alert("An error occurred during registration. Please try again later.");
      }
    } catch (error) {
      // Handle network errors or any other errors that may occur
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };
  

  const d = new Date();
  let year = d.getFullYear();

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleInput}
                  value={userRegistration.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                autoComplete="business-name"
                  required
                  fullWidth
                  id="businessName"
                  label="Business Name"
                  name="businessName"
                  autoFocus
                  onChange={handleInput}
                  value={userRegistration.businessName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="establishYear"
                  label="Established Year"
                  name="establishYear"
                  autoComplete="establish-year"
                  type="number"
                  min="1800"
                  max={year}
                  onChange={handleInput}
                  value={userRegistration.establishYear}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInput}
                  value={userRegistration.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInput}
                  value={userRegistration.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
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
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={"/sign-in"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
