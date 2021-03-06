import { Link, NavLink, useNavigate } from "react-router-dom";
import FilterInput from "../FilterInput/FilterInput";
import codepath from "../../assets/codepath.svg";
import "./Navbar.css";

export default function Navbar({
  filterInputValue,
  handleOnInputChange,
  user,
  setUser,
  handleOnLogout,
}) {
  const isAuthenticated = Boolean(user?.email);

  const buttons = isAuthenticated ? (
    <>
      <div className="btn-logout">
        <button className="btn primary signout" onClick={handleOnLogout}>
          Sign out
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="btns-normal">
        <Link to="/register">
          <button className="btn primary register">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn secondary login">Sign in</button>
        </Link>
      </div>
    </>
  );
  return (
    <nav className="Navbar">
      <Link className="logo" to="/">
        <img src={codepath} alt="logo" />
      </Link>

      <div className="contents">
        <div className="links">
          <ul>
            <li>
              <NavLink to="/activity">Activity</NavLink>
            </li>
            <li>
              <NavLink to="/exercise">Exercise</NavLink>
            </li>
            <li>
              <NavLink to="/nutrition">Nutrition</NavLink>
            </li>
            <li>
              <NavLink to="/sleep">Sleep</NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* If we are logged in, render the logout, otherwise use the normal buttons */}
      <div className="buttons">{buttons}</div>
    </nav>
  );
}
