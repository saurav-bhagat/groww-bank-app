import { useState } from "react";


export const usePagination = (perPageRecords, totalRecords) => {

    const totalPages = Math.ceil(totalRecords / perPageRecords);

    const [startPageIndex, setStartPageIndex] = useState(0);
    const [endPageIndex, setEndPageIndex] = useState(perPageRecords - 1);
    const [currentPage, setCurrentPage] = useState(1);

    // change the page - update start and end index of data to be displayed
    const displayPage = (pageNum) => {
        setCurrentPage(pageNum);

        const newStartPageIndex = (perPageRecords * pageNum) - perPageRecords;
        const newEndPageIndex = (perPageRecords * pageNum) - 1;

        setStartPageIndex(newStartPageIndex);
        newEndPageIndex > totalRecords ?
            setEndPageIndex(totalRecords - 1) :
            setEndPageIndex(newEndPageIndex);
    }

    return [
        totalPages,
        startPageIndex,
        endPageIndex,
        currentPage,
        displayPage
    ];

}