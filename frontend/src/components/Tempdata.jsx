import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
const Tempdata = () => {
  const [data, setData] = useState([]);
 // const [checkboxState, setCheckboxState] = useState();
 
  useEffect(() => {
    // Fetch data from the database
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // Make API call to fetch data from the database
      const response = await fetch('http://localhost:4000/temp');
      const jsonData = await response.json();
      // Set the fetched data to state
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <h2>ALL TASKS</h2>
      <table align="center" border='1'>
        <thead align="center" border='1'>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>DATE</th>
            <th>COMPLELTED</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody align="center" border='1'>
          {data.map((item) => (
            <tr key={item.ID}>
              <td>{item.ID}</td>
              <td>{item.TITLE}</td>
              <td>{item.DESCR}</td>
              <td>{item.DATE}</td>
              <td>{item.COMPLETED}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Tempdata;
