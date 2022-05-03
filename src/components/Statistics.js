import React, { useState, useEffect } from "react";
import { BarChart, XAxis, YAxis, Bar } from 'recharts'; 

function Statistics () {

    const data = [
        { name: 'Student1', value: 10 }, 
        { name: 'Student2', value: 20 },
        { name: 'Student2', value: 40 },
        { name: 'Student2', value: 50 }, 
    ]


    return (
        <>
        <h1 style={{marginTop: 100}}>statistics test</h1>
        <BarChart width={400} height={500} data={data}>
            <XAxis dataKey='name' />
            <YAxis dataKey='value' />
            <Bar dataKey='value' fill='red'/>
        </BarChart>
        </>
    )
}

export default Statistics; 