import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
    return(
        <>
        <center>
            <h1>
                TASK MANAGER
            </h1>
            <Link to="/Db"><button>DASHBOARD</button></Link>
            
        </center>
        </>
    )
}

export default Home;