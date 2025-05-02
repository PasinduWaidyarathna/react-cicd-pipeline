"use client"

import { useState, useEffect } from "react"

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (newTodo.trim() === "") return

    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date(),
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  return (
    <div className="feature-card todo-card">
      <h2>Todo List</h2>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

      <div className="filter-controls">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>
          Active
        </button>
        <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-state">No tasks to display</li>
        ) : (
          filteredTodos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <div className="todo-content">
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <span className="todo-text">{todo.text}</span>
                <span className="todo-date">{new Date(todo.createdAt).toLocaleDateString()}</span>
              </div>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                ×
              </button>
            </li>
          ))
        )}
      </ul>

      {todos.some((todo) => todo.completed) && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}

      <div className="todo-stats">
        <p>{todos.filter((todo) => !todo.completed).length} items left</p>
      </div>
    </div>
  )
}

export default TodoList
