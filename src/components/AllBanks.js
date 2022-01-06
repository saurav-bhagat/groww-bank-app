import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BankTable from './BankTable';

const BANK_INFO_API = "https://vast-shore-74260.herokuapp.com/banks?city="

const AllBanks = () => {

    const [selectedCity, setSelectedCity] = useState('MUMBAI');
    const [cityBanks, setCityBanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getBankForCurrentCity = async () => {
            setLoading(true);
            try {
                const response = await axios.get(BANK_INFO_API + selectedCity);
                console.log(response);
                setLoading(false);
                setCityBanks(response.data);
            } catch (err) {
                console.log("Error in fetching bank details", err);
                setLoading(false);
                setError(err);
            }
        }

        getBankForCurrentCity();

    }, [selectedCity]);


    return (
        <div>
            All Banks
            <br /><br />
            <label htmlFor="city">Choose a city:</label>

            <select name="city" id="city-select" onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="MUMBAI">Mumbai</option>
                <option value="DELHI">Delhi</option>
                <option value="RANCHI">Ranchi</option>
                <option value="JAIPUR">Jaipur</option>
                <option value="CHENNAI">Chennai</option>
            </select>


            <label htmlFor="category">Choose a category:</label>

            <select name="category" id="category-select" onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="ifsc">IFSC</option>
                <option value="branch">Branch</option>
                <option value="bank_name">Bank Name</option>
            </select>

            <br/><br />
            <BankTable cityBanks={cityBanks} loading={loading} error={error} />
        </div>
    );
};

export default AllBanks;