import axios from "axios"

const BANK_INFO_API = "https://vast-shore-74260.herokuapp.com/banks?city="

const fetchAllBanks = (city) => {
    return new Promise((resolve, reject) => {
        const url = BANK_INFO_API + city;
        axios.get(url)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
};


export { fetchAllBanks };