import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {About, Home, Register, Search, Movie}from './components';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/movie/:MovieId" element={<Movie />}></Route>
    </Routes>
  </Router>,

  document.getElementById("root")
);

