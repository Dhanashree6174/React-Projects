import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid method generates unique ids

//initial state of store
const initialState = {
  todos: [],
};

function sayHello() {
  console.log("Hello");
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // addTodo: sayHello // a property
    //or
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload, //we get text value in payload of action (payload is an ovject) -- we can also write action.payload.text although we can omit writing text again since we have written prop name text too(bcoz we will send it as text only)
      };
      state.todos.push(todo); // adding object to store/state
    }, // In reducers, we get access to two props - state, action
    // state gives access to all values in current state
    //action provides new values that are supplied by user which are to be added to store
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload); //overwriting the existing todos
    },
  },
}); // takes object as parameters - slice has a name property --> slice is represented by this name in chrome extension, initialState of reducer(written above todoSlice), reducers --> it is an object that contains properties and functions

export default todoSlice.reducer; //need to export this(reducers) bcoz we need to make the store aware of reducers so that it allows changes by them (req for store)
export const { addTodo, removeTodo } = todoSlice.actions; //we need to export individual functionalities/reducers as well bcoz we might need them in our components to update the state

//In redux, we write function definitions also whereas in context api, we only wrote function declarations
