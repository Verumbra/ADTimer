import { useState, useRef, useEffect } from "react";

import { TimerDisplay } from './TimerDisplay'
import { SubTimerFrame } from "./SubTimerFrame";
import { TitleLined } from "./TitleLined";
import { PauseCancal } from "./PuaseCancal";
import { CancalDialog } from "./CancalDialog";
import { AudioPlayDialog } from "./AudioPlayDialog";
//import { ComputeSubTimers } from './logic/timerprep'

import './css/TimeFrame.css';
import './css/TitleLined.css';
import './css/PuaseCancal.css';
import './css/CancalDialog.css';



export function TimeFrame({timerID, callback, title, importance, duration, endTime, slicing, slices}) {
    //console.log(timerID);
    //console.log(slices.length);
    function convertDuration(value) {
        //Need to be extended to deturmand what format the timer needs to be in: determind between d/h/m/s, date, h/m/s, h/m/s/ms, ect.
        return Math.floor(value / 1000);

    }
    const startDuration = useRef(convertDuration(duration));
    const [currentDuration, setCurrentDuration] = useState(convertDuration(duration));
    const [isCurrent, setIsCurrent] = useState(slices.length > 0? slices[0].key:0);
    //const [isPause, setIsPause] = useState(false);
    const [cancalDialog, setCancalDialog] = useState(false);
    const [alarmDialog, setAlarmDialog] = useState(false);

    const aIntvDuration = useRef(1000);
    const InvtDuration = useRef(1000);

    const [mainState, setMainState] = useState('PLAY');
    const [alarmDuration, setAlarmDuration] = useState(60);
    //console.log(isCurrent);
    let alarm = new Audio('/alarms/digital-alarm-buzzer-1-1s.wav');
    
    
    const handleCallback = (value, ID) => {
        if (slices.length> 0){
            switch (value) {
                case "FINNESHED":
                    slices.splice(0,1);
                    if (slices.length> 0) {
                    setIsCurrent(slices[0].key);
                    }
            }
        }
        {/*switch (value) {
            case 'FINNESHED':
                if (!(slices.length === 0)) {
                    setIsCurrent(slices[ID+1].key);
                }
                break;
            case 'DELETE':
                if (!(slices.length === 0)) {
                    slices.splice(ID,1);
                }
                break;

        }*/}
    };
    function handleCancal() {
        setCancalDialog(!cancalDialog);
    }

    const handleDialog = (value) => {
        switch (value) {
            case "CANCEL":
                setCancalDialog(!cancalDialog);
                break;
            case "DELETE":
                setMainState('CANCEL')
                break;
        }
        
    }

    const handlePauseCancal = (value) => {
        switch(value) {
            case 'PAUSE':
                setMainState('PAUSE');
                setIsCurrent(999);
                break;
            case 'RESUME':
                setIsCurrent(slices[0].key);
                setMainState('PLAY');
                
                break;
            case 'CANCEL':
                handleCancal();
                break;
        }
    };

    //const triggered = useRef(false);

    const handleAlarmDialog = (value) => {
        //net code to send the server the rating of the timer
        setAlarmDialog(false);
        setMainState('FINISH');
    };

    {/*useEffect(() => {
        const interval = setInterval(() => {
            if (currentDuration>0&&!isPause)
            {
            setCurrentDuration(currentDuration-1);
            }}, 1000);
            if (currentDuration<1&&!alarmDialog&&!triggered.current) setAlarmDialog(true);
            //More Stuff need for Audio?
            return () => {
                clearInterval(interval);
            }
    }, [currentDuration, setCurrentDuration, isPause, alarmDialog]);*/}


    useEffect (() =>{
            
        switch (mainState) {
            case 'PLAY': {
                if (currentDuration>0) {const interval = setInterval(() =>{
                    setCurrentDuration(currentDuration -1);
                }, InvtDuration.current);
                return () => {
                    clearInterval(interval);
                }}
                else {
                    setMainState('ALARM');
                }
                break;
            }
            case 'PAUSE':
                // some net code to get the new expected date/time when the timer will end
                break;

            case 'CANCEL':
                //some net code to update the server correctly
                //should change the delete to cancel and change the callback handler to reflect that
                callback('DELETE', timerID);
                break;

            case 'ALARM': {
                const aInterval = setInterval(() => {
                    alarm.play();
                    alarmDialog?'':setAlarmDialog(true);
                    setAlarmDuration(alarmDuration-1);
                    if(alarmDuration < 0) {
                        aIntvDuration.current = 100;
                        setMainState('FINISH');

                    }
                }, aIntvDuration.current);
                return () => {
                    clearInterval(aInterval);
                }
            }
            case 'FINISH':
                callback('DELETE', timerID);
                break;
        }
        },[mainState, currentDuration, alarmDuration]);


    return(
        <div className="TimerFrame timer" data-key={timerID}> 
            <AudioPlayDialog callback={handleAlarmDialog} isOpen={alarmDialog} />
            <CancalDialog isOpen={cancalDialog} callback={handleDialog}/>
            <progress className="mainProgress" max={startDuration.current} value={currentDuration}/>
            <div className="mainWrapper">
                <PauseCancal callback={handlePauseCancal} />
                <TitleLined title={title} side="left"/>
                 
                
                <div className="Timer-Wrap">
                    <div className="subTimer-Wrapper">
                        {slices.map(slices => {
                            return <div key={slices.key} className="subtimer-Wrapper">
                                <SubTimerFrame 
                                duration={slices.duration}
                                callback={handleCallback}
                                subID={slices.key}
                                isDowntime={false}
                                isCurrent={isCurrent}
                            />
                            </div>
                        })}
                        </div>


                    <div className="mainTimer-Wrapper">
                        <div className="main-TimerDisplay-Wrapper">
                            <TimerDisplay duration={currentDuration} />
                            </div>
                    </div>
                </div>
            </div>
        </div>)

          }




