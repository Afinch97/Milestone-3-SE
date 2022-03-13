import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styleMovie.css";

const Movie = () => {
    const { movieId } = useParams
    let url = window.location.pathname
    const[justTesting, setJustTestint]= useState({})
    const[areReviews, setAreReviews] = useState(false)
    const[genres, setGenres] = useState([])
    const [title, setTitle] = useState("")
    const [id, setId] = useState()
    const [poster, setPoster] = useState("")
    const [tagline, setTagline] = useState("")
    const [overview, setOverview] = useState("")
    const [releaseDate, setReleaseDate] = useState()
    const [user, setUser] = useState([])
    const [rating, setRating] = useState([])
    const [text, setText] = useState([])
    const [reviewLength, setReviewLength] = useState()
    const [startForm, setStartForm] = useState("Be the first to write a review:")

    const getRepo = async () =>{
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setJustTestint(data)
                setTitle(data.title)
                setId(data.id)
                setPoster(data.poster)
                setTagline(data.tagline)
                setOverview(data.overview)
                setPoster(data.poster)
                setReleaseDate(data.release_date)
                setGenres(data.genres)
                if(data.reviews === "true"){
                    setAreReviews(true)
                    setUser(data.user)
                    setRating(data.rating)
                    setText(data.text)
                    setReviewLength(data.rev_length)
                    setStartForm("Write a Review:")
                }
        
            });        
    };
    useEffect(() => getRepo(), []);
    console.log(justTesting, areReviews, genres, title, id, poster, tagline, overview, releaseDate, user, rating, text, reviewLength)
    console.log(reviewLength)
    const reviews = []
    if (areReviews === true){
        for (let i=0; i<reviewLength; i++){
            reviews.push(
                <>
                <div class="name_and_rating">
                    {console.log(user)}
                    {console.log(rating)}
                    {console.log(user[i])}
                    {console.log(rating[i])}
                    <h3>{user[i]}: {rating[i]}</h3>
                </div>
                <div class="review_text">
                   {text[i]}
                </div><br></br>
                </>
            )
        }
    }

    return (
    <>
    <h2>{title}</h2>
    <form action="/add/{{id}}">
        <input type="submit" value="Add to Favorites"/>
    </form>
    <div class="movieInfo">
        <div class="poster">
            <img src={poster} />
        </div>
        <div class="details">
            <div class="title">{title}</div> {releaseDate}<br/>
            {tagline}<br/>
            {genres}<br/><br/>
            {overview}<br/>
        </div>
    </div>
    <div class="reviews">
        {areReviews === true &&
            <>
            <h2>Reviews:</h2>
            {reviews}
            </>
        }
        <form method="POST" action="/movie/{{id}}" class="reviewbox">
        <h2>{startForm}</h2>
        <label for="rating">Rate the movie out of 10: </label><input type="number" name="rating" min="0" max="10"/><br></br>
        <label for="text">Review: </label><input type="text" name="textReview" size="60"/><br></br>
        <button type="submit">Submit Review</button>
        </form>
    </div>
    </>
  );
};

export default Movie;