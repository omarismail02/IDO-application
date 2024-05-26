import React, { useState } from 'react';
import Header from '../components/header';
import Banner from '../components/banner'; 
import TaskLists from '../components/status'
import Listing from './listing';
import Logout from './logout';
import TaskManager from './addTask';
import './lists.css';

function HomePage() {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfile, setShowProfile] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="home-page">
            <Header toggleForm={toggleForm} onSearch={handleSearch} showProfile={showProfile} setShowProfile={setShowProfile}/>
            {showProfile &&( <Logout />)}
            <Banner />
            {showForm && (
                <div className={showForm ? 'modal-overlay active' : 'modal-overlay'}>
                    <TaskManager onClose={handleCloseForm} />
                </div>
            )}
            <Listing searchQuery={searchQuery} />
        </div>
    );
}

export default HomePage;
