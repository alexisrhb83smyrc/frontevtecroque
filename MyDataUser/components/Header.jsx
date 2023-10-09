import '../style-sheets/Header.css'
import { useNavigate } from "react-router-dom";
import React from 'react';

function Header() {

    const navigate = useNavigate();

    const regresarMenu = () => {
        navigate("/");
    }

    return (
        <header>
            <div className="h-first-container">
                <p className='f-c-1_1'>Welcome to</p>
                <p className='f-c-1_2'>My Data User</p>
                <p className='f-c-1_3'>Registration</p>
            </div>
            <div className="itemsp-regresarmenu">
                <button className="botton-rm" onClick={regresarMenu}>REGRESAR AL MENÚ</button>
            </div>
        </header>
    );
}

export default Header;