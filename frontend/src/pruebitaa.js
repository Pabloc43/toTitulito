import React, { useState } from 'react';
import { useAppContext } from './AppProvider';

export default function Pruebita() {
    const {presupuesto, productos, dispatch} = useAppContext();
    const [precio, setPrecio] = useState(presupuesto)


    const handlerSubmit = (event) => {
      event.preventDefault();
      const presu = {
        presupuesto: parseInt(precio)
      };
      dispatch({
        type: 'CHANGE_SESSION_Falso',
        value: presu
      })
    }
    
  return (
    <div>
      <h1>{presupuesto}</h1>
      {productos.map((x, index) => 
        
        <p key={index}>{x.presupuesto}
                {console.log(productos)}
</p>
      )}
      <form onSubmit={handlerSubmit}>
        <input type='number' onChange={(event) => setPrecio(event.target.value)}></input>
        <input type='submit'></input>
      </form>
    </div>
  )
}
