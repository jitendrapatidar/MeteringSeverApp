import React from 'react';
import "./App.css";
import NavBar from "./components/Navbar";
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screen/Home'
import About from './components/screen/About'
import Meter from './components/screen/Meter'
const Routing=()=>{
  const history =useHistory()
  return (
    <Switch>
       <Route exact path="/"><Home/></Route>
       <Route path="/Meter"><Meter/></Route>
       <Route path="/About"><About/></Route>
     </Switch>
   )
}


function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routing></Routing>
   </BrowserRouter>
  );
}

export default App;
