import React from "react";
import { makeStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
const useStyles = makeStyles((theme) => ({
  table: {
    margin: "1.5rem 0",
    height: "65vh",
    width: "100%",
  },
}));
const ClientTable = ({ columns, data, loading, handleSelection, autoHeight }) => {
  const classes = useStyles();
  return (
    <div className={classes.table}>
      {autoHeight ? (
        <DataGrid
          className={classes.dataGrid}
          columns={columns}
          rows={data || []}
          loading={loading}
          checkboxSelection
          onSelectionChange={handleSelection}
          autoHeight
          hideFooter
        ></DataGrid>
      ) : (
        <DataGrid
          className={classes.dataGrid}
          columns={columns}
          rows={data || []}
          pagination
          pageSize={10}
          loading={loading}
          rowsPerPageOptions={[5, 10, 25, 50]}
          checkboxSelection
          onSelectionChange={handleSelection}
        ></DataGrid>
      )}
    </div>
  );
};

export default ClientTable;
