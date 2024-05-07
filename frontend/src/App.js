import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Db from './components/Db';
import AData from './components/AData';
import Pending from './components/Pending';
import Comp from './components/Comp';
import List from './components/List';
import Tempdata from './components/Tempdata';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Db' element={<Db/>}></Route>
        <Route path='/AData' element={<AData/>}></Route>
        <Route path='/Pending' element={<Pending/>}></Route>
        <Route path='/Comp' element={<Comp/>}></Route>
        <Route path='/List' element={<List/>}></Route>
        <Route path='/Tempdata' element={<Tempdata/>}></Route>
   
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
