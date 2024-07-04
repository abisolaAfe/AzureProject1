

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import "../Styling/LogoutModal.css";
import LogoutModal from "./LogoutButton";

const NavBar = () => {
    const isAuthenticated = useIsAuthenticated();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    }

    const handleCloseModal = () => {
        setShowLogoutModal(false);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">CLoud App</Link>
                    <Link className="navbar-brand" to="/description">Description</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            {isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/fileViews">FileShare</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/upload">Create</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/blobs">Posts</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        {isAuthenticated && (
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <div className="nav-link" style={{ cursor: "pointer" }} onClick={handleLogoutClick}>
                                        Logout
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            <LogoutModal show={showLogoutModal} handleClose={handleCloseModal} />
        </>
    );
};

export default NavBar;




