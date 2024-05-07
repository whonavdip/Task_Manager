import React, { useState } from "react";
import axios from 'axios';
import './style.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";

const Db = () => {
  const [tdata, settdata] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [nulltitle, setnulltitle] = useState(true);
  const [directsave, setdirectsave] = useState(true);
  const [isadd, setisadd] = useState(true);
  const [ifvalid, setifvalid] = useState(true);
  const [titlelimit, setitlelimit] = useState(true);
  const [deslimit, setdeslimit] = useState(true);
  const [ifvaliddes, setifvaliddes] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  var dateString ="";
  var firstTenChars = "";
  const [dateonly, setdateonly] = useState('');
  const datatopass ={title:title,
                      description:description,
                      firstTenChars:firstTenChars
                    }
  const handleDateChangeDate = date => {
    setnulltitle(true);
    setdirectsave(true);
    setSelectedDate(date);
    console.log(date)
    dateString=JSON.stringify(date);
    console.log(dateString)
    firstTenChars=dateString.substring(1,11);
    console.log(firstTenChars); // Output: "2024-04-02"
    setdateonly(firstTenChars);
    setisadd(true);
  };
  var sd = JSON.stringify(selectedDate);
  firstTenChars=sd.substring(1,11);
  const isFutureDate = date => {
    const today = new Date();
    return date > today;
  };
  const isPastDate = date => {
    const today = new Date();
    return date <= today;
  };
  function cancelClick(){
    setnulltitle(true);
    setTitle('');
    setDescription('');
    settdata([]);
    setifvalid(true)
    setdirectsave(true);
  }


  // const handleKeyDown = e => {
  //   // Allow only numeric keys, backspace, delete, arrow keys, and navigation keys
  //   if (
  //     !(
  //       (e.key <= '0' && e.key >= '9') ||
  //       e.key === 'ArrowLeft' ||
  //       e.key === 'ArrowRight' ||
  //       e.key === 'ArrowUp' ||
  //       e.key === 'ArrowDown' ||
  //       e.key === 'Tab' ||
  //       e.key === 'Home' ||
  //       e.key === 'End' ||
  //       e.key === 'Backspace' ||
  //       e.key === 'Delete' ||
  //       e.key === 'ArrowLeft' ||
  //       e.key === 'ArrowRight' ||
  //       e.key === 'ArrowUp' ||
  //       e.key === 'ArrowDown' ||
  //       e.key === 'Tab' ||
  //       e.key === 'Home' ||
  //       e.key === 'End'
  //     )
  //   ) {
  //     e.preventDefault();
  //   }
  // };
  const handleKeyDown = e => {
    e.preventDefault();
  };

  const handleTitleChange = (e) => {

    setitlelimit(true)
    setdeslimit(true)
    setnulltitle(true);
    setdirectsave(true);
    const value = e.target.value;

    const regex = /^[a-zA-Z_]+$/;
    if (regex.test(value) || value === '') {
      if(value.length<=45)
      {
        setisadd(true);
        setTitle(value);
        setIsValid(true);
      }
      else
      {
        console.log("LIMIT EX")
        setitlelimit(false)
      }
      
    }
  };
  const handleDescriptionChange = (event) => {
    setitlelimit(true)
    setdeslimit(true)
    setnulltitle(true);
    setifvaliddes(true);
    const dd = event.target.value;
    if(dd.length<=100)
    {
      setDescription(event.target.value);
    setisadd(true);setdirectsave(true);
    }
    else
    {
      setdeslimit(false)
        console.log("des limit")
    }
    
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleSubmit = () => {
    setitlelimit(true)
    setdeslimit(true)
    if (/^[a-zA-Z]/.test(title[0]) && /^[a-zA-Z]/.test(title.slice(-1)) && description != "") 
    {
      const data = { title:title,
                     description:description,
                     date: firstTenChars
                    }
      settdata(prevtdata => [...prevtdata, data]);
      setIsValid(true);
      //console.log("Input is valid:", title);
      setifvalid(false);
      setifvaliddes(true);
      setTitle('')
      setDescription('')
      // Here you can proceed with further actions with the valid input
    } 
    else 
    {
      if(title=="")
      {
        setnulltitle(false);
      }
      if(description=="")
      {
        setifvaliddes(false);
      }else{
        setIsValid(false)
      }
      console.log("Input is invalid:", title);
      
    }
  };
  const handleSave = () => {
    if(tdata==""){
      setdirectsave(false);
    }
    else
    {
      console.log("Task Data:",tdata );

      for (let i = 0; i < tdata.length; i++) {
        const obj = tdata[i];
        axios.post('http://localhost:4000/fetch/insert', obj)
        .then(response => {
          console.log("Response:", response.data);
          // Clear input fields after successful submission
          setTitle('');
          setDescription('');
          //setDate('');
          setisadd(false);
          setifvalid(true);
          setReloadKey(prevKey => prevKey + 1);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
        setTitle('');
        setDescription('');
        settdata([]);
        setifvalid(true)
    }
  };
  return (
    <div>
      <h1>TASK MANAGER</h1>
      <table align="center" border='1' className="dbtable">
        <tr>
          <td>
          <label className="thicker">TITLE</label>
          </td>
          <td>
          <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter TITLE"/>
          {!titlelimit && <p style={{ color: 'red' }}>Limit is 45 Characters.</p>}
          </td>
        </tr>
        <tr>
          <td>
          <label className="thicker">DESCRIPTION</label>
          </td>
          <td>
          <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Enter DESCREPTION"/>
          {!deslimit && <p style={{ color: 'red' }}>Limit is 100 Characters.</p>}
          </td>
        </tr>
        <tr>
          <td>
          <label className="thicker">DATE</label>
          </td>
          <td>
          <DatePicker
          type="date"
        selected={selectedDate}
        onChange={handleDateChangeDate}
        maxDate={new Date()} // Set maxDate to today to disable future dates
        filterDate={isPastDate} // Use isPastDate to disable future dates
        onKeyDown={handleKeyDown}
          />
          </td>
        </tr>
        </table>
        <center>
        {!isValid && <p style={{ color: 'red' }}>Title is invalid. First and last letters should be alphabets.</p>}
        {!nulltitle && <p style={{ color: 'red' }}>Title is mendotory Field.</p>}
        {!ifvaliddes && <p style={{ color: 'red' }}>Description cannot be null...!</p>}
        {!directsave && <p style={{ color: 'red' }}>Add data first...!</p>}
        <br></br>
        <button class="btn" onClick={handleSubmit}>ADD</button>
        </center>
        {!isadd && <h1 style={{ color: 'green' }}>Task Added Successfully...!</h1>}
      <div>
        <br></br>
        <div align="center">
          {!ifvalid && 
          <div>
          <table>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>DATE</th>
            <tbody>
          {tdata.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
          </table>
          <br></br>
          </div>
          }
          <button className="btn" onClick={handleSave}>SAVE</button>
            <button className="btn" onClick={cancelClick}>CANCEL</button>
            {/* <Link to="/List"><button className="button11">LIST</button></Link> */}
            <Link to={{ pathname: '/List', state: datatopass }}><button className="btn">LIST</button></Link>
            <Link to={{ pathname: '/List', state: { title, description, firstTenChars } }}></Link>
        </div>
      </div>
    </div>
  );
}
export default Db;