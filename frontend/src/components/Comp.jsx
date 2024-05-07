import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'

const Pagi = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [refreshCount]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/com');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };





  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>COMPLETED</h2>
      <table align="center" border='1'>
        <thead align="center" border='1'>
          <tr>
            <th>SR NO.</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>DATE</th>
            <th>COMPLETED</th>
          </tr>
        </thead>
        <tbody align="center" border='1'>
          {currentItems.map((item,index) => (
            <tr key={item.ID}>
              <td>{index+1}</td>
              <td>{item.TITLE}</td>
              <td>{item.DESCR}</td>
              <td>{item.DATE}</td>
              <td>{item.COMPLETED}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">
        {data.length > itemsPerPage &&
          Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
           

            <><button 
            key={index}
            onClick={() => paginate(index + 1)}
            className={`page-btn ${currentPage === index + 1 ? 'current-page' : ''}`}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
          {/* <button class="buttonx">
          <span>Hover me</span>
          </button> */}
          </>
            
           
          ))}
          
      </ul>
    </div>
  );
};
export default Pagi;
