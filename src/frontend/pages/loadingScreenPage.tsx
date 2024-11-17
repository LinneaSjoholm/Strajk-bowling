import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoadingScreen.css";
import { motion } from "framer-motion";

const LoadingScreenPage = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/booking");  
    };

    return (
        <div className="loading__screen">
            <motion.img
                className="loading__screen--image"
                src="Strajk-logo.png"
                alt="Strajk logo"
                onClick={handleLogoClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
            />
            <h1 className="loading__screen-title">Strajk</h1>
            <h3 className="loading__screen-body">bowling</h3>
        </div>
    );
};

export default LoadingScreenPage;
