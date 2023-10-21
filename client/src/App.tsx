import Login from 'components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from 'components/Registration';
import Dashboard from 'pages/Dashboard';
import { AuthContextProvider } from 'globals/context/auth';
import './App.css'
import ProtectedRoutes from 'components/ProtectedRoutes';

function App() {

  return (
    <AuthContextProvider>
      <main>
        <Router>
          <Routes>
            <Route path={'/'} element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/dashboard' element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            } />
          </Routes>
        </Router>
      </main>
    </AuthContextProvider>
  )
}

export default App
