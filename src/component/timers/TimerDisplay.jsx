import { useRef } from 'react'
import './css/TimerDisplay.css'



export function TimerDisplay({duration}) {

    const startDuration = useRef(duration);

    return (
        <div className="main-TimerDisplay">
            
                            <span className={`timerDisplay-hour ${Math.floor(startDuration.current/3600)>0?"":"displayed"}`}>
                                {String(Math.floor(duration/3600)).padStart(2, '0')}:
                            </span>
                            
                            <span className={`timerDisplay-minute ${Math.floor((startDuration.current%3600)/60)>0||startDuration.current/3600>0?"":"displayed"}`}>
                                {String(Math.floor((duration%3600)/60)).padStart(2, '0')}:
                            </span>
                            
                            <span className={`timerDisplay-second ${Math.floor(startDuration.current%60)>0||startDuration.current/60>0?"":"displayed"}`}>
                                {String(Math.floor(duration%60)).padStart(2, '0')}
                            </span>
                            
                           
                            </div>
            )}