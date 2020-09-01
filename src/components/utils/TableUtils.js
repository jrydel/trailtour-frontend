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
            sort.direction === "asc" ? <FiArrowUp className={`${orderClass} w-4 h-4 ${colorClass}`} /> : <FiArrowDown className={`${orderClass} w-4 h-4 ${colorClass}`} />
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
                                        className={`py-4 px-6 border-b border-grey-light cursor-pointer uppercase text-sm`}
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

export const TablePagination = ({ page, lastPage, onNextPageClick, onPreviousPageClick }) => {

    return (
        <div>
            <nav className="flex items-center justify-center flex-no-wrap shadow-navbar p-4">
                <span className="mr-2">{`Stránka: ${1 + page} z ${lastPage}`}</span>
                <button type="button" className={`flex items-center px-2 py-2 roudned bg-light rounded text-sm font-bold text-dark focus:outline-none border border-gray-300 ${page === 0 ? "opacity-50" : ""}`} onClick={onPreviousPageClick}>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <button type="button" className={`flex items-center px-2 py-2 roudned bg-light text-sm font-bold text-dark focus:outline-none border border-gray-300 ${page === lastPage ? "opacity-50" : ""}`} onClick={onNextPageClick}>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </nav>
        </div>
    )
}

export const TableRow = ({ children, className }) => {

    return (
        <div className={`flex flex-col sm:flex-row p-4 ${className}`}>
            {children}
        </div>
    );
}

export const TableCol = ({ children, className }) => {

    return (
        <div className={`flex flex-col sm:flex-row mx-2 ${className}`}>
            {children}
        </div>
    );
}

export const FlexTable = ({ options, data }) => {

    const [tableSort, setTableSort] = React.useState(options.find(element => element.sort.direction).sort);
    const { sortedData } = useSortableData(data ? data : [], tableSort);

    return (
        <div className="flex flex-col">
            {/* header */}
            <div className="hidden sm:flex flex-row p-4 border-b border-grey-light uppercase text-sm font-bold">
                {
                    options.map((option, index) => {
                        if (!option.header) return null;
                        if (option.sort) {
                            return <div key={`table-header-${index}`}
                                className="flex-1 cursor-pointer"
                                onClick={() => setTableSort(prev => ({ id: option.sort.id, direction: prev.direction === "asc" ? "desc" : "asc" }))} >
                                <SortableHeader option={option} sort={tableSort} />
                            </div>
                        } else {
                            return <div key={`table-header-${index}`}
                                className="flex-1" >
                                <SimpleHeader option={option} />
                            </div>
                        }
                    })
                }
            </div>
            {/* body */}
            {
                sortedData && sortedData.map((row, index) => (
                    <div key={`table-row-${index}`} className={`flex flex-col sm:flex-row items-center p-4 border-b border-grey-light`}>
                        {
                            options.map((option, index2) => (
                                <div key={`table-row-${index}-col-${index2}`} className={`flex-1 text-dark items-center justify-center text-center`}>{option.render(row)}</div>
                            ))
                        }
                    </div>
                ))
            }

        </div >
    );
}