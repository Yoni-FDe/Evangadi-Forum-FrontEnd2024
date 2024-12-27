import React from "react";
import classes from "./Header.module.css";
import logo from "../../assets/images/evangadi-logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../API/axios";
import { toast } from "react-toastify";

// react-redux
import { connect } from "react-redux";
// actions function
import { removeUser } from "../../Utility/action";

const Header = ({ removeUser }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Logout function to call the API and remove token from localStorage
  const logoutUser = async () => {
    try {
      // Send a DELETE request to the backend to handle logout
      const { data } = await axios.delete("/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      // If the response is successful, clear the JWT from localStorage
      if (data.success) {
        localStorage.removeItem("token");
        removeUser();

        navigate("/");
        toast.success(data.msg, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={classes.header__container}>
      <div className={classes.header__wrapper}>
        <div className={classes.header__logo}>
          <Link to="/dashboard"><img src={logo} alt="" /></Link>
          
        </div>
        <div className={classes.header__title}>
          <Link to="/dashboard"><p>Home</p></Link>
          <a href="https://www.evangadi.com/" target="_blank">
             <button>How it works</button>
            </a>
          {token && <button onClick={logoutUser}>logOut</button>}
          {!token && <a href="http://localhost:5173/" target="_blank"><button>SIGN IN</button></a>}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => dispatch(removeUser()),
  };
};

export default connect(null, mapDispatchToProps)(Header);