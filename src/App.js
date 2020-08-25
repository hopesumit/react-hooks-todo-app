import React, { useState, useReducer, useEffect, useRef } from "react";
import "./App.css";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, { name: action.name }];
    case "remove":
      return state.filter((item, index) => index !== action.index);
    
    default:
      return state;
  }
};

function App() {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  

  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus());

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({
      type: "add",
      name: inputRef.current.value,
    });
    inputRef.current.value = "";
  }
 

  return (
    <div className="App">
    <h1>Todos</h1>
        <form className="to-do-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Add new task" ref={inputRef} />
          <button className="arrow-buton">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </form>

      <div className="list">
        <ul>
          {tasks.map((task, index) => (
            <li className="list" key={index}>
              {task.name}
              <button onClick={() => dispatch({ type: "remove", index })}>
              <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
