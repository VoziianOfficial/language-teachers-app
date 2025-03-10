import { useState, } from 'react';
import s from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const [languages, setLanguages] = useState('');
    const [levels, setLevels] = useState('');
    const [price, setPrice] = useState('');

    // Функция для обработки изменения фильтров
    const handleFilterChange = (field, value) => {
        if (field === "languages") {
            setLanguages(value);
        } else if (field === "levels") {
            setLevels(value);
        } else if (field === "price") {
            setPrice(value);
        }

        onSearch({
            language: field === "languages" ? value : languages,
            level: field === "levels" ? value : levels,
            price: field === "price" ? value : price,
        });
    };

    return (
        <div className={s.container}>
            <select value={languages} onChange={(e) => handleFilterChange('languages', e.target.value)}>
                <option value="">Все языки</option>
                <option value="French">French</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Mandarin Chinese">Mandarin Chinese</option>
            </select>

            <select value={levels} onChange={(e) => handleFilterChange('levels', e.target.value)}>
                <option value="">Все уровни</option>
                <option value="A1 Beginner">A1 Beginner</option>
                <option value="A2 Elementary">A2 Elementary</option>
                <option value="B1 Intermediate">B1 Intermediate</option>
                <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
                <option value="C1 Advanced">C1 Advanced</option>
                <option value="C2 Proficient">C2 Proficient</option>
            </select>

            <select value={price} onChange={(e) => handleFilterChange('price', e.target.value)}>
                <option value="">Все цены</option>
                <option value="25">25</option>
                <option value="28">28</option>
                <option value="30">30</option>
                <option value="32">32</option>
                <option value="35">35</option>
            </select>
        </div>
    );
};

export default SearchBar;

