import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import NotFoundSvg from "../assets/notfound.svg";

const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    height: "80%",
  },
  button: {
    color: "#fff",
  },
});

const NotFoundScreen = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={classes.image}
        src={NotFoundSvg}
        alt="Page Not Found"
      />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
        <Button variant="contained" color="primary" className={classes.button} component={Link} to="/">
          Kembali Ke Menu Utama
        </Button>
      </motion.div>
    </Container>
  );
};

export default NotFoundScreen;
