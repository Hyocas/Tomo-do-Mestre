import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CampaignPage from './pages/CampaignPage.jsx';
import ProtectedPage from './components/ProtectedPage.jsx';
import ThemeToggleButton from './components/ThemeToggleButton';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-container">
          <ThemeToggleButton />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route 
              path="/campanhas" 
              element={
                <ProtectedPage>
                  <CampaignPage />
                </ProtectedPage>
              } 
            />

            <Route path="/" element={<Navigate to="/register" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}