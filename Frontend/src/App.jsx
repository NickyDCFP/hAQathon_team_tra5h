import { useState, useEffect } from 'react'
import './App.css'
import Parameters from './components/Parameters';
import ScatterMap from './components/ScatterMap';
// import Map from './components/Map';
// import Legend from './components/Legend';

function App() {
	const [relevantData, setRelevantData] = useState(null);
	const [notableLocations, setNotableLocations] = useState(null);
	console.log(notableLocations)
  return (
    <>
		<h1>Energy SPECTator</h1>
		<h2>Currently operational for recommending wind farm locations in California</h2>
		<p>Circles signify large regions to build wind farms while the markers are notable cities that have an extraordinarily large wind speed compared to population.</p>
		<Parameters setRelevantData={setRelevantData} setNotableLocations={setNotableLocations}/>
		{relevantData && <ScatterMap locationsToHighlight={relevantData} notableLocations={notableLocations}/>}
    </>
  );
}

export default App