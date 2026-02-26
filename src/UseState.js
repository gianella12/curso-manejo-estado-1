import { useEffect, useState } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(value)
    useEffect(() => {
        console.log("Empezando el efecto");
        if (!!loading) {
            setError(false);
            setTimeout(() => {
                console.log("Haciendo la validación");
                if (value !== SECURITY_CODE) {
                    setError(true);
                }
                setLoading(false);


                console.log("Terminando la validación");
            }, 3000);
        }
        console.log("Terminando el efecto");
    }, [loading, value]);

    return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, escribe el codigo de seguridad.</p>

            {(error && !loading) &&
                (<p>Error: el código es incorrecto</p>)}

            {loading &&
                (<p>cargando...</p>)}

            <input
                placeholder="Código de seguridad"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={() => setLoading(!loading)}>
                Comprobar
            </button>
        </div>
    );
}
export { UseState };
