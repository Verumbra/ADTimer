import { useState, useRef, useEffect, useCallback } from 'react';

import { AddIcon } from '../Icons/AddIcon';
import { TitleLinedMenu } from './TitleLinedM';
import { TextInput } from './TextInput';
import { TimePicker } from './TimePicker';
import { ImportanceSelector } from './ImportanceSelector';
import { SlicingOptions } from './SlicingOption';
import { SubTimerOption } from './SubTimer Option';
import { ComputeSubTimers } from '../../logic/timerprep.js';





import './css/CreationMenu.css';






export function CreationMenu({callback}) {
    // Timer Constructions Form--------------------------------
    
    const [newSlicing, setSlicing] = useState('');
    
    const newImportance = useRef("");
    const sliceOption = useRef("Unifrom");
    const [newTitle, setTitle] = useState('');
    const [newTimeUnit, setTimeUnit] = useState({});
    const [reset, setReset] = useState(false);

    //Menu Operations --------------------------------
    const [formStatus, setFormStatus] = useState(false);
    function handleFormStatus() {
        setFormStatus(!formStatus);
    }

    //Callback Handlers --------------------------------
    const handleTitle = (title) => {
        setTitle(title);
    };
    
    const callbackSliOption = (value) => {
        console.log('here@callbackSliOption: ');
        sliceOption.current = value;
    };

    const ImpSelectCallback = (value) => {
        return newImportance.current = (value);
    };

    const timeUnitCallback = (value) => {
        console.log("@CRM:54" + +value.hour + ':' + value.minute + ':' + value.second);
        setTimeUnit(value);
    };

    const handleSubtimerOpt = (value) => {
        setSlicing(value);
    };

    const maxSlices = () => {
        let max;
        console.log("@CRM:64 ");
        let compute = computeDurtion(newTimeUnit.hours, newTimeUnit.minutes, newTimeUnit.seconds);
        
        if (compute) {
            compute/300000>compute*.25?max=Math.floor((compute/300000)/3):max=0;
        }
        else max=0;

        return max;

    };

    const FormRender = () => {
        if (formStatus) return (
            <form className="dropdown-menu open" onSubmit={handleMenuSubmit}>
                        <TitleLinedMenu className="creation-menu-title" side="right" >Add Timer</TitleLinedMenu>
                        <div className="menu-containt-wrapper">
                            <TextInput onChange={handleTitle} value={newTitle} label='Title Name'/>
                            <TimePicker  callback={timeUnitCallback} reset={ResetForm} className='menu-timepicker'></TimePicker>
                            <SlicingOptions callback={callbackSliOption} />
                            <div className="subTimer-Menu--wrapper">
                                <SubTimerOption callback={handleSubtimerOpt} maxRef={newTimeUnit} sliNum={newSlicing} />
                                {/*<ImportanceSelector  callbackImp={ImpSelectCallback}></ImportanceSelector>*/}
                            </div>
                        </div>
                        <button className='btm-submitButton' type="submit" >Add Timer</button> 
                    </form>
        );
        else return null;
    }

    function ResetForm() {
        setTitle('');
        //setReset(!reset);
        setTimeUnit({});
        newImportance.current = '';
        sliceOption.current = 'Uniformed';
        setSlicing(0);
        handleFormStatus();

    }


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

    function computeEndDate(value) {
        return (value + Date.now());
    }

    function handleMenuSubmit(e) {
        e.preventDefault();
        
        const newTimer = {timerID: crypto.randomUUID(), 
            title: newTitle, 
            importance: newImportance, 
            timerDuration: computeDurtion(newTimeUnit.hour, newTimeUnit.minute, newTimeUnit.second), 
            endDate: computeEndDate(computeDurtion(newTimeUnit.hour, newTimeUnit.minute, newTimeUnit.second)), 
            slicing: newSlicing, 
            timeSlices: ComputeSubTimers(computeDurtion(newTimeUnit.hour, newTimeUnit.minute, newTimeUnit.second), newSlicing+1, sliceOption.current, false) };

        //write net code to add the timer to the database if the user info, then make sure to get a OK singel back
        //Need to add in a check that will allow o subtimers, there also need to be a mechanism to safegaurd against NaN values in the Timer Frames.
        //Need the add ion the reset function to clear the panel of all previous values
        ResetForm();
        return callback(newTimer);

    }

        

 


    return (
        <div className='dropdown-container'>
                    <button id='menu' className='btn-menuAddTimer round' onClick={handleFormStatus}><AddIcon className='add-Icon' /></button>
                   
                    {FormRender()}
                    {/*<form className={`dropdown-menu ${formStatus ? "open": ""}`} onSubmit={handleMenuSubmit}>
                        <TitleLinedMenu className="creation-menu-title" side="right" >Add Timer</TitleLinedMenu>
                        <div className="menu-containt-wrapper">
                            <TextInput onChange={handleTitle} value={newTitle} label='Title Name'/>
                            <TimePicker  callback={timeUnitCallback} className='menu-timepicker'></TimePicker>
                            <SlicingOptions callback={callbackSliOption} />
                            <div className="subTimer-Menu--wrapper">
                                <SubTimerOption callback={handleSubtimerOpt} maxRef={newTimeUnit} sliNum={newSlicing} />
                                <ImportanceSelector  callbackImp={ImpSelectCallback}></ImportanceSelector>
                            </div>
                        </div>
                        <button className='btm-submitButton' type="submit" >Add Timer</button> 
                    </form>*/}
                </div>
    );


}