import { useState, useEffect } from "react";

/*
    This component enables the users to adjust the amount and type of data they will be viewing.
    
    Parameters:
        setRelevantData - Setter for the useState that will be storing the filtered data. 
            RelevantData should be in the following format:
                A list of city objects that have a name, x, and y coordinate. x -> latitude, y -> longitude
*/
const Parameters = ({setRelevantData}) => {
    const [renewableOption, setRenewableOption] = useState("solar");
    const [percentOfOperableLand, setPercentOfOperableLand] = useState(50);
    const [data, setdata] = useState({solar: [], wind: [], geothermal: []});
    
    // Fetches the data from the backend and stores it in the data state whenever the renewable option changes.
    useEffect(() => {
        fetch("/api/getsortedlists").then((res) =>{
            res.json().then((newData) => {
                setdata({
                    solar: newData["solar"],
                    wind: newData["wind"],
                    geothermal: newData["geothermal"],
                });
            })
        })
    }, [renewableOption]);

    // Whenever any of the options changes, relevant data is updated.
    useEffect(() => {
        let newD = data[renewableOption].map(data=> ({city: "", x: data[0], y: data[1]}));
        setRelevantData(getPercent(newD, percentOfOperableLand));
    }, [percentOfOperableLand, renewableOption, data]);

    /*
        Returns the first percent of an array.
        Parameters:
            array - The array to be sliced.
            percent - The percent of the array to be returned.
    */
    function getPercent(array, percent) {
        return array.slice(0, Math.ceil(array.length * percent / 100));
    }

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