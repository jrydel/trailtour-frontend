import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import yellow from '@material-ui/core/colors/yellow';

const useStyles = makeStyles({

    table: {
        minWidth: 200
    },
    tableHead: {
        fontWeight: "bold"
    }
});

const SegmnetsTable = props => {
    const classes = useStyles();

    const onTableRowClick = (event, row) => {
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>Název</TableCell>
                        <TableCell align="left" className={classes.tableHead}>Délka (km)</TableCell>
                        <TableCell align="left" className={classes.tableHead}>Převýšení (m)</TableCell>
                        <TableCell align="left" className={classes.tableHead}>Typ</TableCell>
                        {props.admin && <TableCell className={classes.tableHead} />}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData.map((row, index) => (
                        <TableRow
                            key={index}
                            onClick={(event) => onTableRowClick(event, row)}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.distance}</TableCell>
                            <TableCell align="left">{row.elevation}</TableCell>
                            <TableCell align="left">{row.type}</TableCell>
                            {props.admin && <TableCell align="right">
                                <Button variant="contained" color="primary" onClick={() => props.onRowEditClick("Upravit segment", row)} style={{ marginRight: 5 }}>Upravit</Button>
                                <Button variant="contained" color="secondary" onClick={() => props.onRowDeleteClick(row)} style={{ marginRight: 5 }}>Smazat</Button>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SegmnetsTable;