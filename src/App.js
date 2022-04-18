import React from 'react';
import './App.css';
import Provider from './context/planetsProvider';
import Table from './planetsTable';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
