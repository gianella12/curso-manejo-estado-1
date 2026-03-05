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
    // const [value, setValue] = useState("");
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!!state.loading) {
            setState(prevState => ({ ...prevState, error: false }));
            setTimeout(() => {

                if (state.value !== SECURITY_CODE) {
                    setState(prevState => ({ ...prevState, error: true, loading: false }));
                } else {
                    setState(prevState => ({ ...prevState, loading: false, confirm: true }));
                }
            }, 3000);
        }
    }, [state.loading, state.value]);

    if (!state.deleted && !state.confirm) {
        return (
            <div>
                <h2>Eliminar {name}</h2>

                <p>Por favor, escribe el codigo de seguridad.</p>

                {(state.error && !state.loading) &&
                    (<p>Error: el código es incorrecto</p>)}

                {state.loading &&
                    (<p>cargando...</p>)}

                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(e) => setState(prevState => ({ ...prevState, value: e.target.value }))}
                />
                <button onClick={() => setState(prevState => ({ ...prevState, loading: !prevState.loading, error: false }))}>
                    Comprobar
                </button>
            </div>
        );
    } else if (!!state.confirm && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Deseas eliminar?</p>
                <button onClick={() => setState(prevState => ({ ...prevState, deleted: true }))}>
                    Sí, eliminar
                </button>
                <button onClick={() => setState(prevState => ({ ...prevState, confirm: false }))}>
                    No, volver
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={() => setState({
                    value: "",
                    error: false,
                    loading: false,
                    confirm: false,
                    deleted: false
                })}>
                    Volver a la lista
                </button>
            </React.Fragment>
        );
    }

}
export { UseState };
