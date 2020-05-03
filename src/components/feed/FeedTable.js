import React from "react";

import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from "@material-ui/core";

import { useSortableData } from "../utils/TableUtils";
import { formatSeconds } from "../utils/FormatUtils";
import { AppLink, ExternalLink } from "../Navigation";

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
                                <TableCell align={"center"} >
                                    {row.dateTime}
                                </TableCell>
                                <TableCell align={"left"} >
                                    <AppLink to={"/etapa/" + row.stageId}>{row.stageNumber + " - " + row.stageName}</AppLink>
                                </TableCell>
                                <TableCell align={"left"} >
                                    {row.athleteName}
                                </TableCell>
                                <TableCell align={"right"} >
                                    <ExternalLink to={"http://strava.com/activities/" + row.activityId}>{formatSeconds(row.time)}</ExternalLink>
                                </TableCell>
                                <TableCell align={"right"} >
                                    {row.position}
                                </TableCell>
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