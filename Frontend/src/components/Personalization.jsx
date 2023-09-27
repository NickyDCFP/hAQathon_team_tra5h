import { useState, useEffect } from "react";


const Personalization = () => {

    return (
        <>
            <h1>Personalization</h1>
            <form action="POST">
                <h2>Renewable Option:</h2>
                <select name="renewable-option">
                    <option value="solar">Solar</option>
                    <option value="wind">Wind</option>
                    <option value="geothermal">Geothermal</option>
                </select>
                <div className="slidecontainer">
                    <h2>Percent of Operable Land:</h2>
                    <input type="range" min="1" max="100" className="slider" id="myRange" />
                </div>
            </form>

        </>
    );
}

export default Personalization;