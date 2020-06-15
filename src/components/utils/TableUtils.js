import React from "react";
import { useSortableData } from "./SortUtils";

import { FiArrowDown, FiArrowUp } from "react-icons/fi";

const SimpleHeader = ({ option }) => {

    const justifyClass = option.align === "right" ? "justify-end" : option.align === "left" ? "justify-start" : "justify-center";

    return <div className={`flex flex-row items-center font-bold ${justifyClass}`}>
        {option.header}
    </div>
}

const SortableHeader = ({ option, sort }) => {

    const justifyClass = option.align === "right" ? "justify-end" : option.align === "left" ? "justify-start" : "justify-center";
    const orderClass = option.align === "right" ? "order-first mr-1" : "order-last ml-1";
    const colorClass = option.sort.id === sort.id ? "text-dark" : "text-light";

    return <div className={`flex flex-row items-center ${justifyClass}`}>
        {option.header}
        {
            sort.direction === "asc" ? <FiArrowUp className={`${orderClass} w-3 h-3 ${colorClass}`} /> : <FiArrowDown className={`${orderClass} w-3 h-3 ${colorClass}`} />
        }
    </div>
};

export const Table = ({ options, data }) => {

    const [tableSort, setTableSort] = React.useState(options.find(element => element.sort.direction).sort);
    const { sortedData } = useSortableData(data ? data : [], tableSort);

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        {
                            options.map((option, index) => {
                                if (!option.header) {
                                    return null;
                                }
                                if (option.sort) {
                                    return <th key={`table-header-${index}`}
                                        className={`py-4 px-6 border-b border-grey-light cursor-pointer`}
                                        onClick={() => setTableSort(prev => ({ id: option.sort.id, direction: prev.direction === "asc" ? "desc" : "asc" }))} >
                                        <SortableHeader option={option} sort={tableSort} />
                                    </th>
                                } else {
                                    return <th key={`table-header-${index}`} className={`py-4 px-6 border-b border-grey-light`} >
                                        <SimpleHeader option={option} />
                                    </th>
                                }
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedData && sortedData.map((row, index) => (
                            <tr key={`table-row-${index}`}>
                                {
                                    options.map((option, index2) => (
                                        <td key={`table-row-${index}-col-${index2}`} className={`py-4 px-6 text-dark text-${option.align} border-b border-grey-light`}>{option.render(row)}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export const TableRow = props => {

}