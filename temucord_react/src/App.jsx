import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para el Registro */}
        <Route path="/register" element={<Register />} />

        {/* Ruta para el Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;