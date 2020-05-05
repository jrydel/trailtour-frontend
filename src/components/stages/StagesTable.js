import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableSortLabel, TableHead, TableRow, Button, Paper, makeStyles } from '@material-ui/core';

import { useSortableData } from "../utils/TableUtils";
import { formatNumber, formatStageNumber } from "../utils/FormatUtils";
import { UserContext } from '../../AppContext';
import { AppLink } from "../Navigation";

const useStyles = makeStyles((theme) => ({
    tableHead: {
        fontWeight: "bold"
    },
    button: {
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
        width: 90
    }, small: {
        width: theme.spacing(4),
        height: theme.spacing(2),
        marginLeft: theme.spacing(1)
    }
}));

export const StagesTable = props => {

    const { session } = React.useContext(UserContext);
    const classes = useStyles();

    const tableColumns = [
        { id: 'number', type: "number", label: 'Číslo', align: "center" },
        { id: 'name', label: 'Název', align: "left" },
        { id: 'type', label: 'Typ', align: "left" },
        { id: 'distance', type: "number", label: 'Délka (m)', align: "right" },
        { id: 'elevation', type: "number", label: 'Převýšení (m)', align: "right" },
        { id: 'activities', type: "number", label: 'Aktivity', align: "right" }
    ];

    const [sort, setSort] = React.useState({ id: "number", direction: "asc" })
    const { sortedData } = useSortableData(props.rows, sort);
    const handleSort = columnId => {
        setSort({ id: columnId, direction: sort.direction === "asc" ? "desc" : "asc" });
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
                                    active={sort.id === column.id}
                                    direction={sort.direction}
                                    onClick={() => handleSort(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        )}
                        <TableCell className={classes.tableHead} align={"center"} key={"action"} />
                    </TableRow>
                </TableHead>
                {sortedData && sortedData.length > 0 &&
                    <TableBody>
                        {sortedData.map((row, index) =>
                            <TableRow key={index}>
                                <TableCell align={"center"} >
                                    {formatStageNumber(row.number)}
                                </TableCell>
                                <TableCell align={"left"} >
                                    <AppLink to={"/etapy/" + (props.tab === 0 ? "cz" : "sk") + "/" + row.number}>
                                        {formatNumber(row.name)}
                                    </AppLink>
                                </TableCell>
                                <TableCell align={"left"} >
                                    {row.type}
                                </TableCell>
                                <TableCell align={"right"} >
                                    {formatNumber(row.distance)}
                                </TableCell>
                                <TableCell align={"right"} >
                                    {formatNumber(row.elevation)}
                                </TableCell>
                                <TableCell align={"right"} >
                                    {formatNumber(row.activities)}
                                </TableCell>
                                <TableCell align={"center"} >
                                    {session.role === "admin" &&
                                        <Button disabled={true} variant="contained" size="small" className={classes.button} onClick={() => props.onRowEdit("Upravit etapu", row)}>Upravit</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        )
                        }
                    </TableBody>
                }
            </Table >
        </TableContainer >
    );
};