import React, { useContext, useState, useEffect } from "react";
import { Typography, Grow, Fab, TextField } from "@material-ui/core";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
// OWN
import Template from "../components/Template";
import useStyles from "../styles/mainStyle";
import { MenuContext } from "../context/menuContext";
import { AuthContext } from "../context/authContext";
import Table from "../components/ClientTable";
import Alert from "../components/Alert";
import MenuModal from "../components/Modals/MenuModal";
import ConfirmDialog from "../components/ConfirmDialog";

const currency = new Intl.NumberFormat("id", {
  style: "currency",
  currency: "IDR",
});

const columns = [
  { field: "id", hide: true },
  { field: "namaMakanan", headerName: "Nama Makanan", width: 250 },
  { field: "harga", headerName: "Tarif Makanan", width: 200, valueFormatter: ({ value }) => currency.format(value) },
];
const MenuScreen = () => {
  // GLOBAL
  const {
    authState: { isLogin },
  } = useContext(AuthContext);
  const {
    getAllMenu,
    createMenu,
    updateMenu,
    deleteMenu,
    clearMenuError,
    clearMenuMessage,
    menuState: { loading, data, message, error },
  } = useContext(MenuContext);
  // LOCAL
  const classes = useStyles();
  //   State
  const [menu, setMenu] = useState();
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("create");
  const [update, setUpdate] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [search, setSearch] = useState("");
  //  Function
  const handleSelection = (table) => {
    setRows(table.rows || []);
  };
  const handleModalClose = () => {
    setModal(false);
  };
  const handleConfirmClose = () => {
    setConfirm(false);
  };
  const handleCreate = () => {
    setStatus("create");
    setModal(true);
  };
  const handleUpdate = () => {
    setStatus("update");
    const { namaMakanan, harga } = rows[0];
    const oneMenu = { namaMakanan, harga };
    setUpdate(oneMenu);
    setModal(true);
  };
  const handleSubmit = async (namaMakanan, harga) => {
    const body = { namaMakanan, harga };
    if (status === "create") await createMenu(body);
    if (status === "update") await updateMenu(rows[0].id, body);
    setModal(false);
  };
  const handleDelete = async () => {
    const id = rows.map((item) => item.id);
    deleteMenu(id);
    setConfirm(false);
  };
  useEffect(() => {
    let localData;
    if (search && data) {
      const colSearch = ["namaMakanan", "harga"];
      localData = data.filter((item) => {
        return colSearch.reduce((acc, curr) => {
          if (`${item[curr]}`.toLowerCase().includes(search)) acc = true;
          return acc;
        }, false);
      });
    } else {
      localData = data;
    }
    setMenu(localData);
  }, [data, search]);
  useEffect(() => {
    if (isLogin) getAllMenu();
  }, [getAllMenu, isLogin]);
  return (
    <>
      <Alert open={message && true} onClose={clearMenuMessage} severity="success" text={message} />
      <Alert open={error && true} onClose={clearMenuError} severity="error" text={error} />
      {confirm && <ConfirmDialog handleClose={handleConfirmClose} handleConfirm={handleDelete} />}
      {modal && <MenuModal handleClose={handleModalClose} handleSubmit={handleSubmit} status={status} data={update} />}
      <Template active="menu">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" className={classes.title}>
            Set Menu
          </Typography>
          <div className={classes.toolContainer}>
            <div className={classes.buttonsContainer}>
              {rows.length === 0 && (
                <Grow in>
                  <Fab className={classes.fabAdd} size="medium" onClick={handleCreate}>
                    <FaPlus />
                  </Fab>
                </Grow>
              )}
              {rows.length === 1 && (
                <Grow in>
                  <Fab className={classes.fabEdit} size="medium" onClick={handleUpdate}>
                    <FaPencilAlt />
                  </Fab>
                </Grow>
              )}
              {rows.length >= 1 && (
                <Grow in>
                  <Fab className={classes.fabDelete} size="medium" onClick={() => setConfirm(true)}>
                    <FaTrash />
                  </Fab>
                </Grow>
              )}
            </div>
            <div>
              <TextField
                type="text"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Table columns={columns} data={menu} loading={loading} handleSelection={handleSelection} />
        </motion.div>
      </Template>
    </>
  );
};

export default MenuScreen;
