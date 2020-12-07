import { makeStyles } from "@material-ui/core/styles";
import RingLoader from "react-spinners/RingLoader";

const useStyles = makeStyles((theme) => ({
  loader: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.5)",
    zIndex: "10000",
    padding: 0,
    margin: 0,
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <RingLoader size={100} color="#1ecbe1" />
    </div>
  );
};

export default Loader;
