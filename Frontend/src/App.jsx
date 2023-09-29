import { useState, useEffect } from 'react'
import './App.css'
import Parameters from './components/Parameters';
import ScatterMap from './components/ScatterMap';
// import Map from './components/Map';
// import Legend from './components/Legend';

function App() {
	const [relevantData, setRelevantData] = useState(null);
  return (
    <>
		<h1>Energy SPECTator</h1>
		<h2>Currently operational for recommending wind farm locations in California</h2>
		<Parameters setRelevantData={setRelevantData}/>
		{relevantData && <ScatterMap locationsToHighlight={relevantData} />}
    </>
  );
}

export default App