import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams, useNavigate } from "react-router-dom";

const Movie = ({ token }) => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [currentMovieDetail, setMovie] = useState();

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4154ff81a5f8bae0d54b1f74964cf7db&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };
  
  useEffect(() => {
    if (!token) {
      alert('You need to login first!')
      navigate("/auth/login");
    } else {
      getData();
      window.scrollTo(0, 0);
    }
  }, []);


  return (
    <div className="movie">
      <div className="movie__intro">
        <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i class="fas fa-star" />
              <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
            </div>
            <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
            <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Detail Movie</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
