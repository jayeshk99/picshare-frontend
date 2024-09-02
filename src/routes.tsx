import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import { HomePage, FavouritesPage, Login } from './pages';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};
