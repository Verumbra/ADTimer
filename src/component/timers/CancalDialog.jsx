import './css/CancalDialog.css';



export function CancalDialog({isOpen, callback}) {
    if (!isOpen) return null;

    function handleCancel() {
        callback("CANCEL");
    }

    function handleDelete() {
        callback("DELETE");
    }

    return (
        <div className="cancal-dialog-wrapper">
            <div className="dialog">
                <span className="dialog-content"></span>
                <div className="btn-container">
                    <button className="btn-cancel" onClick={e => {e.stopPropagation(); handleCancel();}}>Cancel</button>
                    <button className="btn-delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )    
}