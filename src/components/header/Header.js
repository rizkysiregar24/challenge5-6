import "./Header.css"
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";


const Header = ({token, setToken}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  
    return (
      <div className="header">
        <div className="headerLeft">
          <Link to="/">
            <img className="header__icon" src="https://images.creativemarket.com/0.1.0/ps/7414066/580/387/m2/fpnw/wm1/logo-design-for-movie-production-company-01-.jpg?1575502358&s=01c0e34a7a49aba80eeeee6e9703b8bc" />
          </Link>
        </div>
        <div className="container">
          <form className="search-bar"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${search}`);
            }}
          >
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="What Do You Want To Watch?" />
             
          </form>
        </div>
        <div className="auth-btns">
          {!token ? (
            <>
              <Link to="/auth/login">
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/auth/register">
                <button className="register-btn">Register</button>
              </Link>
            </>
          ) : (
            <button className="btn-log" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    );
}

export default Header