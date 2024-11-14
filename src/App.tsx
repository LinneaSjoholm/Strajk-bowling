import React from 'react';
import Routes from './backend/routes/routes';
import './frontend/styles/App.css';

const App = () => {
  return (
  <div className="App">
    <div className="View">
        <div className="View__iphone">
          <div className="View__iphone-screen">
            <div className="View__iphone-top"></div>
            <Routes />
            <div className="View__iphone-bottom"></div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default App;