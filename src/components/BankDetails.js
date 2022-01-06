import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const BankDetails = () => {

    const data = useParams();
    const location = useLocation();

    const bankDetails = location.state.details;

    return(
        <div>
            Bank Details:

            <p>Bank Name: { bankDetails.bank_name }</p>
            <p>Bank Id: { bankDetails.bank_id }</p>
            <p>IFSC code: { bankDetails.ifsc }</p>
            <p>Branch: { bankDetails.branch }</p>
            <p>Address: { bankDetails.address }  </p>
            <p>City: { bankDetails.city } </p>
            <p>State: { bankDetails.state } </p>
        </div>
    );
};

export default BankDetails;