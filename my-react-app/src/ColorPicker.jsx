import React,{ useState } from "react";

function ColorPicker() {

    const [color, setColor] = useState("#FFFFFF");

    function handleColor(event) {
        setColor(event.target.value);

    }

    return (
        <>
            <div className="Color-picker-container" >
                <h1>Color Picker</h1>   
                <div className="color-display" style={{backgroundColor:color }} >
                    <p>Select Color :{color}</p>
                </div>
                <label>Select a Color: </label>
                <input type="color" value={color} onChange={handleColor} />

            </div>
        </>
    );

}

export default ColorPicker 