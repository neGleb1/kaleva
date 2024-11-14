import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Header({ onSearch }) {

    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    const handleBurgerClick = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        fetch('categories.json')
            .then(response => response.json())
            .then(data => setCategories(data)).catch((e)=>{
                console.log(e);
            })
    }, []);

    return (
        <header style={{ display: 'flex', alignItems: 'center', padding: '1rem', color: '#fff' }}>
            <div onClick={handleBurgerClick} style={{ cursor: 'pointer', marginRight: '1rem' }}>
                <div style={{ width: '25px', height: '3px', backgroundColor: '#fff', margin: '4px 0' }} />
                <div style={{ width: '25px', height: '3px', backgroundColor: '#fff', margin: '4px 0' }} />
                <div style={{ width: '25px', height: '3px', backgroundColor: '#fff', margin: '4px 0' }} />
            </div>

            <h1 style={{ flexGrow: 1 }}>Net</h1>

            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ padding: '0.5rem', width: '200px' }}
            />

            <div style={{
                position: 'fixed',
                top: 0,
                left: menuOpen ? 0 : '-250px',
                width: '250px',
                height: '100%',
                backgroundColor: '#333',
                color: '#fff',
                padding: '1rem',
                boxShadow: menuOpen ? '2px 0 5px rgba(0, 0, 0, 0.2)' : 'none',
                transition: 'left 0.3s ease'
            }}>
                <h2 style={{ marginTop: 0 }}>Categories</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {categories.map((category, index) => (
                        <li key={index} style={{ padding: '0.5rem 0', cursor: 'pointer' }}>
                            {category.snippet.title}
                        </li>
                    ))}
                </ul>
            </div>

            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                />
            )}
        </header>
    );
}