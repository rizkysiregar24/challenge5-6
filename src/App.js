import {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Login from './pages/auth/login/login'
import Register from './pages/auth/register/register'
import Search from './components/search/search';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  return (
    <div className="App">
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie token={token} />}></Route>
          <Route path="movie/:type" element={<MovieList />}></Route>
          <Route path="/*" element={<h1>Error page</h1>}></Route>
          <Route path="/auth/login" element={<Login token={token} setToken={setToken} />}></Route>
          <Route path="/auth/register" element={<Register token={token} setToken={setToken} />}></Route>
          <Route path="search" element={<Search />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
