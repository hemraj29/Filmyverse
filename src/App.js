
import CaedStyle from './CaedStyle';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddMovie from './components/AddMovie';
import Detail from './components/Detail';
import { createContext, useState ,useEffect } from 'react';
import  Login from './components/Login';
import SIgnUp from './components/SIgnUp';





// for authentication pupose
 const Appstate = createContext();

function App() {
  const [login,setLogin] = useState(false);
  const [userName , setUserName] = useState("");


  return (
    <Appstate.Provider value={{login, userName , setLogin , setUserName}} >
    <div className="App relative ">
    <Header/>
    <Routes>  
      <Route path='/' element={<CaedStyle/>}></Route>   
      <Route path='/addmovie' element={<AddMovie/>}></Route>
      <Route path='/detail/:id' element={<Detail/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SIgnUp/>}></Route>
    </Routes>

    </div>
    </Appstate.Provider>
  )
};
  export default App
  export {Appstate}

