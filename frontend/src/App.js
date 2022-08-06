import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Users } from "./components/Users";
import Inicio from "./components/Pres";
import Gestion from "./components/Gestion";
import Subir from "./components/Subir";


function App() {
  const [sesion, setSesion] = useState(sessionStorage.getItem('login') !== null)
  return (
    <Router>
      <Navbar sesion={sesion}/>
      <div className="container p-4">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/coso" component={Users} />
          {sesion ? 
          <>
            <Route path="/gestion" component={Gestion} />
            <Route path="/subir" component={Subir}></Route>
          </>: 
            <Route path="/">
              <Inicio></Inicio>
            </Route>
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;
