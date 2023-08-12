import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { TitleLinedMenu } from "./TitleLinedM";


import './css/ImportanceSelector.css'





export function ImportanceSelector({callbackImp}) {
    
    

    const high= 3;
    const mid= 2;
    const low= 1;

    

    return (
        <form  className='ImpSelector-Frame'>
            <TitleLinedMenu className="impSelect-title" size='small'>Level of Importance</TitleLinedMenu>
            <div className ="ImpSelector-select-Group">
                <label className='lbl-ImpSelect' htmlFor='High'>
                    <input  className='ImpInput High' type="radio" name="Imp" value={high} onChange={e => callbackImp(e.target.value)} />
                    <span className='ImpSelector-lbl lbl-High'>High</span>
                </label>
                <label className='lbl-ImpSelect' htmlFor="Mid">
                    <input className='ImpInput Mid' type="radio" name="Imp" value={mid} onChange={e => callbackImp(e.target.value)} />
                    <span className='ImpSelector-lbl lbl-Mid'>Mid</span>
                </label>
                <label className='lbl-ImpSelect' htmlFor='Low'>
                    <input className='ImpInput Low' type="radio" name="Imp" value={low} onChange={e => callbackImp(e.target.value)} />
                    <span className='ImpSelector-lbl lbl-Low'>Low</span>
                </label>
            </div>
        </form>)
}