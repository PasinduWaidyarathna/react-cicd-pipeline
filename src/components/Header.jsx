"use client"
// import logo from "../logo.svg"

function Header({ theme, toggleTheme, activeTab, setActiveTab }) {
  return (
    <header className="App-header">
      <div className="logo-container">
        {/* <img src={logo || "/placeholder.svg"} className="App-logo" alt="logo" /> */}
        <h1>React Dashboard</h1>
      </div>

      <nav className="main-nav">
        <ul>
          <li className={activeTab === "counter" ? "active" : ""}>
            <button onClick={() => setActiveTab("counter")}>Counter</button>
          </li>
          <li className={activeTab === "todo" ? "active" : ""}>
            <button onClick={() => setActiveTab("todo")}>Todo List</button>
          </li>
          <li className={activeTab === "timer" ? "active" : ""}>
            <button onClick={() => setActiveTab("timer")}>Timer</button>
          </li>
          <li className={activeTab === "deployment" ? "active" : ""}>
            <button onClick={() => setActiveTab("deployment")}>Deployment Info</button>
          </li>
        </ul>
      </nav>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  )
}

export default Header
