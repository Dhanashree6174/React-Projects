// This is our store
import {configureStore} from '@reduxjs/toolkit'; // from core redux
import todoReducer from '../features/todo/todoSlice';


export const store = configureStore({
    reducer: todoReducer //name of reducer -- we can give multiple reducers as well
}) // takes an object as parameter