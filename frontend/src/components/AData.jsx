import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'

const AData = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [refreshCount]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/fetch');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = (event, ID) => {
    const value = event.target.checked ? 1 : 0;
    const IDD = ID;
    axios.put(`http://localhost:4000/updateData/${IDD}`, { IDD, value })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      setRefreshCount(refreshCount + 1);
  };

  const DeleteData = async (ID) => {
    axios.delete(`http://localhost:4000/delete/${ID}`)
      .then(response => {
        console.log("DELETE SUCCESS");
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setRefreshCount(refreshCount + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>ALL TASKS</h2>
      <table align="center" border='1'>
        <thead align="center" border='1'>
          <tr>
            <th>SR NO.</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>DATE</th>
            <th>COMPLETED</th>
            <th>DELETE</th>
            <th>MARK AS COMPLETED</th>
          </tr>
        </thead>
        <tbody align="center" border='1'>
          {currentItems.map((item,index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.TITLE}</td>
              <td>{item.DESCR}</td>
              <td>{item.DATE}</td>
              <td>{item.COMPLETED}</td>
              <td>
                <button className="delete" onClick={() => DeleteData(item.ID)}>
                  <svg viewBox="0 0 448 512" className="svgIcon">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              </td>
              <td>
                <input
                  type='checkbox'
                  checked={item.COMPLETED === 1}
                  onChange={(event) => handleUpdate(event, item.ID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">
        {data.length > itemsPerPage &&
          Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
           

            <>
            {/* <button 
            key={index}
            onClick={() => paginate(index + 1)}
            className={`page-btn ${currentPage === index + 1 ? 'current-page' : ''}`}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button> */}
          <button  key={index}
            onClick={() => paginate(index + 1)}
            className={`page-btn ${currentPage === index + 1 ? 'current-page' : ''}`}
            disabled={currentPage === index + 1}>
          <span> {index + 1}</span>
          </button>
          </>
            

          ))}
          
      </ul>
    </div>
  );
};
export default AData;
