import React from "react";
import '../style-sheets/Main.css'

function Main() {
    return (  
        <div className="m-first-container">
            <div className="m-add-data">
                <p className="m-1_1">Add personal data</p>
                <input
                    className="mi m-1_2"
                    placeholder="Nombre Completo"
                ></input>
                <input
                    className="mi m-1_3"
                    placeholder="Dirección"
                ></input>
                <input
                    className="mi m-1_4"
                    placeholder="Fecha de nacimiento"
                ></input>
            </div>


        </div>
    );
}

export default Main;