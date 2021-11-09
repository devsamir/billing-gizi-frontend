import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  navBrand: {
    marginLeft: "1.25rem",
    color: "#fff",
  },
  closeDrawer: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  sidebarBrand: {
    fontFamily: "Staatliches",
    color: "#333",
    margin: "0 auto",
    letterSpacing: "0.2rem",
    marginTop: "1.5rem",
  },
  sidebarList: {
    marginTop: "1rem",
  },
  sidebar: {
    width: 240,
    flexShrink: 0,
    margin: "0.25rem 1rem",
    borderRadius: "4px",
  },
  sidebarActive: {
    background: theme.palette.primary.main,
    cursor: "context-menu",
    "&>*": {
      color: "white",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  copyright: {
    color: "#aaa",
    margin: "1rem auto 0",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    padding: "0 2rem",
  },
  toolbarMixins: {
    ...theme.mixins.toolbar,
  },
  mainBody: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: "2rem",
  },
  mainBodyShift: {
    width: `calc(100% - ${300}px)`,
    marginLeft: 300,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  iconActive: {
    color: "#fff !important",
  },
  dashboardIcon: {
    color: theme.palette.primary.main,
  },
  pengeluaranIcon: {
    color: theme.palette.error.main,
  },
  pemasukanIcon: {
    color: theme.palette.info.main,
  },
  jenisIcon: {
    color: theme.palette.secondary.main,
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    margin: "1.5rem 1rem",
    justifyContent: "space-between",
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    margin: "0 1rem",
  },
  avatarName: {
    marginRight: "auto",
    fontFamily: "Staatliches",
    fontSize: "1.2rem",
    letterSpacing: "2px",
  },
}));
