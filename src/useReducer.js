import React, { useEffect, useReducer} from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!!state.loading) {
      dispatch({ type: 'LOADING' });
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          dispatch({ type: 'ERROR' });
        } else {
          dispatch({ type: 'CONFIRM' });
        }
      }, 3000);
    }
  }, [state.loading, state.value]);

  if (!state.deleted && !state.confirm) {
    return (
      <div>
        <h2>Eliminar {name}</h2>

        <p>Por favor, escribe el codigo de seguridad.</p>

        {state.error && !state.loading && <p>Error: el código es incorrecto</p>}

        {state.loading && <p>cargando...</p>}

        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(e) =>
            dispatch({ type: 'WRITE', payload: e.target.value})
            //onWrite(e.target.value)
          }
        />
        <button
          onClick={() =>
              dispatch({ type: 'CHECK'})
          }
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirm && !state.deleted) {
    return (
      <React.Fragment>
        <p>¿Deseas eliminar?</p>
        <button
          onClick={() =>
            dispatch({ type: 'DELETE'})
          }
        >
          Sí, eliminar
        </button>
        <button
          onClick={() =>
            dispatch({ type: 'RESET'})        
          }
        >
          No, volver
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button
          onClick={() =>
            dispatch({ type: 'RESET'})       
          }
        >
          Volver a la lista
        </button>
      </React.Fragment>
    );
  }
}



const initialState = {
  value: "",
  error: false,
  loading: false,
  confirm: false,
  deleted: false,
};

const reducerObject = (state, payload) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
 'CHECK': {
    ...state,
    loading: true,
  },
  'CONFIRM': {
    ...state, loading: false, confirm: true 
  },
  'WRITE': {
     ...state, value: payload
  },
  'DELETE': {
    ...state, deleted: true 
  },
  'RESET': {
     ...state, confirm: false, deleted: false, value: ''
  },
  'LOADING': {
    ...state, error: false
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};
export { UseReducer };