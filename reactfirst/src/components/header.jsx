import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import profile from '../components/bitmap.png';
import logo from '../components/Logo1.png';
import search from '../components/search.png'
import circle from '../components/circle.png'
import './Header.css';

library.add(faSearch, faPlus);

function Header({ toggleForm, onSearch, showProfile, setShowProfile }) {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchIconEnter = () => setSearchActive(true);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value);
    };

    const handleSearchBlur = () => setSearchActive(false);

    const toggleProfile = () => setShowProfile(!showProfile);

    return (
        <header className="header-container">
            <div className="logo12">
                <img src={logo} className='logo1' />
            </div>
            <div className="header-icons">
                {searchActive ? (
                    <input 
                        type="text" 
                        className="search-input" 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                        onBlur={handleSearchBlur} 
                        placeholder="What are you looking for?" 
                        autoFocus 
                    />
                ) : (
                    <img 
                        src={search}
                        className="icon" 
                        onMouseEnter={handleSearchIconEnter} 
                    />
                )}
                <img src={circle} className="icon" onClick={toggleForm} />
                <img src={profile} alt="profile" className='profile' onClick={toggleProfile} />
            </div>
        </header>
    );
}

export default Header;
