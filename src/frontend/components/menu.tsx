import React from "react";

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="menu">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
            {isMenuOpen && (
                <div className="menu__open">
                    <ul>
                        <li>Booking</li>
                        <li>Confirmation</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Menu;