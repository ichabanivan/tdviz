import React from 'react';
import { Typography, Button } from 'antd';

import './App.css';
import 'antd/dist/antd.css';
import logo from './logo.svg';

const { Title } = Typography;

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Title>Safe Health</Title>
        </p>
        <Button type="primary">Primary Button</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
