import React, { useReducer } from 'react';
import { useContext } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const AppContext = React.createContext();
const initialState = {
    session: cookies?.get('id'),
    productos: [],
    presupuesto: 200
};
const reducer = (state, action) => {
    console.log(action);
    console.log(state)
    switch (action.type) {
        case 'CHANGE_SESSION_Falso':{
            return {
                state,
                productos: [...state.productos, action.value],
                presupuesto: state.presupuesto
            }
        };
        case 'CHANGE_SESSION':{
            return {
                state,
                session: action.value
            }
        }
    }
    return state;
};

const useAppContext = () => {
    return useContext(AppContext)
}

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={{
            presupuesto: state.presupuesto, 
            productos: state.productos,
            session: state.session, 
            dispatch
            }}>
            {children}
        </AppContext.Provider>
    )
};

export {
    AppProvider,
    useAppContext
}