import React from "react";
import { NavLink } from "react-router-dom";
import icon from "../icon2.jpg";
import fb from "../fb.svg";
import ins from "../ins.png";

const NavBar = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top "
      style={{ color: "#505050" }}
    >
      <NavLink className="navbar-brand" to="/">
        <img src={icon} height="70" width="120" alt="icon"></img>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse row" id="navbarColor03">
        {/* <div className="collapse navbar-collapse row" id="navbarSupportedContent"> */}
        <ul className="navbar-nav mr-auto">
          <li className="nav-item mx-3">
            <form action="">
              <input
                id="searchInput"
                type="text"
                placeholder="Search..."
                className="rounded"
              ></input>
              <button
                id="searchBtn"
                className="rounded "
                type="submit"
                disabled
              >
                <i className="fa fa-search"></i>
              </button>
            </form>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          {!user && (
            <React.Fragment>
              <li>
                <a href="https://www.facebook.com/groups/928764668981161">
                  <img src={fb} alt="icon" height={36} width={36} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/univibe.us/">
                  <img src={ins} alt="icon" height={35} width={35} />
                </a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li>
                <a href="https://www.facebook.com/groups/928764668981161">
                  <img src={fb} alt="icon" height={36} width={36} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/univibe.us/">
                  <img src={ins} alt="icon" height={35} width={35} />
                </a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/me">
                  Hi {user.username}
                </NavLink>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  localStorage.removeItem("user");
                }}
              >
                <NavLink className="nav-link" to="/users/logout">
                  LogOut
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/logout">
                  Likes
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
