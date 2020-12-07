import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {},
  container: {
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    borderRadius: "10px",
    height: "90vh",
    marginTop: "5vh",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      height: "80%",
    },
    background: theme.palette.primary.light,
    borderRadius: "10px",
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "10px",
  },
  loginTitle: {
    textAlign: "center",
    fontFamily: "Staatliches",
    fontSize: "2.5rem",
    letterSpacing: "3px",
  },
  formControl: {
    margin: "1rem 0",
    width: "80%",
  },
  button: {
    width: "80%",
    fontSize: "1rem",
    marginTop: "1rem",
    color: "#fff",
  },
}));
