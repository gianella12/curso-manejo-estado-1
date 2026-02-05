import React from 'react';
class ClassState extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        }
    }
    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el codigo de seguridad.</p>
                {this.state.error && (<p>Error: el código es incorrecto</p>)}

                <input placeholder="Código de seguridad" />
                <button>Comprobar</button>
            </div>
        );
    }
}
export { ClassState };