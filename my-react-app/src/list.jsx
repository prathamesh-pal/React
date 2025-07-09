
function List(props) {
    const itemlist = props.items;
    const category = props.category;

    // fruits.sort((a,b) => a.name.localeCompare(b.name));
    // fruits.sort((a,b) => b.name.localeCompare(a.name));
    // fruits.sort((a,b) => (a.calories - b.calories));

    // fruits.sort((a,b) => (b.calories - a.calories));

    const listItems = itemlist.map(item => <li key={item.name} >
        {item.name} : &nbsp; <b>{item.calories}</b>
    </li>)

    return (<>
        <h1>{category }</h1>
        <ol>{listItems}</ol></>)
}

export default List