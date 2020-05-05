import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableSortLabel, TableHead, TableRow, Paper, makeStyles, Box, Typography, Tooltip } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

import { useSortableData } from "../utils/TableUtils";
import { formatSeconds } from "../utils/FormatUtils";
import { ExternalLink } from '../Navigation';
import { STRAVA_ACTIVITY_URL } from '../utils/FetchUtils';

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
        { id: 'timeTrailtour', type: "time", label: 'Čas TT', align: "right" },
        { id: 'points', type: "number", label: 'Body', align: "right" },
        { id: 'pointsTrailtour', type: "number", label: 'Body TT', align: "right" }
    ];

    const [sort, setSort] = React.useState({ id: "points", direction: "desc" })
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
                                    <Box display="flex" flexDirection="row" alignItems="center">
                                        <Typography noWrap={true} variant="inherit">{row.athleteName}</Typography>
                                        {row.athleteAbuser &&
                                            <Tooltip title="Závodník měl v minulosti privátní aktivitu.">
                                                <ErrorIcon color="secondary" style={{ marginLeft: 5 }} />
                                            </Tooltip>
                                        }
                                    </Box>
                                </TableCell>
                                <TableCell align={"left"} >
                                    {row.clubName}
                                </TableCell>
                                <TableCell align={"left"} >
                                    {row.date}
                                </TableCell>
                                <TableCell align={"right"} >
                                    <ExternalLink href={STRAVA_ACTIVITY_URL(row.activityId)}>{formatSeconds(row.time)}</ExternalLink>
                                </TableCell>
                                <TableCell align={"right"} >
                                    {formatSeconds(row.timeTrailtour)}
                                </TableCell>
                                <TableCell align={"right"} >
                                    {row.points}
                                </TableCell>
                                <TableCell align={"right"} >
                                    {row.pointsTrailtour}
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