import React from 'react';
import './App.css';
import LoginForm from './pages/LogInForm';
import Menu from './components/Menu'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <div className="Menu">
        <LoginForm />
        {/* <Header />
        <Menu /> */}
    </div>
  );
}

export default App;
