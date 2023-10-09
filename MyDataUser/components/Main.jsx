import React, { useEffect, useState } from "react";
import '../style-sheets/Main.css'

function Main() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [direccion, setDireccion] = useState("");
    const [fecha, setFecha] = useState("");
    const [validFecha, setValidFecha] = useState(true);

    useEffect(() => {
        const usuariosIniciales = [
            {
                id: 1,
                user: "Mauricio Castillo",
                address: "Fraccionamiento Manzanas",
                birth: "01/01/1990"
            },
            {
                id: 2,
                user: "Adhara Castillo",
                address: "Fraccionamiento Duraznos",
                birth: "02/02/1995"
            },
        ];

        setUsuarios(usuariosIniciales);
    }, []);

    const handleFechaChange = (event) => {
        const inputFecha = event.target.value;

        // Expresión regular para validar el formato "dd/mm/yyyy"
        const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (regex.test(inputFecha)) {
            setFecha(inputFecha);
            setValidFecha(true);
        } else {
            setFecha(inputFecha);
            setValidFecha(false);
        }
    };

    const calcularEdad = (fechaNacimiento) => {
        const fechaNac = new Date(fechaNacimiento);
        const fechaActual = new Date();
        const edad = fechaActual.getFullYear() - fechaNac.getFullYear();

        // Verificar si ya pasó el cumpleaños de la persona este año
        if (
            fechaNac.getMonth() > fechaActual.getMonth() ||
            (fechaNac.getMonth() === fechaActual.getMonth() && fechaNac.getDate() > fechaActual.getDate())
        ) {
            return edad - 1;
        }
        return edad;
    };

    const handleSubmit = () => {
        // Verificar que los campos estén llenos antes de agregarlos a la lista
        if (nombreCompleto && direccion && validFecha) {
            const nuevoUsuario = {
                id: usuarios.length + 1,
                user: nombreCompleto,
                address: direccion,
                birth: fecha
            };

            // Agregar el nuevo usuario a la lista de usuarios
            setUsuarios([...usuarios, nuevoUsuario]);

            // Borrar los valores de los campos de entrada
            setNombreCompleto("");
            setDireccion("");
            setFecha("");
            setValidFecha(true);
        }
    };

    return (  
        <div className="m-first-container">
            <div className="m-add-data">
                <p className="m-1_1">Add personal data</p>
                <input
                    className="mi m-1_2"
                    placeholder="Nombre Completo"
                    value={nombreCompleto}
                    onChange={(e) => setNombreCompleto(e.target.value)}
                ></input>
                <input
                    className="mi m-1_3"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                ></input>
                <input
                    className={`mi m-1_2 ${validFecha ? "" : "invalid"}`}
                    placeholder="Fecha de nacimiento (dd/mm/yyyy)"
                    value={fecha}
                    onChange={handleFechaChange}
                ></input>
                {validFecha ? null : (
                    <p className="error-message">Formato incorrecto. Usa "dd/mm/yyyy".</p>
                )}
                <button onClick={handleSubmit}>Enviar</button>
            </div>

            <div>USUARIOS REGISTROS ACTUALMENTE</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className='m th-1'>NOMBRE COMPLETO</th>
                            <th className='m th-2'>DIRECCIÓN</th>
                            <th className='m th-3'>FECHA DE NACIMIENTO</th>
                            <th className='m th-4'>EDAD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios && 
                        usuarios.map((usuario) => (
                            <tr key={usuario.id} className="m-tboby">
                                <td className=''>{usuario.user.toUpperCase()}</td>
                                <td className=''>{usuario.address.toUpperCase()}</td>
                                <td className=''>{usuario.birth.toUpperCase()}</td>
                                <td className=''>{calcularEdad(usuario.birth)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Main;
