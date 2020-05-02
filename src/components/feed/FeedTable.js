import React from "react";

import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { useSortableData } from "../TableApi";
import { secondsToTime } from "../Utils";

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

const FeedTable = props => {

    const classes = useStyles();

    const tableColumns = [
        { id: 'dateTime', label: 'Datum', align: "center" },
        { id: 'stageName', label: 'Etapa', align: "left" },
        { id: 'athleteName', label: 'Závodník', align: "left" },
        { id: 'time', type: "time", label: 'Čas', align: "right" },
        { id: 'position', type: "number", label: 'Pořadí na segmentu', align: "right" }
    ];

    const [sort, setSort] = React.useState({ id: "dateTime", direction: "desc" })
    const { sortedData } = useSortableData(props.rows, sort);

    const handleSort = columnId => {
        setSort({ id: columnId, direction: sort.direction === "asc" ? "desc" : "asc" });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableColumns.map((column, index) =>
                            <TableCell
                                key={index}
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
                        {sortedData.map((row, index) => {
                            return <TableRow key={index}>
                                {tableColumns.map((column, index) =>
                                    <TableCell key={index} align={column.align} >
                                        {column.type === "number" ? row[column.id].toLocaleString("cz") : column.type === "time" ? secondsToTime(row[column.id]) : row[column.id]}
                                    </TableCell>
                                )}
                            </TableRow>
                        })
                        }
                    </TableBody>
                }
            </Table >
        </TableContainer >
    );
}

export default FeedTable;