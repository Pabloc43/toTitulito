import React from 'react'
import { useState, useRef } from 'react';
import { useAppContext } from '../AppProvider';
import Cookies from 'universal-cookie';

const API = process.env.REACT_APP_API;
const cookies = new Cookies()

export default function Registro() {
  const {dispatch} = useAppContext();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let excepcion;
  let usuarioExiste;


  const nameInput = useRef(null);

  //Capturar excepciones de registro:
  function registroFail(name, lastName, email, password){
    let condiciones = {
      "Name": name, 
      "Last Name": lastName, 
      "email": email, 
      "Password": password
    };

    for (const clave in condiciones) {

      if (condiciones[clave].length < 4){        
        excepcion = `El campo ${clave} no es correcto`;
        return false;
      }
    }
    excepcion = 'Las contraseñas no coinciden';
    return false;
  }

  function registro(name, lastName, email, password, password2){
    return (name.length >= 4 && lastName.length >= 4 && email.length >= 4 && password2 === password && password >= 4 ? 
      true : registroFail(name, lastName, email, password)) 
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if ( registro(name, lastName, email, password, password2)){
      usuarioExiste = await (await fetch(`${API}/user/${email}`)).json()
      console.log(usuarioExiste);
      if (!usuarioExiste) {
        const res = await fetch(`${API}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastName,
            email,
            password,
          }),
        });
        let sesion = await res.json();
        const login = {
          session: sesion
        };
        dispatch({
          type: 'CHANGE_SESSION',
          value: login
        });
        cookies.set('id', sesion, {path: '/'});
      } else if (usuarioExiste && email !== '') {
        alert('Este mail ya tiene una cuenta asociada');
        nameInput.current.focus();
        setEmail("");
        setPassword("");
        setPassword2("")
      } 
        

    } else {
      nameInput.current.focus();
      alert(excepcion)
      setPassword("");
      setPassword2("")
    }
    
  };

  return (
    <div
    className="card bg-dark text-white"
    style={{ borderRadius: "1rem" }}
  >
        <form onSubmit={handleSubmit} className="card-body px-5 text-center">
          <h2 className="fw-bold text-uppercase">Register</h2>
          <div className="form-outline form-white">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              id='name'
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
            <label className="form-label" htmlFor="name">
                  Name
            </label>
          </div>
          <div className="form-outline form-white">
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="form-control"
              placeholder="Last's Name"
            />
          </div>          
          <div className="form-outline form-white">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="User's Email"
            />
          </div>
          <div className="form-outline form-white">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="User's Password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              className="form-control"
              placeholder="Repeat the Password"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {"Create"}
          </button>
        </form>
      </div>
  )
}
