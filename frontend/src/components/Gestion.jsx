import React from 'react'
import {Link} from 'react-router-dom'

export default function Gestion() {
  return (
    <div>
        <Link to="/subir" className='btn btn-outline-warning m-2 text-dark'>Subir</Link>
        <button className='btn btn-outline-warning m-2 text-dark'>Ver</button>
        <button className='btn btn-outline-warning m-2 text-dark'>Administrar</button>
    </div>
  )
}