import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { filter } from 'lodash';

import BankTable from './BankTable';
import '../App.css';

const BANK_INFO_API = "https://vast-shore-74260.herokuapp.com/banks?city="

const AllBanks = () => {

    const [selectedCity, setSelectedCity] = useState('MUMBAI');
    const [category, setCategory] = useState('all');
    const [cityBanks, setCityBanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [itemsCount, setItemsCount] = useState(10);

    const inputRef = useRef();

    useEffect(() => {
        const getBankForCurrentCity = async () => {
            setLoading(true);
            try {
                const cache = localStorage.getItem(BANK_INFO_API + selectedCity);
                if (cache) {
                    setLoading(false);
                    setFilteredData(JSON.parse(cache));
                    setCityBanks(JSON.parse(cache));
                    return;
                }
                const response = await axios.get(BANK_INFO_API + selectedCity);
                setLoading(false);
                setFilteredData(response.data);
                setCityBanks(response.data);
                localStorage.setItem(BANK_INFO_API + selectedCity, JSON.stringify(response.data));
            } catch (err) {
                console.log("Error in fetching bank details", err);
                setLoading(false);
                setError(err);
            }
        }

        getBankForCurrentCity();

    }, [selectedCity]);


    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(context, args);
            }, 500);
        }
    }

    const handleInputChange = (e) => {
        console.log("HandleInput change called", e.target.value, category, cityBanks);
        let searchStr = e.target.value.toUpperCase();
        console.log(searchStr);
        const results = filter(cityBanks, (item) => {
            return item[category].indexOf(searchStr) > -1;
        });
        setFilteredData(results);
    }

    const optimisedSearch = useCallback(debounce(handleInputChange), [category]);

    const handleCategoryChange = (e) => {
        inputRef.current.value = '';
        console.log("Category is: ", e.target.value);
        setCategory(e.target.value);
        if (e.target.value === 'all') {
            setFilteredData(cityBanks);
            return;
        }
    }

    const handleItemsChange = (e) => {
        const itemsCount = Number(e.target.value);
        setItemsCount(itemsCount);
    }

    return (
        <div>
            <div className='action-section'>

                <div className='action-item action-city'>
                    <label htmlFor="city">Choose a city:</label>

                    <select name="city" id="city-select" onChange={(e) => setSelectedCity(e.target.value)}>
                        <option value="MUMBAI">Mumbai</option>
                        <option value="DELHI">Delhi</option>
                        <option value="RANCHI">Ranchi</option>
                        <option value="JAIPUR">Jaipur</option>
                        <option value="CHENNAI">Chennai</option>
                    </select>
                </div>

                <div className='action-item action-category'>
                    <label htmlFor="category">Choose a category:</label>

                    <select name="category" id="category-select" onChange={handleCategoryChange}>
                        <option value="all">All</option>
                        <option value="ifsc">IFSC</option>
                        <option value="branch">Branch</option>
                        <option value="bank_name">Bank Name</option>
                    </select>
                </div>

                <div className='action-item action-search'>
                    <input ref={inputRef} placeholder="Enter search text..." onChange={optimisedSearch} />
                </div>

                <div className='action-item action-items'>
                    <label htmlFor="items">Select number of Items:</label>

                    <select name="items" id="items-count" onChange={handleItemsChange}>
                        <option value="10">10</option>
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>

            </div>
            {loading && <div>Loading Bank Data... </div>}
            {!loading && <BankTable cityBanks={filteredData} error={error} itemsCount={itemsCount} />}
            
        </div>
    );
};

export default AllBanks;