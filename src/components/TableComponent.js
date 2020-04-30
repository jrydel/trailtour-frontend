import React from "react";

import Paper from '@material-ui/core/Paper';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";

import MUIDataTable from "mui-datatables";

const TableComponent = props => {

    return (
        <MUIDataTable
            data={props.tableData}
            columns={props.tableHeader}
            options={{
                selectableRows: "none",
                rowsPerPage: 10,
                rowsPerPageOptions: [10, 15, 30],
                sort: true,
                filter: false,
                search: true,
                print: false,
                download: false,
                viewColumns: false,
                responsive: "scrollFullHeightFullWidth"
            }}
        />
    );
}

export default TableComponent;