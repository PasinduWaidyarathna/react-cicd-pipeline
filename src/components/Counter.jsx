"use client"

import { useState, useEffect } from "react"

function Counter() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count")
    return savedCount ? Number.parseInt(savedCount, 10) : 0
  })

  const [countHistory, setCountHistory] = useState([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    document.title = `React Dashboard - Count: ${count}`
    localStorage.setItem("count", count)
  }, [count])

  const increment = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1
      setCountHistory([...countHistory, { action: "increment", value: newCount, timestamp: new Date() }])
      return newCount
    })
  }

  const decrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount - 1
      setCountHistory([...countHistory, { action: "decrement", value: newCount, timestamp: new Date() }])
      return newCount
    })
  }

  const reset = () => {
    setCount(0)
    setCountHistory([...countHistory, { action: "reset", value: 0, timestamp: new Date() }])
  }

  const setCustomValue = (e) => {
    e.preventDefault()
    if (inputValue === "") return

    const newValue = Number.parseInt(inputValue, 10)
    if (!isNaN(newValue)) {
      setCount(newValue)
      setCountHistory([...countHistory, { action: "set", value: newValue, timestamp: new Date() }])
      setInputValue("")
    }
  }

  return (
    <div className="feature-card counter-card">
      <h2>Interactive Counter</h2>

      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>

      <div className="counter-controls">
        <button className="control-btn decrement" onClick={decrement}>
          -
        </button>
        <button className="control-btn increment" onClick={increment}>
          +
        </button>
        <button className="control-btn reset" onClick={reset}>
          Reset
        </button>
      </div>

      <form className="custom-value-form" onSubmit={setCustomValue}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter custom value"
        />
        <button type="submit" className="set-btn">
          Set
        </button>
      </form>

      <div className="history-section">
        <h3>Counter History</h3>
        <div className="history-list">
          {countHistory.length === 0 ? (
            <p className="no-history">No actions yet</p>
          ) : (
            <ul>
              {countHistory.slice(-5).map((item, index) => (
                <li key={index}>
                  <span className="action-type">{item.action}</span>
                  <span className="action-value">{item.value}</span>
                  <span className="action-time">{item.timestamp.toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Counter
