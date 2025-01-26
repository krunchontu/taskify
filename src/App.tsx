import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Taskify App</h1>
      </header>
      <main>
        <ul className="task-list">
          <li>Buy groceries</li>
          <li>Walk the dog</li>
          <li>Finish React project</li>
        </ul>
      </main>
    </div>
  );
}

export default App;
