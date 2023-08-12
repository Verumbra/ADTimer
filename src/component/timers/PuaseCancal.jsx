import { useRef } from "react";

import { CloseIcon } from "./CloseIcon";
import { PauseIcon } from "./PauseIcon";

import './css/PuaseCancal.css';


export function PauseCancal({callback}) {

    const isPause = useRef(false);

    function handlePause() {
        if (isPause.current) {
            isPause.current = !isPause.current;
            return callback("RESUME");
        }
        isPause.current = !isPause.current;
        return callback("PAUSE");
    }

    function handleCanal() {
        return callback("CANCEL");
    }

    return (
        <div className="btm-wrapper">
            <button className="btm-pause" onClick={e => {e.stopPropagation(); handlePause();}}><PauseIcon /></button>
            <button className="btm-cancal" onClick={e => {e.stopPropagation(); handleCanal();}}><CloseIcon /></button>
        </div>
    )
}