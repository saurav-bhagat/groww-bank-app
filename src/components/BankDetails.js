import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './../App.css';

const BankDetails = () => {

    const location = useLocation();

    const bankDetails = location.state.details;

    return(
        <div className='bank-details-container'>

            <Link to="/all-banks">Back</Link>
            <h3>Bank Details:</h3>

            <table>
                <tr>
                    <th>Bank Name: </th>
                    <td>{ bankDetails.bank_name }</td>
                </tr>
                <tr>
                    <th>Bank Id: </th>
                    <td>{ bankDetails.bank_id }</td>
                </tr>
                <tr>
                    <th>IFSC code:</th>
                    <td>{ bankDetails.ifsc }</td>
                </tr>
                <tr>
                    <th>Branch:</th>
                    <td>{ bankDetails.branch }</td>
                </tr>
                <tr>
                    <th>City:</th>
                    <td>{ bankDetails.city }</td>
                </tr>
                <tr>
                    <th>State:</th>
                    <td>{ bankDetails.state }</td>
                </tr>
            </table>
        </div>
    );
};

export default BankDetails;