import { Snackbar } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";
const Alert = ({ open, onClose, severity, text }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert onClose={onClose} severity={severity}>
        {text}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
