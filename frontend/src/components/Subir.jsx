import React from 'react'
import { useState, useRef } from 'react';


const API = process.env.REACT_APP_API;

export default function Subir() {
  const [imagen, setImagen] = useState('')
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
      const res = await fetch(`${API}/login/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let logueado = await res.json();
      return false;
    }
    catch (e) {
      return true
    }
};
  const handleSubmit = async (e) => {
    if ( registro(name, lastName, email, password, password2) && await nuevoUsuario()){
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
    alert(`Registro de ${name} se realizo correctamente`)
    nameInput.current.focus();
    } else if (!nuevoUsuario()) {
      alert('Este mail ya tiene una cuenta asociada')
    }
    else {
      alert(excepcion)
      e.preventDefault()
    }
    
  };

    const [images, setimages] = useState([]);
  
    const changeInput = (e) => {
      //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
      let indexImg;
  
      //aquí evaluamos si ya hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
      if (images.length > 0) {
        indexImg = images[images.length - 1].index + 1;
      } else {
        indexImg = 0;
      }
  
      let newImgsToState = readmultifiles(e, indexImg);
      let newImgsState = [...images, ...newImgsToState];
      setimages(newImgsState);
  
      console.log(newImgsState);
    };
  
    function readmultifiles(e, indexInicial) {
      const files = e.currentTarget.files;
  
      //el array con las imagenes nuevas
      const arrayImages = [];
  
      Object.keys(files).forEach((i) => {
        const file = files[i];
  
        let url = URL.createObjectURL(file);
  
        //console.log(file);
        arrayImages.push({
          index: indexInicial,
          name: file.name,
          url,
          file
        });
  
        indexInicial++;
      });
  
      //despues de haber concluido el ciclo retornamos las nuevas imagenes
      return arrayImages;
    }
  
    function deleteImg(indice) {
      //console.log("borrar img " + indice);
  
      const newImgs = images.filter(function (element) {
        return element.index !== indice;
      });
      console.log(newImgs);
      setimages(newImgs);
    }

  return (
    <div
    className="card bg-dark text-white"
    style={{ borderRadius: "1rem" }}
  >
        <form onSubmit={handleSubmit} className="card-body px-5 text-center">
          <h2 className="fw-bold text-uppercase">Subir</h2>
          <div className="form-outline form-white">
          <label className="form-label w-100 text-left" htmlFor="name">
                  Nombre del titulo:
          </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              id='name'
              placeholder="Titulo"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-outline form-white my-3">
          <label className="form-label w-100 text-left" htmlFor="duracion">
                  Duracion:
          </label>
            <input
              id='duracion'
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="form-control"
              placeholder="Duracion"
            />
          </div>          
          <div className="form-outline form-white my-3">
            <label className="form-label w-100 text-left" htmlFor="descripcion">
                  Descripcion
            </label>
            <textarea
            id='descripcion'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Descripcion"
            ></textarea>
          </div>
          <div className="form-outline form-white my-3">
            <label className="form-label w-100 text-left" htmlFor="institucion">
                  Institucion
            </label>
            <input
            id='institucion'
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="Institucion"
            />
          </div>
          <div className="form-group my-3">
            <label className="form-label w-100 text-left" htmlFor="anio">
                  Anio de finalizacion
            </label>
            <input
              type="date"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              className="form-control"
              placeholder="Año"
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              name='carton'
              onChange={changeInput}
              className="form-control"
              placeholder="Año"
            />
          </div>
          <div className="form-group">
            <div className=' row'>
            {images.map((imagen) => (
          <div className="col square" key={imagen.index}>
            <div className="content_img w-100 ">
              <button
                className="position-absolute btn btn-danger"
                onClick={deleteImg.bind(this, imagen.index)}
              >
                x
              </button>
              <img
              
                alt="algo"
                src={imagen.url}
                data-toggle="modal"
                data-target="#ModalPreViewImg"
                className="img-responsive w-100"
              ></img>
            </div>
          </div>
        ))}
            </div>
          </div>
          <button className="btn btn-primary btn-block">
            {"Create"}
          </button>
        </form>
      </div>
  )
}
