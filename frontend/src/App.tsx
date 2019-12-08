import React from 'react';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <HeaderComponent />
      <HomePage />
      
    </div>
  );
}

export default App;
