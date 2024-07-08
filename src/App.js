import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import RecoverPassword from './pages/RecoverPassword.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ChangePassword from './pages/ChangePassword.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastrar" element={<Signup />} />
          <Route path="/recuperar-senha" element={<RecoverPassword />} />
          <Route path="/alterar-senha" element={<ChangePassword />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
