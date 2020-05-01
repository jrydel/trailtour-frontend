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

import { useSortableData } from "../TableApi";

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

function seconds2time(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);
    var time = "";

    if (hours != 0) {
        time = hours + ":";
    }
    if (minutes != 0 || time !== "") {
        minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
        time += minutes + ":";
    }
    if (time === "") {
        time = seconds + "s";
    }
    else {
        time += (seconds < 10) ? "0" + seconds : String(seconds);
    }
    return time;
}

export const StageTable = props => {

    const classes = useStyles();

    const tableColumns = [
        { id: 'athleteName', label: 'Jméno', align: "center" },
        { id: 'clubName', label: 'Klub', align: "left" },
        { id: 'date', label: 'Datum', align: "left" },
        { id: 'time', type: "time", label: 'Čas', align: "right" },
        { id: 'pointsStrava', type: "number", label: 'Strava body', align: "right" }
    ];

    const [sort, setSort] = React.useState({ id: "time", direction: "asc" })
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
                        {sortedData.map(row => {
                            console.log(row);
                            return <TableRow>
                                {tableColumns.map(column =>
                                    <TableCell align={column.align} >
                                        {column.type === "number" ? row[column.id].toLocaleString("cz") : column.type === "time" ? seconds2time(row[column.id]) : row[column.id]}
                                    </TableCell>
                                )}
                            </TableRow>
                        })
                        }
                    </TableBody>
                }
            </Table>
        </TableContainer >
    );
};