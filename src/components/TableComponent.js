import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    tableHead: {
        fontWeight: "bold"
    }
}));

const sortData = (data, id, direction) => {
    const temp = data;
    return temp.sort((a, b) => {
        if (a[id] < b[id]) {
            return direction === "asc" ? -1 : 1;
        }
        if (a[id] > b[id]) {
            return direction === "asc" ? 1 : -1;
        }
        return 0;
    });
}

export const TableComponent = props => {

    const classes = useStyles();

    const [tableColumns, setTableColumns] = React.useState(props.columns);
    const [tableData, setTableData] = React.useState(sortData(props.rows, props.sort.id, props.sort.direction));
    const [activeSort, setActiveSort] = React.useState(props.sort.id);
    const [sortDirection, setSortDirection] = React.useState(props.sort.direction)

    React.useEffect(() => {
        setTableColumns(props.columns);
        setActiveSort(props.sort.id);
        setSortDirection(props.sort.direction)
        setTableData(sortData(props.rows, props.sort.id, props.sort.direction));
    }, [props.rows, props.columns, props.sort]);

    const handleSort = (columnId) => {
        if (columnId === activeSort) {
            const newDirection = sortDirection === "asc" ? "desc" : "asc";
            setSortDirection(newDirection);
            setTableData(sortData(tableData, columnId, newDirection));
        } else {
            setActiveSort(columnId);
            setSortDirection("asc");
            setTableData(sortData(tableData, columnId, "asc"));
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableColumns.map(column =>
                            <TableCell
                                key={column.id}
                                className={classes.tableHead}
                                align={column.align}
                            >
                                <TableSortLabel
                                    active={activeSort === column.id}
                                    direction={sortDirection}
                                    onClick={() => handleSort(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow>
                            {tableColumns.map(column =>
                                <TableCell align={column.align} >
                                    {column.type === "number" ? row[column.id].toLocaleString("cz") : row[column.id]}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
};