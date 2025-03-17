// src/components/Header.js
import { Link } from "react-router-dom";
import "./Header.css"; // Add styles

const Header = () => {
    return (
        <header className="header">
            <h1>🚀 Welcome to the Blog 🌟</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create Post</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
