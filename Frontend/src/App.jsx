import { useState, useEffect } from 'react'
import './App.css'
import Parameters from './components/Parameters';
// import { Scatterplot } from './components/Scatterplot';
import Choropleth from './components/Choropleth';

function App() {
	const [relevantData, setRelevantData] = useState([]);
	
  return (
    <>
		<Parameters setRelevantData={setRelevantData}/>
		{/* <div id='map-container'>
			<Scatterplot relevantData={relevantData}/>
		</div> */}

		<Choropleth citiesToHighlight={relevantData} />
    </>
  );
}

export default App