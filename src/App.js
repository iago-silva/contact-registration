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
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recover-passoword" element={<RecoverPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
