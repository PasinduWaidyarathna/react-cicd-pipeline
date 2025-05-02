"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import Counter from "./components/Counter"
import DeploymentInfo from "./components/DeploymentInfo"
import TodoList from "./components/TodoList"
import Timer from "./components/Timer"
import Footer from "./components/Footer"

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme || "dark"
  })

  const [activeTab, setActiveTab] = useState("counter")

  const deploymentInfo = {
    environment: "development",
    version: "1.0.0",
    deployTime: new Date().toLocaleString(),
  }

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "counter":
        return <Counter />
      case "todo":
        return <TodoList />
      case "timer":
        return <Timer />
      case "deployment":
        return <DeploymentInfo info={deploymentInfo} />
      default:
        return <Counter />
    }
  }

  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="App-main">
        <div className="content-container">{renderActiveTab()}</div>
      </main>

      <Footer />
    </div>
  )
}

export default App
