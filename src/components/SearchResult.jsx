import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./searchStyle.css";

const SearchResult = () =>  {
    let { query } = useParams();
    let url = window.location.pathname
    const [title, setTitle] = useState("")
    const [ids, setIds] = useState([])
    const [posters, setPosters] = useState([])
    const [taglines, setTaglines] = useState([])
    const [titles, setTitles] = useState([])
    const [fav, setFav ] = useState()
    const items= [];
    const getRepo = async () =>{
        await fetch(`/search/${query}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.ids)
                setTitle(data.title)
                setIds(data.ids)
                setPosters(data.posters)
                setTaglines(data.taglines)
                setTitles(data.titles)

            });        
    };
    useEffect(() => getRepo(), []);
    console.log(title, ids, titles, posters, taglines)
    const Add = (e) =>{
        e.preventDefault();
        fetch(`/add/${e}`)
    }

    for (let i = 0; i < 10; i++) {
        items.push(
            <div class='item'>
                <p><h2>({i+1}) {titles[i] }</h2>
                <Link to={`/${ids[i]}`}><input type="submit" value="More info"/></Link>
                </p>
                <img src={String(posters[i])} />
                <p>{ taglines[i] }</p>
                <button onClick={() => Add(ids[i])}>Add to Favorites</button>
            </div>
        )

    }
     return (
        <>
        <h1>{title} Movies</h1>
        <div class='container'>
            {items}
        </div>
        </>
    )
}

export default SearchResult