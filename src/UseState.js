import { useEffect, useState } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
    const [state, setState]= useState({
        value: "",
        error: false,
        loading: false,
    });
    // const [value, setValue] = useState("");
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!!state.loading) {
            setState(prevState => ({ ...prevState, error: false }));
            setTimeout(() => {
                
                if (state.value !== SECURITY_CODE) {
                    setState(prevState => ({ ...prevState, error: true }));
                }
                setState(prevState => ({ ...prevState, loading: false }));

            }, 3000);
        }
    }, [state.loading, state.value]);

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
            <button onClick={() => setState(prevState => ({ ...prevState, loading: !prevState.loading }))}>
                Comprobar
            </button>
        </div>
    );
}
export { UseState };
