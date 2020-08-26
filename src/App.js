import React, { useState, useReducer } from "react";
import "./App.css";

const initialState = [];

const reducer = (todos, action) => {
  switch (action.type) {
    case "add":
      return [...todos, newTodo(action.payload.name)];
    case "remove":
      return todos.filter((todo) => todo.id !== action.payload.id);
    case "toggle":
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    default:
      return todos;
  }
};

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "add",
      payload: { name: name },
    });
    setName("");
  }

  return (
    <div className="App">
      <h1>Todos</h1>
      <form className="to-do-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new task"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="arrow-buton">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </form>
      <div className="todos">All({todos.length})</div>

      <div className="list">
        {todos.map((todo) => (
          <div className="list" key={todo.id}>
            <span style={{ color: todo.complete ? "#AAA" : "#000" }}>
              {todo.name}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "remove", payload: { id: todo.id } })
              }
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button
              className="toggle-button"
              onClick={() =>
                dispatch({ type: "toggle", payload: { id: todo.id } })
              }
            >
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
