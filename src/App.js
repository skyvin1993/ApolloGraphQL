import React from 'react';
import './App.css';
import Messages from './components/Messages/Messages';
import AuthInfo from './components/AuthInfo/AuthInfo';
import Orders from './components/Orders/Orders';
import './Custom.scss';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <AuthInfo />
          </div>
          <div className="col-5">
            <Messages />
          </div>
          <div className="col-4 orders-rale">
            <Orders />
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
