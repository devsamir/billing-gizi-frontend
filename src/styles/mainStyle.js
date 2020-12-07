import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  title: {
    fontWeight: 300,
    textTransform: "uppercase",
    letterSpacing: "2px",
    margin: "1rem 0",
  },
  toolContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fabAdd: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    marginRight: "1rem",
  },
  fabEdit: {
    color: "#fff",
    backgroundColor: theme.palette.warning.main,
    marginRight: "1rem",
  },
  fabDelete: {
    color: "#fff",
    backgroundColor: theme.palette.error.main,
    marginRight: "1rem",
  },
  fabBelum: {
    color: "#fff",
    backgroundColor: theme.palette.error.main,
    marginRight: "1rem",
    fontSize: "1.25rem",
  },
  fabInfo: {
    color: "#fff",
    backgroundColor: theme.palette.info.main,
    marginRight: "1rem",
  },
  fabPrint: {
    color: "#fff",
    backgroundColor: theme.palette.success.main,
    marginRight: "1rem",
  },
  formGroup: {
    margin: "1rem 0",
  },
  formControl: {
    width: "100%",
  },
  title6: {
    fontWeight: 300,
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  buttonPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    margin: "2rem 0",
  },
  buttonWarning: {
    backgroundColor: theme.palette.warning.main,
    color: "#fff",
    margin: "2rem 0",
  },
  billingContainer: {
    margin: "2rem 0",
  },
  billingSearch: {
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
  },
  buttonSearch: {
    marginLeft: "1rem",
    color: "#fff",
  },
  buttonsContainer: {
    margin: "1rem 0",
    minHeight: "3rem",
  },
  pesanan: {
    margin: "2rem 0",
    color: "rgba(0,0,0,0.7)",
  },
  header: {
    padding: "0 1rem",
  },
  listContainer: {
    width: "100%",
    boxShadow: theme.shadows[1],
    padding: "2rem 1rem",
    margin: "1rem 0",
    borderLeftSize: "5px",
    borderLeftColor: theme.palette.primary.main,
    borderLeftStyle: "solid",
    borderRadius: "5px",
  },
  qtyInput: {
    width: "50px",
    height: "40px",
  },
  totalContainer: {
    fontSize: "1rem",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  listSaldo: {
    display: "flex",
    boxShadow: theme.shadows[3],
    margin: "1rem 0",
  },
  listSaldoItem: {
    borderRight: `1px solid rgba(0,0,0,0.15)`,
  },
  avatarPrimary: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  avatarSuccess: {
    color: "#fff",
    backgroundColor: theme.palette.success.main,
  },
  avatarDanger: {
    color: "#fff",
    backgroundColor: theme.palette.error.main,
  },
  avatarInfo: {
    color: "#fff",
    backgroundColor: theme.palette.info.main,
  },
  overview: {
    alignItems: "center",
    margin: "1rem 0",
  },
  marginAxis: {
    margin: "1rem 0",
  },
}));
