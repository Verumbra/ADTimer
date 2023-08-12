import { useState, useRef } from 'react'

import { TimeFrame } from './component/timers/TimerFrame'
import { ComputeSubTimers } from './logic/timerprep'
import { CreationMenu } from './component/creationMenu/CreationMenu'



import './App.css'
import './component/timers/css/TimeFrame.css'



 //const TimeUnitContext = createContext({hour: '', minute: '', second: ''});

function App() {
  const [Timer, setTimer] = useState([])


     {/*Set up for the Menu*/}
  const handleMenuCallback = (value) => {
    setTimer((currentTimers) => {
        console.log('here @App:23'+value.title);
        console.log('here @App:23'+value.timerDuration);
        return [...currentTimers, value]
    });

    }

  const timerListRef = useRef(null);

  function findTimer(key) {
    console.log("findTimer key intance " + key);
    console.log(timerListRef.current.children[3]);
    let childTimer;
    let attribute;
    for (let i=0;i< timerListRef.current.children.length; i++) {
        childTimer = timerListRef.current.children[i];
        attribute = timerListRef.current.children[i].getAttribute("data-key");
        console.log(timerListRef.current.children[i].getAttribute("data-key"));
        console.log('childTimer.key '+attribute);
        if (attribute === key) {
            return childTimer;
        }
    }
  }

  function removeTimer(key) {
    console.log("line: 174 key: " + key);
    let timer = findTimer(key);
    //console.log("key: " + timer);
    //console.log('removing timer ' + timerListRef.current);
    //console.log('checking timer ' + timer)
    if (timer) {
        //console.log('checking timer ' + timer)
        timerListRef.current.removeChild(timer);
        
    }
  }

  const handleTimerCallback = (value, ID) => {
    console.log('in callback, heres the key: ' + ID);
    switch (value) {
        case 'FINISH':
            {/*Implement network code to sync data*/}
            removeTimer(ID);
            break;
        case 'DELETE':
            {/*Implement network code to sync data*/}
            console.log("key: " + ID);
            removeTimer(ID);
            break;
    }
  }
  
  return (
    <>
      <div >    {/*App Bar Section*/}
        <div className="app-Bar">
                <img src='/ATA logo.png' alt='logo' className='logo'/>
                <div href="#app-name" className="Nav-Title">APP Name PH</div>
                <a href="#split" className="Nav-split"></a>
                <CreationMenu callback={handleMenuCallback} />
            </div>

          <div>
            <div className ='timer-list' ref={timerListRef}>
              {Timer.map(Timer => {console.log("here in the map the current key is " + Timer.timerID);
                return <>{/*<div key={Timer.timerID}  className="timer">*/}
                    <TimeFrame key={Timer.timerID}
                    timerID={Timer.timerID}
                    
                    callback={handleTimerCallback} 
                    title={Timer.title} 
                    importance={Timer.importance}
                    duration={Timer.timerDuration}
                    endTime={Timer.endDate}
                    slicing={Timer.slicing}
                    slices={Timer.timeSlices}/>

                  
                {/*</div>*/}</>
              })}
            </div>
          </div>  
      </div>
      
    </>
  )
}

export default App



