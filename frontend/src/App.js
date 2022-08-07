import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Users } from "./components/Users";
import Inicio from "./components/Pres";
import Gestion from "./components/Gestion";
import Subir from "./components/Subir";
import { useAppContext } from "./AppProvider";


function App() {
  const {session} = useAppContext();
  console.log(session.session)
  const [sesion, setSesion] = useState(session.session !== undefined);
  console.log(sesion)
  useEffect(()=>{
    console.log(session.session)
    setSesion(session.session !== undefined);
    console.log(sesion)
  }, [session.session])

  return (
    
      <Router>
        <Navbar/>
        <div className="container p-4">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/coso" component={Users} />
            {sesion ? 
            <>
              <Route path="/gestion" component={Gestion} />
              <Route path="/subir" component={Subir}></Route>
              <Redirect to={'/gestion'}>
              </Redirect>
            </> : 
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
