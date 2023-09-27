import { useState, useEffect } from "react";


const Test = () => {
    const [data, setdata] = useState({
        name: "",
        age: 0,
        test: "",
    });
 
    useEffect(() => {
        fetch("/testapi").then((res) =>
            res.json().then((data) => {
                setdata({
                    name: data.Name,
                    age: data.Age,
                    test: data.test,
                });
            })
        );
    }, []);
    
    return (
        <p>test: {data.name}, {data.age}, {data.test}</p>
    );
}

export default Test;