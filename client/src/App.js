import "bootstrap/dist/css/bootstrap.min.css"
import './static/css/App.css';

import { Routes, Route } from 'react-router-dom';


import Login from "./views/Login"
import Dashboard from "./views/Dashboard"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  <Route path="/" />
  return(
    code ? <Dashboard code={code} /> : <Login />)
}

export default App
