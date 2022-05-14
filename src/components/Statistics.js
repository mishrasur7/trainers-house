//dependencies imported
import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip, 
    Legend
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';

//registering the plugins of ChartJS in order to implement chart 
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip, 
    Legend
  );

function Statistics () {
    //chartData object state to save our data from api
    const [chartData, setChartData] = useState({
        labels:[],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: '',
            backgroundColor: ''
          }
        ], 
        
      });

    //useEffect function to render data once the page is loaded
    useEffect(() => { fetchData(); }, [])
    
    //fetching data from api, creating and storing required data into two arrays and finally 
    //calling setChartData function to save our required data into chartData object state
    const fetchData = () => {
        const activities = []
        const durations = [];
        fetch(process.env.REACT_APP_API_CUSTOMERS_TRAININGS)
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else throw new Error (response.status)
        })
        .then(responseData => {
            for (const data of responseData) {
                activities.push(data.activity); 
                durations.push(data.duration);
            }
            setChartData({
                labels:activities,
                datasets: [
                  {
                    label: 'Duration (min)',
                    data: durations,
                    borderColor: 'white',
                    backgroundColor: '#1976d2'
                  }
                ]
              })
        }
        )
        .catch(err => console.error(err))
    }

    //state to save all activities
    const[eachActivity, setEachActivity] = useState([]); 

    //state to save total durations per activities
    const [sumDuration, setSumDuration] = useState([]); 


    //defining the axis, bar border width, responsiveness, position and title text

    //next task is to label x-axis and y-axis ??? 
    const options = {
      indexAxis: 'x',
      elements: {
        bar: {
          borderWidth: 1,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Training activities and duration in minutes',
        }
      }
    };
    
    return(
        <div style={{width:'75%', height:'35%', margin: 120}}>
            <Bar data={chartData} options={options}/>
         </div>)
}

export default Statistics;