import { useState, useEffect } from 'react'
import './App.css'
import Parameters from './components/Parameters';
import { Scatterplot } from './components/Scatterplot';

function App() {
	const [relevantData, setRelevantData] = useState([]);

  return (
    <>
		<Parameters setRelevantData={setRelevantData}/>
		<Scatterplot relevantData={relevantData}/>
    </>
  );
}

export default App
