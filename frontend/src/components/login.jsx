import React from 'react';
import { useState, useRef} from 'react';


const API = process.env.REACT_APP_API;

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInput = useRef(null);


  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await fetch(`${API}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        let logueado = await res.json();
        sessionStorage.setItem('login', logueado.user)
        window.location.href = '/gestion'
      }
      catch (e) {
        alert('Las credenciales no son validas');
        console.error(e)
      }
  };

  return (
    <div
    className="card bg-dark text-white"
    style={{ borderRadius: "1rem" }}
  >
        <form onSubmit={handleSubmit} className="card-body px-5 text-center">
          <h2 className="fw-bold text-uppercase">Login</h2>
       
          <div className="form-outline form-white">
            <input
              type="email"
              id='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={emailInput}
              className="form-control"
              placeholder="User's Email"
            />
            <label htmlFor='email'>Email</label>
          </div>
          <div className="form-outline form-white">
            <input
              type="password"
              id='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="User's Password"
            />
            <label htmlFor='password'>Password</label>
          </div>
            <button type='submit' className="btn btn-primary btn-block">
              Login
            </button>
        </form>
      </div>
  )
}
