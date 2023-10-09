import React, { useEffect, useState } from "react";
import '../style-sheets/Main.css'

function Main() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [direccion, setDireccion] = useState("");
    const [fecha, setFecha] = useState("");
    const [validFecha, setValidFecha] = useState(true);
    const [editId, setEditId] = useState(null);

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

        if (
            fechaNac.getMonth() > fechaActual.getMonth() ||
            (fechaNac.getMonth() === fechaActual.getMonth() && fechaNac.getDate() > fechaActual.getDate())
        ) {
            return edad - 1;
        }
        return edad;
    };

    const handleSubmit = () => {
        if (nombreCompleto && direccion && validFecha) {
            if (editId !== null) {
                const usuariosActualizados = usuarios.map((usuario) =>
                    usuario.id === editId
                        ? { ...usuario, user: nombreCompleto, address: direccion, birth: fecha }
                        : usuario
                );
                setUsuarios(usuariosActualizados);
                setEditId(null);
            } else {
                const nuevoUsuario = {
                    id: usuarios.length + 1,
                    user: nombreCompleto,
                    address: direccion,
                    birth: fecha
                };
                setUsuarios([...usuarios, nuevoUsuario]);
            }

            setNombreCompleto("");
            setDireccion("");
            setFecha("");
            setValidFecha(true);
        }
    };

    const handleEdit = (id) => {
        const usuarioAEditar = usuarios.find((usuario) => usuario.id === id);
        if (usuarioAEditar) {
            setEditId(id);
            setNombreCompleto(usuarioAEditar.user);
            setDireccion(usuarioAEditar.address);
            setFecha(usuarioAEditar.birth);
            setValidFecha(true);
        }
    };

    const handleDelete = (id) => {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(usuariosFiltrados);
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
                    className="mi m-1_2"
                    placeholder="Fecha de nacimiento (dd/mm/yyyy)"
                    value={fecha}
                    onChange={handleFechaChange}
                ></input>
                {validFecha ? null : (
                    <p className="error-message">Formato incorrecto. Usa "dd/mm/yyyy".</p>
                )}
                <button className="m-button" onClick={handleSubmit}>
                    {editId !== null ? "Guardar Cambios" : "Enviar"}
                </button>
            </div>
            <div className="m-second-part">
                <div>
                <div className="m-data">USUARIOS REGISTROS ACTUALMENTE</div>
                    <table>
                        <thead>
                            <tr>
                                <th className='m-th'>NOMBRE COMPLETO</th>
                                <th className='m-th'>DIRECCIÓN</th>
                                <th className='m-th'>FECHA DE NACIMIENTO</th>
                                <th className='m-th'>EDAD</th>
                                <th className='m-th'>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios &&
                                usuarios.map((usuario) => (
                                    <tr key={usuario.id} className="m-tboby">
                                        <td className='m-td'>{usuario.user.toUpperCase()}</td>
                                        <td className='m-td'>{usuario.address.toUpperCase()}</td>
                                        <td className='m-td t-birth'>{usuario.birth.toUpperCase()}</td>
                                        <td className='m-td t-age'>{calcularEdad(usuario.birth)}</td>
                                        <td className='m-td'>
                                            <button className='m-td-button' onClick={() => handleEdit(usuario.id)}>Editar</button>
                                            <button className='m-td-button' onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Main;
