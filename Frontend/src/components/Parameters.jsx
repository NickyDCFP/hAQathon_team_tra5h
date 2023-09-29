import { useState, useEffect } from "react";

/*
    This component enables the users to adjust the amount and type of data they will be viewing.
    
    Parameters:
        setRelevantData - Setter for the useState that will be storing the filtered data. 
            RelevantData should be in the following format:
                A list of city objects that have a name, x, and y coordinate. x -> latitude, y -> longitude
*/
const Parameters = ({setRelevantData}) => {
    // const [renewableOption, setRenewableOption] = useState("solar");
    const [percentOfOperableLand, setPercentOfOperableLand] = useState(50);
    const [data, setdata] = useState({'Cities': [], 'Sorted Cliques': [{"Cities": ["LA"]}]});
    
    // Fetches the data from the backend and stores it in the data state whenever the renewable option changes.
    useEffect(() => {
        fetch("/api/data").then((res) =>{
            res.json().then((newData) => {
                console.log(newData)
                setdata({
                    "Cities": newData["Cities"],
                    "Sorted Cliques": newData["Sorted Cliques"]
                });
            })
        })
    }, []);

    // Whenever any of the options changes, relevant data is updated.
    useEffect(() => {
        let sArr = makeSortedArray(data["Cities"], data["Sorted Cliques"])
        let newD = getPercent(sArr, percentOfOperableLand);
        let rel = [];
        for(let i = 0; i < newD.length; i++) {
            // Find the city in a binary search
            let low = 0;
            let high = data["Cities"].length - 1;
            let mid = Math.floor((low + high) / 2);
            while(low <= high) {
                if(data["Cities"][mid]["City"] === newD[i]["City"]) {
                    rel.push(data["Cities"][mid]);
                    break;
                } else if(data["Cities"][mid]["City"] < newD[i]["City"]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
                mid = Math.floor((low + high) / 2);
            }
        }
        console.log(rel)
        setRelevantData(newD);
    }, [percentOfOperableLand, data]);

    /*
        Returns the first percent of an array.
        Parameters:
            array - The array to be sliced.
            percent - The percent of the array to be returned.
    */
    // function getPercent(cliques, percent) {
    //     for(let i = 0; i < percent; i++) {
    //         if(i > cliques.length) {
    //             break;
    //         }
    //         for(let j = 0; j < cliques[i]["Cities"].length; j++) {
    //             console.log(cliques[i]["Cities"][j])
    //         }
    //     }
    // }

    function getPercent(array, percent) {
        return array.slice(0, Math.ceil(array.length * percent / 100));
    }

    function makeSortedArray(cities, cliques) {
        let sortedArray = [];
        for(let i = 0; i < cliques.length; i++) {
            for(let j = 0; j < cliques[i]["Cities"].length; j++) {
                for(let k = 0; k < cities.length; k++) {
                    if(cliques[i]["Cities"][j] === cities[k]["City"]) {
                        sortedArray.push(cities[k]);
                    }
                }
            }
        }
        return sortedArray;
    }


    return (
        <>
            <h1>Parameters:</h1>
            <form action="POST">
                <div className="slidecontainer">
                    <h2>Percentage of Operatable Land: {percentOfOperableLand}%</h2>
                    <input type="range" min="1" max="100" className="slider" id="myRange" value={percentOfOperableLand} 
                    onChange={e => setPercentOfOperableLand(e.target.value)}/>
                </div>
            </form>
        </>
    );
}

export default Parameters;