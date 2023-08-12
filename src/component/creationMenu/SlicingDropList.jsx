




export function SliDropList({value}) {
    function handleClickN() {
        return value("Normal");
    }

    function handleClickA() {
        return value("Adjusted");
    }

    function handleClickU() {
        return value("Uniformed");
    }

    function handleClickS() {
        return value("Suggested");
    }

    return (
        <>
            <button type="button" className="btn-slice-list-item" onClick={handleClickN}>Normal{console.log("1 normal")}</button>
            <button type="button" className="btn-slice-list-item" onClick={handleClickA}>Adjusted{console.log("2 adjusted")}</button>
            <button type="button" className="btn-slice-list-item" onClick={handleClickU}>Uniform{console.log("2 unform")}</button>
            <button type="button" className="btn-slice-list-item" onClick={handleClickS}>Suggested{console.log("2 suggested")}</button>
        </>)
}





