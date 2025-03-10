import { useState } from 'react';
import s from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const [languages, setLanguages] = useState('');
    const [levels, setLevels] = useState('');
    const [price, setPrice] = useState('');

    const handleSearch = () => {
        onSearch({
            language: languages,
            level: levels,
            price
        });
    };

    return (
        <div className={s.container}>
            <select value={languages} onChange={(e) => setLanguages(e.target.value)}>
                <option value="French">French</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Mandarin Chinese">Mandarin Chinese</option>

            </select>

            <select value={levels} onChange={(e) => setLevels(e.target.value)}>
                <option value="Beginner">A1 Beginner</option>
                <option value="Elementary">A2 Elementary</option>
                <option value="Intermediate">B1 Intermediate</option>
                <option value="Upper-Intermediate">B2 Upper-Intermediate</option>
                <option value="Advanced">C1 Advanced</option>
                <option value="Proficient">C2 Proficient</option>
            </select>

            <select value={price} onChange={(e) => setPrice(e.target.value)}>
                <option value="25">25</option>
                <option value="28">28</option>
                <option value="30">30</option>
                <option value="32">32</option>
                <option value="35">35</option>
            </select>

            <button onClick={handleSearch}>🔍 Поиск</button>
        </div>
    );
};

export default SearchBar;
