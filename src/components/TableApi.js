import React, { useEffect, useReducer } from "react";

export const useSortableData = (data, sort) => {

    const [sortedData, setSortedData] = React.useState(data);

    React.useEffect(() => {
        const tempData = [...data].sort((a, b) => {
            if (a[sort.id] < b[sort.id]) {
                return sort.direction === 'asc' ? -1 : 1;
            }
            if (a[sort.id] > b[sort.id]) {
                return sort.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setSortedData(tempData);
    }, [data, sort]);

    return { sortedData };
}