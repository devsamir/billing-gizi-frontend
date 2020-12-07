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
const Table = ({
  options: { columns, data, result, limit, loading, handlePage, handleLimit, page, handleSort, handleSelection },
}) => {
  const classes = useStyles();
  return (
    <div className={classes.table}>
      <DataGrid
        columns={columns}
        rows={data || []}
        rowCount={result}
        pagination
        pageSize={limit}
        paginationMode="server"
        loading={loading}
        rowsPerPageOptions={[5, 10, 25, 50]}
        rowHeight={50}
        checkboxSelection
        onPageChange={handlePage}
        onPageSizeChange={handleLimit}
        page={page}
        onSortModelChange={handleSort}
        sortingMode="server"
        onSelectionChange={handleSelection}
      ></DataGrid>
    </div>
  );
};

export default Table;
