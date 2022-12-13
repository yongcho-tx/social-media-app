import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Auth from './components/Auth.js'
import Navbar from './components/Navbar.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import { UserContext } from './context/UserProvider.js'
import ProtectedRoute from './components/ProtectedRoute.js'

export default function App() {

  const { token, logout } = useContext(UserContext)
  return (
    <div>
      {/* if token exists, navbar will show */}
      { token && <Navbar logout={logout}/> }
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/profile" /> : <Auth /> }
        />
        <Route 
          path="/profile"
          element={<ProtectedRoute token={token} redirectTo="/">
              <Profile/>
          </ProtectedRoute>}
        />
        <Route 
          path="/public"
          element={<ProtectedRoute token={token} redirectTo="/">
              <Public/>
            </ProtectedRoute>}
        />
      </Routes>
    </div>

  );
}

