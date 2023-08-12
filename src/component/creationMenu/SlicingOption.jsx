import { useState, useRef } from 'react'
import { SliDropList } from './SlicingDropList';


import './css/SlicingOption.css'


export function SlicingOptions({ disable,currentOptions, callback, otherProps}) {

    
    
    const [dropTitle, setDropTitle] = useState("Slicing Methods")
    {/*This needs a handle function somewhere either inside the component or b
     outside being passed as an arg to make the list
     function handleOptionList(currentOptions) {
        setOptionItem((currentOptions) => {
            return [...currentOptions, { ID: crypto.randomUUID(),
                value: optionV,
                name: optionN}]
        })
     }*/}
    const [open, setOpen] = useState(false);
    
    const nameCallback = (value ) => {
        console.log(value);
        setDropTitle(value);
        handleOpen();
        callback(value);
        

    }
    

     function handleOpen() {
        setOpen(!open);
     }

     //const [listItems, setListItems] = useState();

    {/*} function handleDropOpen() {
        setListItems((currentOptions) => {
            return [...currentOptions];});
     }*/}

    
     
    // console.log(open.current);

    return (
        <>


            <div className={`slicingOptions ${open?'open':''}`}>
                <div className="slicing-dropdown">
                    <button type="button" className="btn-sli-dropdown" onClick={e => {e.stopPropagation(); handleOpen();}}>{dropTitle}</button>
                    <div className={`sli-drop-contents ${open?'open':''}`}>
                        <SliDropList value={nameCallback} />
                    </div>
                </div>
            </div>
        </>)
}