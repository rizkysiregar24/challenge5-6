import React, {useEffect, useState}  from "react";
import { useSearchParams } from "react-router-dom";


function Search(){
const [searchResult, setSearchResult] = useState(null);
console.log(searchResult)
const [searchParams, setSearchParams] = useSearchParams();

const query = searchParams.get("q");

const SEARCH_MOVIE_URL = `https://api.themoviedb.org/3/search/movie?api_key= 4154ff81a5f8bae0d54b1f74964cf7db&query=${query}&include_adult=false`;

useEffect(() => {
  const getData = async () => {
    const response = await fetch(SEARCH_MOVIE_URL);
    const result = await response.json();
    setSearchResult(result.results);
  };
  getData();
}, [query]);

}

export default Search
