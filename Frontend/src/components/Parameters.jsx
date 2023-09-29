import { useState, useEffect } from "react";

/*
    This component enables the users to adjust the amount and type of data they will be viewing.
    
    Parameters:
        setRelevantData - Setter for the useState that will be storing the filtered data. 
            RelevantData should be in the following format:
                A list of city objects that have a name, x, and y coordinate. x -> latitude, y -> longitude
*/
const Parameters = ({setRelevantData, setNotableLocations}) => {
    // const [renewableOption, setRenewableOption] = useState("solar");
    const [numToMake, setNumToMake] = useState(5);
    const [data, setdata] = useState({'Cities': [], 'Sorted Cliques': [{}]});

    const colors = [
        "#000000", "#1d1d1d", "#343434", "#4c4c4c", "#666666", "#828282", "#9e9e9e", "#bbbbbb", "#d9d9d9", "#f8f8f8"
    ];
    
    // Fetches the data from the backend and stores it in the data state whenever the renewable option changes.
    useEffect(() => {
        fetch("/api/data").then((res) =>{
            res.json().then((newData) => {
                setdata({
                    "Cities": newData["Cities"],
                    "Sorted Cliques": newData["Sorted Cliques"]
                });
            })
        })
    }, []);

    // Whenever any of the options changes, relevant data is updated.
    useEffect(() => {
        // let newD = makeSortedArray(data["Cities"], data["Sorted Cliques"])
        if(data["Cities"].length !== 0) {
            let rel = [];
            let notable = [];
            for(let i = 0; i < numToMake; i++) {
                rel.push(getRelevantInfo(data["Sorted Cliques"][i], data["Cities"], notable));
                rel[rel.length - 1]["color"] = colors[i];
            }
            setRelevantData(rel);
            setNotableLocations(notable);
        }
    }, [numToMake, data]);

    /*
        Takes a clique and finds the relevant information to be sent to create circle markers.
    */
    function getRelevantInfo(clique, cities, notable) {
        let x = 0;
        let y = 0;
        let tot = 0;
        // Get average location
        for(let i = 0; i < clique["Cities"].length; i++) {
            let city = findCity(clique["Cities"][i], cities);
            if(city !== undefined) {
                if(city["Wind Cubed Per Capita"] > 2.5) {
                    notable.push(city);
                }
                x += city["Latitude"];
                y += city["Longitude"];
                tot++;
            }
        }
        x /= tot;
        y /= tot;
        let radius = 0;
        // Find max distance from center
        for(let i = 0; i < clique["Cities"].length; i++) {
            let city = findCity(clique["Cities"][i], cities)
            if(city !== undefined) {
                let dist = Math.sqrt(Math.pow(city["Latitude"] - x, 2) + Math.pow(city["Longitude"] - y, 2));
                if(dist > radius) {
                    radius = dist;
                }
            }
        }
        
        return {
            "x": x,
            "y": y,
            "radius": radius,
            "cities": clique["Cities"],
            "wind": clique["Mean Wind Cubed Per Capita"],
        }
    }

    // Finds a city with binary search and returns its relevant information
    function findCity(toFind, cities) {
        let low = 0;
        let high = cities.length - 1;
        let mid = Math.floor((low + high) / 2);
        while(low <= high) {
            if(cities[mid]["City"] === toFind) {
                return cities[mid]
            } else if(cities[mid]["City"] < toFind) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
            mid = Math.floor((low + high) / 2);
        }
}

    return (
        <>
            <h1>Parameters:</h1>
            <form action="POST">
                <div className="slidecontainer">
                    <h2>Percentage of Operatable Land: {numToMake * 10}%</h2>
                    <input type="range" min="1" max="10" className="slider" id="myRange" value={numToMake} 
                    onChange={e => setNumToMake(e.target.value)}/>
                </div>
            </form>
        </>
    );
}

export default Parameters;