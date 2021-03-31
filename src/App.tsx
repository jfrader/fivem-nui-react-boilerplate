import React from 'react';
import './App.css';
import { useNuiService } from 'fivem-nui-react-lib';
import { Example } from './Example';

function App() {
  useNuiService();

  return (
    <div className="App">
      <header className="App-header">
        <Example />
      </header>
    </div>
  );
}

export default App;
