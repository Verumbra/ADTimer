import './css/AudioPlayDialog.css';

export function AudioPlayDialog({callback, isOpen}) {
    if (!isOpen) return null;

    function handleClick() {
        console.log('clicked the alarm button');
        return callback('DELETE');
    }

    //need the expand this to have a rating system that has passes back a rating to be pass to the database

    

    return (
        <div className="alarm-dialog-wrapper">
            <button type="button" className="btn-TimerFinish" onClick={handleClick}>Stop</button>
        </div>)
}