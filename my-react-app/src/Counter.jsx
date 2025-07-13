import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        setCount(count - 1);
    }
    const reset = () => {
        setCount(0);
    }

    return (
        <div className="counter-container" >
            <p className="count-display" >{count}</p>
            <button className="counter-button" onClick={decrement} >D0:  -1 </button>
            <button className="counter-button" onClick={reset} >Reset </button>

            <button className="counter-button" onClick={increment} >D0:  +1 </button>

        </div>
    )
}

export default Counter