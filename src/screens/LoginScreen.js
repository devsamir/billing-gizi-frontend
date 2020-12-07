import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Grid, Container } from "@material-ui/core";
import { AuthContext } from "../context/authContext";
import useStyles from "../styles/loginStyle";
import LoginSvg from "../assets/login.svg";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    login,
    clearAuthError,
    authState: { error, loading },
  } = useContext(AuthContext);
  return (
    <>
      {loading && <Loader />}
      <Container>
        <Alert open={error ? true : false} severity="error" onClose={clearAuthError} text={error} />
        <Grid container className={classes.container}>
          <Grid item xs={12} md={7} className={classes.imageContainer}>
            <img src={LoginSvg} alt="Login" />
          </Grid>
          <Grid item xs={12} md={5} className={classes.loginContainer}>
            <Typography variant="h4" className={classes.loginTitle}>
              Login
            </Typography>
            <TextField
              type="text"
              label="Username"
              variant="outlined"
              className={classes.formControl}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              className={classes.formControl}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => login(username, password)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LoginScreen;
