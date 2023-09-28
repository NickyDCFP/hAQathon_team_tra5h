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

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


export function Scatterplot({relevantData}) {
    let theData = relevantData.map( data=> ({x: data[0], y: data[1]}));
    const data = {
        datasets: [
          {
            label: 'data yay!',
            data: theData,
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      };
    return <Scatter options={options} data={data} />;
}
