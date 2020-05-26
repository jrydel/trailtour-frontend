import React from "react";
import { TableContainer, Table, TableRow, TableCell, TableSortLabel, Paper, TableBody, TableHead, Typography, Box } from "@material-ui/core";
import { sortArray } from "./utils/SortUtils";

const TableComponent = props => {

    const [tableData, setTableData] = React.useState([]);
    const [tableSort, setTableSort] = React.useState({ id: "", direction: "asc" });

    React.useEffect(() => {
        setTableSort(props.sort);
        setTableData(sortArray(props.data, props.sort.key, props.sort.direction));
    }, [props.data, props.sort]);

    const sortData = key => {
        const newDirection = tableSort.direction === "asc" ? "desc" : "asc";
        setTableSort({ key: key, direction: newDirection });
        setTableData(sortArray(tableData, key, newDirection));
    }

    return tableData.length !== 0 &&
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.options.map(column =>
                            <TableCell
                                key={column.id}
                                align={column.align}
                            >
                                {column.sort ? (
                                    <TableSortLabel
                                        active={tableSort.key === column.sort}
                                        direction={tableSort.direction}
                                        onClick={() => sortData(column.sort)}
                                    >
                                        <Typography component="div" noWrap>
                                            <Box fontWeight="fontWeightBold">{column.label}</Box>
                                        </Typography>
                                    </TableSortLabel>
                                ) : <Typography component="div" noWrap>
                                        <Box fontWeight="fontWeightBold">{column.label}</Box>
                                    </Typography>
                                }
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, key) => (
                        <TableRow key={key}>
                            {props.options.map((column, key) => (
                                <TableCell key={key} align={column.align} >
                                    {column.render(row)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </TableContainer >;
}

export default TableComponent;