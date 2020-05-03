import React from "react";

import { format } from "date-fns";
import { cs } from "date-fns/locale";

import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel, Box, Avatar, makeStyles } from "@material-ui/core";

import { useSortableData } from "../utils/TableUtils";
import { formatSeconds, formatStageNumber } from "../utils/FormatUtils";
import { AppLink, ExternalLink } from "../Navigation";

import FlagCZ from "../../files/flagcz.jpg";
import FlagSK from "../../files/flagsk.jpg";

const useStyles = makeStyles((theme) => ({
    tableHead: {
        fontWeight: "bold"
    },
    button: {
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
        width: 90
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(3)
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

    const nameRow = (id, number, name, country) => (
        <AppLink to={"/etapa/" + id}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Avatar alt="Country" variant="rounded" src={country === "cz" ? FlagCZ : FlagSK} className={classes.small} />
                <div style={{ marginLeft: 10 }} />
                {formatStageNumber(number) + " - " + name}
            </Box>


        </AppLink>
    );

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
                            console.log(row);
                            return <TableRow key={index}>
                                <TableCell align={"center"} >
                                    {format(Date.parse(row.dateTime), "PP - HH:mm:ss", { locale: cs })}
                                </TableCell>
                                <TableCell align={"left"} >
                                    {nameRow(row.stageId, row.stageNumber, row.stageName, row.stageCountry)}
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