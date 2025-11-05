import React, { useState } from "react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handleChange(event) {
    setTodo(event.target.value);
  }

  function handleAdd() {
    if (todo.trim() === "") return;
    if (editIndex !== null) {
      const updatetodos = todos.map((item, index) => {
        if (index === editIndex) {
          return { ...item, text: todo };
        }
        else {
          return item;
        }
      });
      settodos(updatetodos);
      setEditIndex(null);
    }
    else {

      settodos([...todos, { text: todo, completed: false }])
    }


    setTodo("");


  }
  function handleDelete(index) {
    const newtodos = todos.filter((_, i) => i !== index);
    settodos(newtodos);
  }
  function handleUpdate(index) {
    setTodo(todos[index].text);
    setEditIndex(index);
  }
  function handleCompleted(index) {
    const newtodo = todos.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      else {
        return item;
      }
    });
    settodos(newtodo);
  }

  return (
    <div className="body">
      <div className="container">
        <div className="box1">
          <input type="text" placeholder="Enter the todo" value={todo} onChange={handleChange} />
          <button onClick={handleAdd}>Add</button>
        </div>
        <ul className="list">

          {todos.map((item, index) =>
            <li key={index} >
              <input className="check-box"checked={item.completed} type="checkbox" onClick={() => handleCompleted(index)} />
              <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>{item.text}</span>
              <button onClick={() => handleDelete(index)}> Delete</button>
              <button onClick={() => handleUpdate(index)}>Update</button></li>

          )}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
