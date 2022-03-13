import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import {About, Home, Register, Search, Movie}from './components';

const App = () => {
 
  return (
    <>
    <div className="App">
    <Search />
    </div>
    </>
  );
}

export default App
