import React from 'react';
import "./NavBar.css"

const NavBar = () => {
  return (
    <div class="topnav" id="myTopNav">
        <a class="active" href="/search">Home</a>
        <a href="https://github.com/Afinch97/project1-afinch6">About</a>
        <a href="/favorites">Favorites</a>
        <div class="search-container">
            <form method="POST" action="/search">
                <input type="text" placeholder="Search..." name="search"></input>
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </div>
        <a href="/logout" class="Logout">Logout</a>
    </div>
  )
}

export default NavBar