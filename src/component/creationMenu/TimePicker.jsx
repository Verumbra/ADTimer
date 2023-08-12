import { useState, useEffect } from 'react'
import './css/TimePicker.css'
import { useRef } from 'react';



export function TimePicker({callback, reset}) {
    
    const [newHours, setHours] = useState({});
    const [newMinutes, setMinutes] = useState({});
    const [newSeconds, setSeconds] = useState({});
    const tempobj = useRef({hour: 0, minute: 0, second: 0});

    function handleChangeHour(value) {
        
        callback(tempobj.current= Object.assign(tempobj.current, value))
        setHours(value)
    }

    function handleChangeMinute(value) {
        
        callback(tempobj.current= Object.assign(tempobj.current, value))
        setMinutes(value)
    }

    function handleChangeSeconds(value) {
         
        callback(tempobj.current= Object.assign(tempobj.current, value))
        setSeconds(value)
    }

    

    const minHr = 0;
    const maxHr = 99;
    const minMin = 0;
    const maxMin = 59;
    const minSec = 0;
    const maxSec = 59;

    useEffect(() => {
        tempobj.current = {hour: 0, minute: 0, second: 0};
        console.log("TP@43 in useEffect"+tempobj.current);
    },[reset]);

    return (
        <>
            <div  className="TimePicker" >
                <div className="time-inputs" id='timeFrame'>
                    <label className="timepicker-labels" htmlFor="Hours">
                        <input type="number" className="Hours" onChange={e => handleChangeHour({hour: Math.max(minHr, Math.min(maxHr, Number(e.target.value)))})} placeholder="00" value={newHours.hour}></input>
                        <span className="timepicker-label lbl-hrName">Hours</span>
                    </label>
                    <span>:</span>
                    <label className="timepicker-labels" htmlFor="Minutes">
                        <input type="number" className="Minutes" onChange={e => handleChangeMinute({minute: Math.max(minMin, Math.min(maxMin, Number(e.target.value)))})} placeholder="00" value={newMinutes.minute}></input>
                        <span className="timepicker-label lbl-minName">Minutes</span>
                    </label>
                    <span>:</span>
                    <label className="timepicker-labels" htmlFor="Seconds">
                        <input type="number" className="Seconds" onChange={e => handleChangeSeconds({second: Math.max(minSec, Math.min(maxSec, Number(e.target.value)))})} placeholder="00" value={newSeconds.second}></input>
                        <span className="timepicker-label lbl-secName">Seconds</span>
                    </label>
                    
                </div>
            </div>
        </>)
}