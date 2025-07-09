import List from "./list.jsx"
function App() {
  const fruits = [{ name: "apple", calories: 10 },
  { name: "orange", calories: 32 },
  { name: "papaya", calories: 54 },
  { name: "graps", calories: 24 },
  { name: "tamato", calories: 122 }]

  const vagitable = [{ name: "apple", calories: 10 },
  { name: "orange", calories: 32 },
  { name: "papaya", calories: 54 },
  { name: "graps", calories: 24 },
  { name: "tamato", calories: 122 }]

  return (
    <>
      < List items={fruits} category="Fruits" ></List>
      < List items={vagitable} category="vagitables" ></List>

    </>
  )
}



export default App
