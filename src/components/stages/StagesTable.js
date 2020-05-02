import React from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

import { useSortableData } from "../TableApi";
import { UserContext } from '../../AppContext';

const useStyles = makeStyles((theme) => ({
    tableHead: {
        fontWeight: "bold"
    },
    button: {
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
        width: 90
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
        { id: 'stravaCount', type: "number", label: 'Aktivity', align: "right" }
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
                                {tableColumns.map((column, index) =>
                                    <TableCell key={index} align={column.align} >
                                        {column.type === "number" ? row[column.id].toLocaleString("cz") : row[column.id]}
                                    </TableCell>
                                )}
                                <TableCell align={"center"} >
                                    <Link component={Button} to={"/etapa/" + row.id} variant="contained" color="primary" size="small" className={classes.button} >
                                        Zobrazit
                                    </Link>
                                    {session.role === "admin" &&
                                        <Button variant="contained" size="small" className={classes.button} style={{ backgroundColor: "#ff7844", color: "white" }} onClick={() => props.onRowEdit("Upravit etapu", row)}>Upravit</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        )
                        }
                    </TableBody>
                }
            </Table>
        </TableContainer >
    );
};