import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableSortLabel, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';

import { useSortableData } from "../utils/TableUtils";
import { formatSeconds } from "../utils/FormatUtils";
import { ExternalLink } from '../Navigation';

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

export const StageTable = props => {

    const classes = useStyles();

    const tableColumns = [
        { id: 'position', label: 'Pozice', align: "center" },
        { id: 'athleteName', label: 'Jméno', align: "left" },
        { id: 'clubName', label: 'Klub', align: "left" },
        { id: 'date', label: 'Datum', align: "left" },
        { id: 'time', type: "time", label: 'Čas', align: "right" },
        { id: 'pointsStrava', type: "number", label: 'Body', align: "right" }
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
                                <TableCell align={"center"} >
                                    {row.position}
                                </TableCell>
                                <TableCell align={"left"} >
                                    {row.athlete.name}
                                </TableCell>
                                <TableCell align={"left"} >
                                    {row.club && row.club.name}
                                </TableCell>
                                <TableCell align={"left"} >
                                    {row.date}
                                </TableCell>
                                <TableCell align={"right"} >
                                    <ExternalLink to={"http://strava.com/activities/" + row.activityId}>{formatSeconds(row.time)}</ExternalLink>
                                </TableCell>
                                <TableCell align={"right"} >
                                    {row.pointsStrava}
                                </TableCell>
                            </TableRow>
                        })
                        }
                    </TableBody>
                }
            </Table>
        </TableContainer >
    );
};