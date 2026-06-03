import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import GenrePage from './pages/GenrePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import Dashboard from './pages/Dashboard';
import { useApp } from './context/AppContext';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const NoApiKey = () => (
  <div className="no-api-key">
    <h1>CINEMAX</h1>
    <p>To run this app, you need a free TMDb API key. Create a <code>.env</code> file in the project root:</p>
    <code>
      REACT_APP_TMDB_API_KEY=your_key_here{'\n'}
      REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3{'\n'}
      REACT_APP_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
    </code>
    <p>Get your free API key at <strong>themoviedb.org/settings/api</strong></p>
  </div>
);

export default function App() {
  const location = useLocation();
  const { sidebarOpen } = useApp();

  if (!API_KEY) return <NoApiKey />;

  return (
    <div className="layout">
      <Sidebar />
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => {}} />}
      <div className="main-content">
        <Navbar />
        <div key={location.pathname} className="page-enter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/genre/:id/:name" element={<GenrePage />} />
            <Route path="/movie/:id" element={<DetailPage type="movie" />} />
            <Route path="/tv/:id" element={<DetailPage type="tv" />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
