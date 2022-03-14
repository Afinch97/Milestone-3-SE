import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {About, Home, Register, Search, SearchResult, Movie, NavBar, Favorites}from './components';

ReactDOM.render(
  <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    </Routes>
    <NavBar />
    <Routes>
      <Route path="/searchy" element={<Search />} />
      <Route path="/searchy/:query" element={<SearchResult />} />
      <Route path="/info/:movieId" element={<Movie />} />
      <Route path="/favs" element={<Favorites />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

