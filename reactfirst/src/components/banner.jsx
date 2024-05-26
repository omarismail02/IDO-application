
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './banner.css'

library.add(faTimes, faExclamationCircle);
function Banner() {
    const [showBanner, setShowBanner] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const toggleBanner = () => {
        setShowBanner(!showBanner);
    };
    
    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    return (
        <>
            <div className="banner-container">
            {showBanner ? (
                <div className="banner" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    "Anything that can go wrong, will go wrong!"
                    {isHovered && <FontAwesomeIcon icon={faTimes} className="close-icon0" onClick={toggleBanner} />}
                </div>
            ) : (
                <FontAwesomeIcon icon={faExclamationCircle} className="exclamation-icon" onClick={toggleBanner} />
            )}
        </div>
        </>
    );
}

export default Banner;
