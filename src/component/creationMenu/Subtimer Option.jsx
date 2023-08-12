import { useState, useEffect, useRef, useMemo } from "react"
import { TitleLinedMenu } from "./TitleLinedM";

import './css/SuptimerOption.css';


export function SubTimerOption({callback, maxRef, sliNum}) {
    console.log("here @SubTimerOption:8"+maxRef);
    //const [value, setValue] = useState(0);
    //maxSubtimers needs to be calculated from the total duration of the timer 
    //which comes from the outside 
    //const maxSubtimers = useRef(4);
    //function handleChange(prop) {
        //callback(prop);
    //    return setValue(prop);
    //}

    function computeHours(hours) {
        return (hours*3600000);
    }
    function computeMinutes(minutes) {
        return (minutes*60000);
    }
    function computeSeconds(seconds) {
        return (seconds*1000);
    }

    function computeDurtion(hours, minutes, seconds) {
        return (computeHours(hours)+computeMinutes(minutes)+computeSeconds(seconds));
    }

    function maxSlices(value) {
        let max;
        let compute = computeDurtion(maxRef.hour, maxRef.minute, maxRef.second)
        if (maxRef) {
            compute/300>(compute*.25)/1000?max=Math.floor((compute/300000)/2):max=0;
        }
        else max=0;
        console.log("maxSlices: " + compute/300 +"vs" + (compute*.25)/1000);
        return max;
    }

    return (
        <div className="subTimerOption-Wrapper">
            <div className="subTimerOption-header-wrapper">
                <TitleLinedMenu className="subtimer-option-title" size="small">Number of Subtimers</TitleLinedMenu> 
            </div>
            <div className="subTimerOption-body-wrapper">
                <input type="number" className="subTimerOption-subtimernumber"placeholder="0"  onChange={e => callback(Math.max(0, Math.min(maxSlices(), e.target.value)))} value={sliNum}></input>
                <button type="button" className="subTimerOption-btn-downtime">Include Downtime</button>
            </div>
        </div>
    )
}