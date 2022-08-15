import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useAppContext } from '../AppProvider';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export const Navbar = () => {
  const {session, dispatch} = useAppContext()
  const [sesion, setSesion] = useState(session);
  useEffect(() => {
    setSesion(session);
  },[session])

  function handlerLogin(){
    const login = {
      session: ''
    };
    dispatch({
      type: 'CHANGE_SESSION',
      value: login.session
    });
    setSesion('')
    cookies.remove('id', {path: '/'});
  }
  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={ sesion ? "/gestion" : "/"}>toTitulito</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="d-flex justify-content-between collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/about">Acerca del sitio</Link>
            </li>
          </ul>
          { sesion &&
          <ul className='navbar-nav'>
            <li>
              <button className='btn rounded btn-outline-warning text-dark' onClick={handlerLogin}>Logout</button>
            </li>
          </ul>
          }
        </div>
      </nav>
)}