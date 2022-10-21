import React, {useEffect, useState} from "react";
import "./movieList.css"
import { useParams } from "react-router-dom";
import Cards from "../card/card";


const MovieList = () => {

    const [movieList, setMovieList] = useState ([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    },[type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4154ff81a5f8bae0d54b1f74964cf7db&language=en-US&page=1`)
          .then((res) => res.json())
          .then((data) => setMovieList(data.results));
    }
    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "Popular Movie").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList 