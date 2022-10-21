import React, { useEffect, useState } from "react";
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieList from "../../components/movieList/movieList";

const Home = ({token}) => {
    const [ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4154ff81a5f8bae0d54b1f74964cf7db&language=en-US&page=1")
        .then((res) => res.json())
        .then((data) => setPopularMovies(data.results));
    }, [])

    return (
      <>
        <div className="poster">
          <Carousel showThumbs={false} autoPlay={true} transitionTime={3} infiniteLoop={true} showStatus={false}>
            {popularMovies.map((movie) => (
              <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                <div className="posterImage">
                  <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">{movie ? movie.original_title : ""} </div>
                  <div className="posterImage__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="posterImage__rating">
                      {movie ? movie.vote_average : ""}
                      <FontAwesomeIcon icon="fa-solid fa-star" />{" "}
                    </span>
                  </div>
                  <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                </div>
              </Link>
            ))}
          </Carousel>
          <MovieList />
        </div>
      </>
    );
}

export default Home 