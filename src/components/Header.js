import React, { useEffect, useState } from "react";
import "../dist/css/tabler.min.css?1684106062";
import "../dist/css/tabler-flags.min.css?1684106062";
import "../dist/css/tabler-payments.min.css?1684106062";
import "../dist/css/tabler-vendors.min.css?1684106062";
import "../dist/css/demo.min.css?1684106062";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import myImage from "../static/logo.jpg";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Notification from "./Notification";
import Avatar from '@mui/material/Avatar';
import Bell from "./Bell";
import axios from "axios";
import Bellicon from "./Bellicon";
// import "./styles/header.css"


function Header({ name, designation}) {


 
  useEffect(() => {
   fetchRequestDetails();
   fetchRequestGDetails();
  }, []);
  const [requestData, setRequestData] = useState([]);
  const [requestGData, setRequestGData] = useState([]);

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/requestData");
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const fetchRequestGDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/requestgData"
      );
      setRequestGData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div>
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img
                src={myImage}
                width="110"
                height="32"
                alt="Start-Up Sahay"
                className="navbar-brand-image"
              />
            </a>
          </h1>
          <div style={{display:"flex" , alignItems:"center"}} className="navbar-nav flex-row order-md-last">
          <Bellicon data={requestData} gdata = {requestGData}/>
          <Avatar sx={{ width: 32, height: 32 }}/>
            <div className="nav-item dropdown">
              <button
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                
                <div className="d-xl-block ps-2">
                  <div>{name ? name : "Username"}</div>
                  <div style={{textAlign:"left"}} className="mt-1 small text-muted">
                    {designation ? designation : "Admin"}
                  </div>
                </div>
              </button>



              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="#" className="dropdown-item">
                  Status
                </a>
                <a href="#" className="dropdown-item">
                  Profile
                </a>
                <a href="#" className="dropdown-item">
                  Feedback
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  Settings
                </a>
                <a href="#" className="dropdown-item">
                  Logout
                </a>
              </div>
            </div>
            <Notification/>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="item"
            >
              
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
