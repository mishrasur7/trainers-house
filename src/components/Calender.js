import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

function Calendar () {

    //events array state to save events 
    const [events, setEvents] = useState([]);

    //fetching data upon render
    //stores start, end and title in dateArray
    //sets events to dateArray 
    useEffect(() => {
        fetch(process.env.REACT_APP_API_CUSTOMERS_TRAININGS)
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else throw new Error (response.status)
        })
        .then(responseData => {
            let dataArray = []; 
            for(let i = 0; i < responseData.length; i++) {
                dataArray.push({
                    start: new Date(responseData[i].date),
                    end: new Date(responseData[i].date + responseData[i].date * 60000), 
                    title: `${responseData[i].activity} / ${responseData[i].customer.firstname}`
                }); 
            }
            setEvents({events : dataArray})
        }
            )
        .catch(err => console.error(err))
    }, [])


    return (
    <>
    <div style={{margin: 100 }}>
     <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
            start: 'prev, next, today',
            center: 'title', 
            end: 'dayGridMonth, dayGridWeek, dayGridDay'
        }}
      />
    </div>
    </>
    ); 
}

export default Calendar; 
