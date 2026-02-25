import { useEffect, useState } from "react";

function UseState({ name }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Empezando el efecto");
       if (loading) {
            setTimeout(() => {
                console.log("Haciendo la validación");
                setLoading(false);
                console.log("Terminando la validación");
            }, 3000);
        } 
        console.log("Terminando el efecto");
    }, [loading])
    return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, escribe el codigo de seguridad.</p>

            {error && 
            (<p>Error: el código es incorrecto</p>)}

            {loading && 
            (<p>cargando...</p>)}

            <input placeholder="Código de seguridad" />
            <button onClick={() => setLoading(!loading)}>
                Comprobar
            </button>
        </div>
    );
}
export { UseState };