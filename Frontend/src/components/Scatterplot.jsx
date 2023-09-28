import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export function Scatterplot({relevantData}) {
    let theData = relevantData.map( data=> ({x: data[0], y: data[1]}));

    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
    };

    const data = {
        datasets: [
          {
            label: 'data yay!',
            data: theData,
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      };
    return (
        <div className="scatterplot-container">
            <Scatter options={options} data={data} />
        </div>
    );
}
