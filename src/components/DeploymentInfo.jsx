function DeploymentInfo({ info }) {
    return (
      <div className="feature-card deployment-card">
        <h2>Deployment Information</h2>
  
        <div className="deployment-details">
          <div className="info-item">
            <div className="info-label">Environment</div>
            <div className="info-value">{info.environment}</div>
          </div>
  
          <div className="info-item">
            <div className="info-label">Version</div>
            <div className="info-value">{info.version}</div>
          </div>
  
          <div className="info-item">
            <div className="info-label">Deploy Time</div>
            <div className="info-value">{info.deployTime}</div>
          </div>
  
          <div className="info-item">
            <div className="info-label">Browser</div>
            <div className="info-value">{navigator.userAgent}</div>
          </div>
  
          <div className="info-item">
            <div className="info-label">Screen Size</div>
            <div className="info-value">{`${window.innerWidth}x${window.innerHeight}`}</div>
          </div>
        </div>
  
        <div className="system-status">
          <h3>System Status</h3>
          <div className="status-indicators">
            <div className="status-item">
              <span className="status-label">API</span>
              <span className="status-badge online">Online</span>
            </div>
            <div className="status-item">
              <span className="status-label">Database</span>
              <span className="status-badge online">Online</span>
            </div>
            <div className="status-item">
              <span className="status-label">Storage</span>
              <span className="status-badge online">Online</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default DeploymentInfo
  