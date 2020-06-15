import React from "react";

export const useSortableData = (data, sort) => {

    const [sortedData, setSortedData] = React.useState(data);

    React.useEffect(() => {
        const tempData = [...data].sort((a, b) => {
            const tempA = getSplittedValue(a, sort.id);
            const tempB = getSplittedValue(b, sort.id);

            if (tempA < tempB) {
                return sort.direction === 'asc' ? -1 : 1;
            }
            if (tempA > tempB) {
                return sort.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setSortedData(tempData);
    }, [data, sort]);

    return { sortedData };
}

const getSplittedValue = (object, sort) => sort.split('.').reduce((p, prop) => p[prop], object);