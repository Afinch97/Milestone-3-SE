import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./searchStyle.css";

const Favorites = () =>  {
    const [title, setTitle] = useState("Favorite")
    const [ids, setIds] = useState([])
    const [posters, setPosters] = useState([])
    const [taglines, setTaglines] = useState([])
    const [titles, setTitles] = useState([])
    const [length, setLength] = useState()
    const [test, setTest] = useState({})
    const [there, setThere] = useState(false)
    const items= [];
    const getRepo = async () =>{
        console.log("fetching")
        await fetch(`/favorites`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTest(data)
                setLength(data.fav_length)
                setIds(data.fav_ids)
                setPosters(data.fav_posters)
                setTaglines(data.fav_taglines)
                setTitles(data.fav_titles)
                setThere(true)
            });        
    };
    useEffect(() => getRepo(), []);
    if (there === true){
        console.log(test)
        console.log(title, ids, titles, posters, taglines, length)
    }

    for (let i = 0; i < length; i++) {
        items.push(
            <div class='item'>
                <p><h2>({i+1}) {titles[i] }</h2>
                <Link to={`/${ids[i]}`}><input type="submit" value="More info"/></Link>
                </p>
                <img src={String(posters[i])} />
                <p>{ taglines[i] }</p>
                <form action={String(`/remove/${ids[i]}`)}>
                    <input type="submit" value="Remove From Favorites"/>
                </form>
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

export default Favorites;