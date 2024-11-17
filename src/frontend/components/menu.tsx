import React from "react";
import Navbar from "../components/navBar";
import { Link } from "react-router-dom";
import "../styles/menu.css";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu">
      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      {isMenuOpen && ( 
        <div className="menu__open">
          <ul>
            <li>
              <Link to="/booking">Booking</Link>
            </li>
            <li>
              <Link to="/confirmation">Confirmation</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
