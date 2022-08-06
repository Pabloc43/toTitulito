import React from 'react'
import { useState } from 'react'
import './inicio.css'
import Presentacion from "../media/presentacion.mp4"
import Login from './login'
import Register from './Registro'

export default function Inicio() {
    const [button, setButton] = useState(true)
    return (
        <div className="container">
            <div className='row'>
                <div className="bord col-12 col-lg-6 body m-2 d-flex align-items-center justify-content-center">
                    <div className="box-1">
                        <video width="" height="" controls loop>
                            <source src={Presentacion} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="col-12 col-lg-5 body flex-column  d-flex justify-content-around m-2 bg-danger">
                    <div className="box-1 mt-md-0 mt-5 justify-content-center d-flex">
                        <button onClick={()=> setButton(true)}>Login</button>
                        <button onClick={()=> setButton(false)}>Registro</button>
                    </div>
                    <div className="box-1 mt-md-0 mt-5 ">
                    {button ? <Login></Login> : <Register></Register>}
                    </div>
                </div>
            </div>
        </div>


    )
}
