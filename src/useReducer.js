import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.CONFIRM });
  };
  const onError = () => {
    dispatch({ type: actionTypes.ERROR });
  };
  const onWrite = (newValue) => {
    dispatch({ type: actionTypes.WRITE, payload: newValue });
  };
  const onCheck = () => {
    dispatch({ type: actionTypes.CHECK });
  };
  const onDelete = () => {
    dispatch({ type: actionTypes.DELETE });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.RESET });
  };

  useEffect(() => {
    if (!!state.loading) {
      dispatch({ type: actionTypes.LOADING });
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
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
            onWrite(e.target.value)
          }
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirm && !state.deleted) {
    return (
      <React.Fragment>
        <p>¿Deseas eliminar?</p>
        <button onClick={onDelete}>Sí, eliminar</button>
        <button onClick={onReset}>No, volver</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>Volver a la lista</button>
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

const actionTypes = {
  CONFIRM: "CONFIRM",
  ERROR: "ERROR",
  CHECK: "CHECK",
  WRITE: "WRITE",
  DELETE: "DELETE",
  RESET: "RESET",
  LOADING: "LOADING",
};

const reducerObject = (state, payload) => ({
  [actionTypes.ERROR]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.CHECK]: {
    ...state,
    loading: true,
  },
  [actionTypes.CONFIRM]: {
    ...state,
    loading: false,
    confirm: true,
  },
  [actionTypes.WRITE]: {
    ...state,
    value: payload,
  },
  [actionTypes.DELETE]: {
    ...state,
    deleted: true,
  },
  [actionTypes.RESET]: {
    ...state,
    confirm: false,
    deleted: false,
    value: "",
  },
  [actionTypes.LOADING]: {
    ...state,
    error: false,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};
export { UseReducer };
