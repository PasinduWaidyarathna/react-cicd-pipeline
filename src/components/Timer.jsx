"use client"

import { useState, useEffect, useRef } from "react"

function Timer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
  }

  const startStop = () => {
    setIsRunning(!isRunning)
  }

  const reset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const lap = () => {
    if (isRunning) {
      setLaps([...laps, { time, formattedTime: formatTime(time) }])
    }
  }

  return (
    <div className="feature-card timer-card">
      <h2>Stopwatch Timer</h2>

      <div className="timer-display">
        <span className="timer-value">{formatTime(time)}</span>
      </div>

      <div className="timer-controls">
        <button className={`control-btn ${isRunning ? "stop" : "start"}`} onClick={startStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="control-btn lap" onClick={lap} disabled={!isRunning}>
          Lap
        </button>
        <button className="control-btn reset" onClick={reset} disabled={time === 0}>
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps-section">
          <h3>Laps</h3>
          <ul className="laps-list">
            {laps.map((lap, index) => (
              <li key={index}>
                <span className="lap-number">Lap {index + 1}</span>
                <span className="lap-time">{lap.formattedTime}</span>
                {index > 0 && <span className="lap-diff">{formatTime(lap.time - laps[index - 1].time)}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Timer
