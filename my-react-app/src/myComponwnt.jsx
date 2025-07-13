import React, { useState } from "react"

function MyComponent() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState()

    // const updateName = () => {
    //     setName("Spangebob");
    // }
    // return (<div>
    //     <p>Name: {name}</p>
    //     <button onClick={updateName}>Name</button>
    // </div>)

    function handelNameChange(event) {
        setName(event.target.value);
    }

    function handelquantity(event) {
        setQuantity(event.target.value);
    }

    return (
        <div>
            <input value={name} onChange={handelNameChange}/>
            <p>name:  {name}</p>

            <input value={quantity} onChange={handelquantity} type="number"/>
            <p>Quanantity: {quantity}</p>
        </div>
    );

}

export default MyComponent