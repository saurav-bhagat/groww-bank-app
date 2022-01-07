import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    console.log("Inside Home component");
    return(
        <div>
            <p>Please click on this link to get the bank details: </p>
            <Link to="/all-banks">All Banks</Link>
        </div>
    );
}

export default Home;