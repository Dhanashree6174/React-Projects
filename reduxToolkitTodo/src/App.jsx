import { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {

  return (
    <>
    <div className = "text-center m-10">
      <h1>Learn about redux toolkit</h1>
      <AddTodo/>
      <Todos/>
      </div>
    </>
  );
}

export default App;
