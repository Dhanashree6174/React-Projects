import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]); // prev refers to all previous todo available in todos array - setTodos has this callback functionality to access prev
    // ... refers to spreading an object or array
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((prevTodo) => 
        prevTodo.id !== id
      )
    );
  };

  const toggleComplete = (id) => {
    console.log(id);
    setTodos(
      (prev) =>
        prev.map((prevTodo) =>
          prevTodo.id === id
            ? { ...prevTodo, completed: !prevTodo.completed }
            : prevTodo
        ) // dont't use {} in map since we aren't returning anything explicitly --> cause undefined id error
      // In your code, you're not returning anything inside the .map() block, so undefined is implicitly returned for each prevTodo. This leads to the todos array being filled with undefined.
    );
  };

  //useEffect for retrieving todos from local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    //localStorage.getItem("key")

    // converting string to json format using JSON.parse
    const todos = storedTodos ? JSON.parse(storedTodos) : []; // checking if storedTodos is null since null cannot be parse by JSON

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []); // runs when app is opened for the first time and brings in all the todos (if any) from local sttorage

  //useEffect for storing new todos into local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); //localStorage takes value as a string so using JSON.stringify()
    //localStorage.setItem("key", "value")
  }, [todos]);

  return (
    // value = {destructuring the context}
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-w-screen min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos
              .map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div> //avoid using map index parameter as keys
              ))}

            {/* {todos.map((todo)=>{})}  --> if curly braces are used..we need to return something, () autoreturns so using that here*/}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
