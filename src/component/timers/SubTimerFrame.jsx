import { useState, useEffect, useRef, useCallback } from "react"

import { TimerDisplay } from "./TimerDisplay";

//import { ComputeSubTimers } from './logic/timerprep'
import "./css/SubTimerFrame.css"



export function SubTimerFrame({duration, callback, subID, isDowntime, isCurrent}) {
    
    function convertDuration(value) {
        return Math.floor(value / 1000);
        {/*Need to be extended to deturmand what format the timer needs to be in: determind between d/h/m/s, date, h/m/s, h/m/s/ms, ect. */}
    }

    const startDuration = useRef(convertDuration(duration));
    const triggerSet = useRef(true);
    const [on, setOn] = useState((isCurrent===subID?true:false));
    
    const [currentDuration, setCurrentDuration] = useState(convertDuration(duration));
    
    function playAudio() {
        const audio = new Audio('/alarms/mixkit-interface-hint-notification-911.wav');
        audio.play();
    }

    const triggering = useCallback(() => {
        triggerSet.current = false;
        playAudio();
        callback("FINNESHED", subID);
        // callback is a functioin in the parent component that changes isCurrent value
        // and delete finneshed timers and moves the que up for the next one.
    },[triggerSet,on,callback,subID]);
    
    const triggered = useCallback(() => {
        callback("DELETE", subID);
        // callback is a functioin in the parent component that changes isCurrent value
        // and delete finneshed timers and moves the que up for the next one.
    })



    useEffect(() =>{
            setOn((isCurrent===subID)?true:false);
    },[isCurrent]);

    useEffect(()=>{
         if ((on&&currentDuration>0&&triggerSet.current)) {
                const interval = setInterval(()=>{
                    setCurrentDuration(currentDuration-1);
                }, 1000);
                return () => clearInterval(interval);
            }
            else {
                currentDuration<1? triggering():"";
            }
    }, [currentDuration, setCurrentDuration, on, triggering, triggered])

    return (
        <div className ="SubTimerFrame">
            
            <progress className="SubProgress" max={startDuration.current} value={currentDuration} />
            <div className ="subWrapper">
                <TimerDisplay duration={currentDuration}/>
            </div>
        </div>
    )
}