import { useState, useEffect } from 'react'
import './App.css'
import Parameters from './components/Parameters';
import ScatterMap from './components/ScatterMap';

function App() {
	const [relevantData, setRelevantData] = useState([]);
	
  return (
    <>
		<Parameters setRelevantData={setRelevantData}/>
		<ScatterMap citiesToHighlight={relevantData} />
    </>
  );
}

export default App