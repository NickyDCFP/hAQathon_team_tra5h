import { useState, useEffect } from "react";


const Parameters = () => {
    const [renewableOption, setRenewableOption] = useState("solar");
    const [percentOfOperableLand, setPercentOfOperableLand] = useState(50);
    const [data, setdata] = useState({solar: [], wind: [], geothermal: []});

    useEffect(() => {
        console.log("hi")
        fetch("/api/getsortedlists").then((res) =>{
            console.log("hi", res);
        })
            // res.json().then((newData) => {
            //     console.log("hi", newData);
            //     setdata({
            //         solar: newData["solar"],
            //         wind: newData["wind"],
            //         geothermal: newData["geothermal"],
            //     });
            // })
        // )
    }, [renewableOption]);

    return (
        <>
            <div>
                <p>{data.solar}</p>
                <p>{data.wind}</p>
                <p>{data.geothermal}</p>
            </div>
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