import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../../utils/constants";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BalanceSheet = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  let sheet = location?.state?.sheet;
  let user = location?.state?.user;

  useEffect(() => {
    if (!authToken) {
      navigation("/sign-in");
    } else {
      if (!sheet) {
        navigation("/dashboard");
      }
    }

  }, [navigation, sheet, authToken]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(user);
    const loanAmount = location.state.loanAmount;

    const response = await axios.post(
        SERVER_URL + '/api/users/submit-loan', {balanceSheet: sheet, accountProvider: location.state.accountSoftwareName, loanAmount} , { headers: {
        Authorization: `Bearer ${authToken}`,
      }
    })

    console.log(response);

    const responseData = response.data;
    console.log(responseData);

    navigation("/outcome", {
      state: { message: responseData.data, status: responseData.type, loanAmount },
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Typography
        marginY={2}
        component="h1"
        variant="h5"
        sx={{ width: "75%", mx: "auto" }}
      >
        Hi {user.name}, Here is your balance sheet from{" "}
        {location?.state?.accountSoftwareName}
      </Typography>
      <TableContainer sx={{ width: "75%", margin: "auto" }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="balance sheet">
          <TableHead>
            <TableRow>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell align="center">Month</StyledTableCell>
              <StyledTableCell align="center">Profit or Loss</StyledTableCell>
              <StyledTableCell align="center">Asset Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sheet?.map((row) => (
              <StyledTableRow key={row.month + row.assetsValue}>
                <StyledTableCell component="th" scope="row">
                  {row.year}
                </StyledTableCell>
                <StyledTableCell align="center">{row.month}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.profitOrLoss}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.assetsValue}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ width: "75%", margin: "auto" }}>
        <Typography marginY={2} component="h4" variant="h5">
          Loan amount: ₹ {location?.state?.loanAmount}
        </Typography>
        <Grid item xs={6}>
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isChecked}
          onSubmit={handleSubmit}
        >
          Review & Submit
        </Button>
      </div>
    </Box>
  );
};

export default BalanceSheet;
