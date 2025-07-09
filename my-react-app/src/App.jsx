import Student from "./Students.jsx"
function App() {
  return (
    <>
      <Student name="Pal" age={30} isStudent={false} />
      <Student name="Pal" age={30} />
      <Student name="Pal" age={30} isStudent={false} />

    </>
  )
}



export default App
