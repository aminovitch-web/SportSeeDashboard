import React from "react";
import './_Header.css';
import { Link } from "react-router-dom";
import logo from "../../assets/images/Header/logo.png";

export default function Header() {
    return (
        <>
            <div id="header">
                <div className="header_left">
                    <img src={logo} alt="logo"></img>SportSee
                </div>
                <div className="header_right">
                    <ul>
                        <Link to={`/`}>Accueil</Link>
                        <Link to={`/`}>Profil</Link>
                        <Link to={`/`}>Réglages</Link>
                        <Link to={`/`}>Communauté</Link>
                    </ul>
                </div>
            </div>
        </>
    );
}

