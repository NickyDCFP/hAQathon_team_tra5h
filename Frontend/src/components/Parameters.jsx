import { useState, useEffect } from "react";


const Parameters = () => {
    const [renewableOption, setRenewableOption] = useState("solar");
    const [percentOfOperableLand, setPercentOfOperableLand] = useState(50);

    useEffect(() => {
        console.log(renewableOption, percentOfOperableLand)
    }, [renewableOption, percentOfOperableLand]);

    return (
        <>
            <h1>Parameters:</h1>
            <form action="POST">
                <h2>Renewable Option:</h2>
                <select name="renewable-option" value={renewableOption} onChange={e => setRenewableOption(e.target.value)}>
                    <option value="solar">Solar</option>
                    <option value="wind">Wind</option>
                    <option value="geothermal">Geothermal</option>
                </select>
                <div className="slidecontainer">
                    <h2>Percent of Operable Land: {percentOfOperableLand}%</h2>
                    <input type="range" min="1" max="100" className="slider" id="myRange" value={percentOfOperableLand} 
                    onChange={e => setPercentOfOperableLand(e.target.value)}/>
                </div>
            </form>
        </>
    );
}

export default Parameters;