import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [deploymentInfo, setDeploymentInfo] = useState({
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    deployTime: new Date().toLocaleString()
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Simple React App - Count: ${count}`;
    
    // Report Web Vitals to analytics service
    if (typeof window.reportWebVitals === 'function') {
      window.reportWebVitals({
        name: 'page-load',
        value: performance.now()
      });
    }
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Simple React App with CI/CD Pipeline</h1>
        <p>
          This app demonstrates CI/CD with GitHub Actions, Docker, and AWS | Pasindu Waidyarathna
        </p>
        <div className="counter-section">
          <p>You clicked the button {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
        <div className="deployment-info">
          <h3>Deployment Info</h3>
          <p>Environment: {deploymentInfo.environment}</p>
          <p>Version: {deploymentInfo.version}</p>
          <p>Deploy Time: {deploymentInfo.deployTime}</p>
        </div>
      </header>
    </div>
  );
}

export default App;