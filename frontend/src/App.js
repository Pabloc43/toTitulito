import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Users } from "./components/Users";
import Inicio from "./components/Pres";
import Gestion from "./components/Gestion";
import Subir from "./components/Subir";
import { useAppContext } from "./AppProvider";
import Cookies from "universal-cookie";

const cookies = new Cookies();



function App() {
  const {session} = useAppContext();
  const [sesion, setSesion] = useState(session);
  console.log('id:   ' + cookies.get('id'))

  useEffect(()=>{
    setSesion(session);
  }, [session])

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
            <>
              <Route path="/">
                <Inicio></Inicio>
              </Route>
              <Redirect to={'/'}>
              </Redirect>
            </>
            }
          </Switch>
        </div>
      </Router>
  );
}

export default App;
