import React from 'react'
import { useState, useRef } from 'react';


const API = process.env.REACT_APP_API;

export default function Registro() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let excepcion;


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
        return
      }
    }
    excepcion = 'Las contraseñas no coinciden'
  }

  function registro(name, lastName, email, password, password2){
    return (name.length >= 4 && lastName.length >= 4 && email.length >= 4 && password2 === password ? 
      true : registroFail(name, lastName, email, password)) 
  }


  const nuevoUsuario = async () => {
    try{
      const res = await fetch(`${API}/usuario/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let logueado = await res.json();
      console.log(logueado)
      return !logueado
    }
    catch {
      return true
    }
};
  const handleSubmit = async (e) => {
    if ( registro(name, lastName, email, password, password2) && nuevoUsuario()){
      e.preventDefault();
      const res = await fetch(`${API}/usuarios`, {
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
      await res.json();

    setName("");
    setEmail("");
    setPassword("");
    setLastName("")
    sessionStorage.setItem('login', email);
    window.location.href = '/gestion'
    nameInput.current.focus();
    } else if (nuevoUsuario()) {
      alert('Este mail ya tiene una cuenta asociada')
    }
    else {
      alert(excepcion)
      e.preventDefault()
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
