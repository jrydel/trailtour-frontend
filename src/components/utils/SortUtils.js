import React from "react";

export const sortArray = (data, key, direction) => {
    const split = key.split(".");
    return data.sort((a, b) => {
        var val1 = a, val2 = b, i = 0;
        while (i < split.length) {
            val1 = val1[split[i]];
            val2 = val2[split[i]];
            i++;
        }
        if (val1 < val2) {
            return direction === 'asc' ? -1 : 1;
        }
        if (val1 > val2) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

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