import React, { useState, useContext } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import {
  FaBed,
  FaUserCog,
  FaListAlt,
  FaUtensils,
  FaMoneyCheckAlt,
  FaHistory,
} from "react-icons/fa";
import { Button, Container } from "@material-ui/core";
import { MdMenu, MdKeyboardArrowLeft, MdDashboard } from "react-icons/md";
import useStyles from "../styles/templateStyle";
import { AuthContext } from "../context/authContext";
import { BadgeContext } from "../context/badgeContext";

function Template({ children, active }) {
  // GLOBAL STATE
  const {
    authState: { userData },
    logout,
  } = useContext(AuthContext);
  const {
    badgeState: { badge },
  } = useContext(BadgeContext);
  // LOCAL
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <div style={{ display: "flex" }}>
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={classes.toolbar}>
            {!open ? (
              <IconButton onClick={handleDrawerOpen}>
                <MdMenu color="#fff" size={35} />
              </IconButton>
            ) : null}
            <Typography variant="h6" className={classes.navBrand}>
              Sistem Billing Gizi
            </Typography>
            <Button
              style={{ color: "white", fontSize: "1rem", marginLeft: "auto" }}
              onClick={logout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbarMixins}></div>
        <Drawer variant="persistent" anchor="left" open={open}>
          <IconButton
            onClick={handleDrawerClose}
            className={classes.closeDrawer}
          >
            <MdKeyboardArrowLeft />
            <Typography variant="button">Hide</Typography>
          </IconButton>

          <Divider />
          <Typography variant="h4" className={classes.sidebarBrand}>
            RSSK
          </Typography>
          {userData && (
            <>
              <Divider />
              <div className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  {userData.name.split("")[0]}
                </Avatar>
                <span className={classes.avatarName}>
                  Hallo {userData.name} !
                </span>
              </div>
            </>
          )}
          {/* LIST ITEM */}
          <List className={classes.sidebarList}>
            {userData && (
              <ListItem
                button
                className={clsx(
                  classes.sidebar,
                  active === "dashboard" && classes.sidebarActive
                )}
                component={Link}
                to={"/admin/dashboard"}
              >
                <ListItemIcon
                  className={clsx(
                    classes.pasienIcon,
                    active === "dashboard" && classes.iconActive
                  )}
                >
                  <MdDashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            )}
            {userData &&
              (userData.role === "admin" || userData.role === "gizi") && (
                <ListItem
                  button
                  className={clsx(
                    classes.sidebar,
                    active === "pesanan" && classes.sidebarActive
                  )}
                  component={Link}
                  to={"/admin/pesanan"}
                >
                  <ListItemIcon
                    className={clsx(
                      classes.pasienIcon,
                      active === "pesanan" && classes.iconActive
                    )}
                  >
                    <Badge badgeContent={badge?.pesanan || 0} color="secondary">
                      <FaUtensils />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Pesanan" />
                </ListItem>
              )}
            {userData &&
              (userData.role === "admin" || userData.role === "keuangan") && (
                <ListItem
                  button
                  className={clsx(
                    classes.sidebar,
                    active === "billing" && classes.sidebarActive
                  )}
                  component={Link}
                  to={"/admin/billing"}
                >
                  <ListItemIcon
                    className={clsx(
                      classes.pasienIcon,
                      active === "billing" && classes.iconActive
                    )}
                  >
                    <Badge badgeContent={badge?.billing || 0} color="secondary">
                      <FaMoneyCheckAlt />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Billing" />
                </ListItem>
              )}
            {userData &&
              (userData.role === "admin" || userData.role === "gizi") && (
                <ListItem
                  button
                  className={clsx(
                    classes.sidebar,
                    active === "kamar" && classes.sidebarActive
                  )}
                  component={Link}
                  to={"/admin/kamar"}
                >
                  <ListItemIcon
                    className={clsx(
                      classes.pasienIcon,
                      active === "kamar" && classes.iconActive
                    )}
                  >
                    <FaBed />
                  </ListItemIcon>
                  <ListItemText primary="Kamar" />
                </ListItem>
              )}
            {userData &&
              (userData.role === "admin" || userData.role === "gizi") && (
                <ListItem
                  button
                  className={clsx(
                    classes.sidebar,
                    active === "menu" && classes.sidebarActive
                  )}
                  component={Link}
                  to={"/admin/menu"}
                >
                  <ListItemIcon
                    className={clsx(
                      classes.pasienIcon,
                      active === "menu" && classes.iconActive
                    )}
                  >
                    <FaListAlt />
                  </ListItemIcon>
                  <ListItemText primary="Set Menu" />
                </ListItem>
              )}
            {userData &&
              (userData.role === "admin" ||
                userData.role === "gizi" ||
                userData.role === "keuangan") && (
                <ListItem
                  button
                  className={clsx(
                    classes.sidebar,
                    active === "riwayat" && classes.sidebarActive
                  )}
                  component={Link}
                  to={"/admin/riwayat"}
                >
                  <ListItemIcon
                    className={clsx(
                      classes.pasienIcon,
                      active === "riwayat" && classes.iconActive
                    )}
                  >
                    <FaHistory />
                  </ListItemIcon>
                  <ListItemText primary="Riwayat Billing" />
                </ListItem>
              )}
            {userData && userData.role === "admin" && (
              <ListItem
                button
                className={clsx(
                  classes.sidebar,
                  active === "user" && classes.sidebarActive
                )}
                component={Link}
                to={"/admin/user"}
              >
                <ListItemIcon
                  className={clsx(
                    classes.pasienIcon,
                    active === "user" && classes.iconActive
                  )}
                >
                  <FaUserCog />
                </ListItemIcon>
                <ListItemText primary="User Setting" />
              </ListItem>
            )}
          </List>
          {/* END LIST ITEM */}
          <Divider />
          {/* DIMOHON UNTUK TIDAK MENGHILANGKAN COPYRIGHT, BILA ANDA MENGHILANGKAN COPYRIGHT TANPA SEIJIN DEVELOPER, ITU BERARTI ANDA MENDUKUNG KEDZOLIMAN DAN PERBUDAKAN TERHADAP PARA PROGRAMER, PROGRAMER LIVES MATTER */}
          {/* DIMOHON UNTUK TIDAK MENGHILANGKAN COPYRIGHT, BILA ANDA MENGHILANGKAN COPYRIGHT TANPA SEIJIN DEVELOPER, ITU BERARTI ANDA MENDUKUNG KEDZOLIMAN DAN PERBUDAKAN TERHADAP PARA PROGRAMER, PROGRAMER LIVES MATTER */}
          {/* DIMOHON UNTUK TIDAK MENGHILANGKAN COPYRIGHT, BILA ANDA MENGHILANGKAN COPYRIGHT TANPA SEIJIN DEVELOPER, ITU BERARTI ANDA MENDUKUNG KEDZOLIMAN DAN PERBUDAKAN TERHADAP PARA PROGRAMER, PROGRAMER LIVES MATTER */}
          <Typography variant="caption" className={classes.copyright}>
            &copy; DevSam 2020
          </Typography>
          {/* DIMOHON UNTUK TIDAK MENGHILANGKAN COPYRIGHT, BILA ANDA MENGHILANGKAN COPYRIGHT TANPA SEIJIN DEVELOPER, ITU BERARTI ANDA MENDUKUNG KEDZOLIMAN DAN PERBUDAKAN TERHADAP PARA PROGRAMER, PROGRAMER LIVES MATTER */}
          {/* DIMOHON UNTUK TIDAK MENGHILANGKAN COPYRIGHT, BILA ANDA MENGHILANGKAN COPYRIGHT TANPA SEIJIN DEVELOPER, ITU BERARTI ANDA MENDUKUNG KEDZOLIMAN DAN PERBUDAKAN TERHADAP PARA PROGRAMER, PROGRAMER LIVES MATTER */}
          {/* DIMOHON UNTUK TIDAK MENGHILANGKAN COPYRIGHT, BILA ANDA MENGHILANGKAN COPYRIGHT TANPA SEIJIN DEVELOPER, ITU BERARTI ANDA MENDUKUNG KEDZOLIMAN DAN PERBUDAKAN TERHADAP PARA PROGRAMER, PROGRAMER LIVES MATTER */}
        </Drawer>
      </div>
      <div
        className={clsx(classes.mainBody, {
          [classes.mainBodyShift]: open,
        })}
      >
        <Container>{children}</Container>
      </div>
    </div>
  );
}

export default Template;
