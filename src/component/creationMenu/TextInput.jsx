import { useState } from "react";

import './css/TextInput.css';

export function TextInput({label, value, onChange}) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(value !== '');
    };

    return (
        <div className={`text-input ${isFocused || value !== ''? 'focused' :''}`}>
            <label className={`label ${isFocused || value !== ''? 'shrink' :''}`}>{label}</label>
            {/*<input 
                className={`input ${isFocused || value !== ''? 'focused' :''}`} 
                type="" 
                value={value} 
                onFocus={handleFocus} 
                onBlur={handleBlur} 
                onChange={(e) => onChange(e.target.value)} 
                />*/}
            <svg className="svg-mask" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <mask id="title-lbl-mask" width="100%" height="100%" >
                        <rect width="100%" height="100%" fill="white"/>
                        <rect className={`mask-cutout ${isFocused || value !== ''? 'focused' :''}`} fill="black"/>
                    </mask>
                </defs>
                <foreignObject className="html-container" width="100%" height="100%" mask="url(#title-lbl-mask)">
                    <input 
                        className={`input ${isFocused || value !== ''? 'focused' :''}`} 
                        type="text" 
                        value={value} 
                        onFocus={handleFocus} 
                        onBlur={handleBlur} 
                        onChange={(e) => onChange(e.target.value)} 
                        />
                </foreignObject>
            </svg>
        </div>
    );
}




