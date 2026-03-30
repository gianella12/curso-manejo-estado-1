import React, { useEffect, useState } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
    confirm: false,
    deleted: false,
  });
  const onConfirm = () => {
    setState((prevState) => ({ ...prevState, loading: false, confirm: true }));
  };
  const onError = () => {
    setState((prevState) => ({ ...prevState, error: true, loading: false }));
  };
  const onWrite = (newValue) => {
    setState((prevState) => ({ ...prevState, value: newValue }))
  }
  const onCheck = () => {
    setState((prevState) => ({
              ...prevState,
              loading: !prevState.loading,
              error: false,
            }))
  }
  const onDelete = () => {
      setState((prevState) => ({ ...prevState, deleted: true }))
  }

  const onReset = () => {
      setState((prevState) => ({ ...prevState, confirm: false,deleted: false , value:''}))

  }
  useEffect(() => {
    if (!!state.loading) {
      setState((prevState) => ({ ...prevState, error: false }));
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
        <button
          onClick={() =>
            onCheck()
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
          onDelete()
          }
        >
          Sí, eliminar
        </button>
        <button
          onClick={() =>
          onReset()        
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
           onReset()
          }
        >
          Volver a la lista
        </button>
      </React.Fragment>
    );
  }
}
export { UseState };
