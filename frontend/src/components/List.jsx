import React from "react";
import { useState } from "react";
import axios from 'axios';
import AData from "./AData";
import Pending from "./Pending";
import Comp from "./Comp";

import MyDatePicker from "./DatePicker";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
import './Db';


const List = (props) =>{
    const [selectedDrop, setselectedDrop] = useState('ALL');
    console.log("Props:", props); // Log props to inspect its structure
  // Check if props.location and props.location.state are defined before accessing their properties
  const { title, description, firstTenChars } = props.location && props.location.state ? props.location.state : {};
    console.log(title,description,firstTenChars);
//     const { state } = props.location;
//  const { title, description ,firstTenChars} = state;
//  console.log(title,description,firstTenChars);
    const changeDrop = (e) => {
        // console.log("chnage")
        setselectedDrop(e);
        const value = e.target.value;
        
        setselectedDrop(value);
    }

    
    return(
        <div>
        <h1 align="center">
            LIST PAGE
        </h1>
        <div align="center">
        <Link to="/Db"><button className="button button1">BACK</button></Link><br></br>
        <br></br>
            <tr>
                <td>
                    <label>STATUS</label>
                </td>
                <td>
                <select value={selectedDrop} onChange={changeDrop}>
                    <option selected>ALL</option>
                    <option>PENDING</option>
                    <option>COMPLETED</option>
                </select>
                </td>
            </tr>
            
       
        </div>
        <div>
             {selectedDrop === "ALL" && <AData/>}
          {selectedDrop === "PENDING" && <Pending></Pending>}
          {selectedDrop === "COMPLETED" && <Comp></Comp>}
        </div>
        </div>
    )
}
export default List;