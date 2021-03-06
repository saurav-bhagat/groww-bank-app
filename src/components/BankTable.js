import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";

import { usePagination } from "../utils/Pagination";
import './../App.css';


const BankTable = ({ cityBanks, error, itemsCount }) => {

    const [ currentPageData, setCurrentPageData ] = useState([]);
    const [
        totalPages,
        startPageIndex,
        endPageIndex,
        currentPage,
        displayPage
    ] = usePagination(itemsCount, cityBanks.length);
    
    const navigate = useNavigate();

    let tempCurrentData = cityBanks.filter((bank, i) => i >= startPageIndex && i <= endPageIndex);
    
    const handleRowClick = (bank) => {
        navigate(`/bank-details/${bank.ifsc}`, { state: { details: bank } })
    }

    return (
        <div>

            {error && <div>{JSON.stringify(error)}</div>}

            {!error && tempCurrentData.length > 0 &&
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Bank</th>
                                <th>IFSC</th>
                                <th>Branch</th>
                                <th>Bank ID</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tempCurrentData.map((bank, i) =>
                                    <tr key={i} onClick={() => handleRowClick(bank)}>
                                        <td>{bank.bank_name}</td>
                                        <td>{bank.ifsc}</td>
                                        <td>{bank.branch}</td>
                                        <td>{bank.bank_id}</td>
                                        <td>{bank.address}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <Pagination 
                        count={totalPages} 
                        onChange={(event, value) => displayPage(value)} 
                        color="primary"
                        className="pagination"
                    />
                </div>
            }
        </div>
    );
}

export default BankTable;