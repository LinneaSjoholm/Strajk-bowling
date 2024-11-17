import React from "react";
import "../styles/navbar.css";

interface NavbarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMenu, isMenuOpen }) => {
  return (
    <nav className="navbar">
      <img 
        src={isMenuOpen ? "close.png" : "menu.png"} 
        alt={isMenuOpen ? "close" : "menu"}
        className="menu-icon"
        onClick={toggleMenu}  
      />
    </nav>
  );
};

export default Navbar;
