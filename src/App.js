import React from 'react';
import './App.css';

import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Cards from './Components/Cards';

function App() {
  return (
    <div className='App'>
      <div className='wrapper'>
        <Sidebar />
        <div id='content'>
          <Navbar />
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default App;
