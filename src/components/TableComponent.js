import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { SortingState, IntegratedSorting, SelectionState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    table: {
        width: "700px"
    }
}));

export const TableComponent = props => {

    const classes = useStyles();

    const [selection, setSelection] = useState();

    return (
        <Paper className={classes.root}>
            <Grid rows={props.rows} columns={props.columns}>
                <SelectionState
                    selection={selection}
                    onSelectionChange={setSelection}
                />
                <SortingState defaultSorting={props.sort} />
                <IntegratedSorting />
                <Table columnExtensions={props.columnExtensions} className={classes.table} />
                <TableHeaderRow showSortingControls />
            </Grid>
        </Paper>
    );
};