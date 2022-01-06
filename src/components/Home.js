import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    console.log("Inside Home component");
    return(
        <div>
            <Link to="/all-banks">All Banks</Link>
        </div>
    );
}

export default Home;