import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { SortingState, IntegratedSorting, } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, } from '@devexpress/dx-react-grid-material-ui';

export const TableComponent = props => {

    return (
        <Paper>
            <Grid rows={props.rows} columns={props.columns} >
                <SortingState defaultSorting={props.sort} />
                <IntegratedSorting />
                <Table />
                <TableHeaderRow showSortingControls />
            </Grid>
        </Paper>
    );
};