import { useState } from 'react';
import PropTypes from 'prop-types';
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
            <div className={s.searchContainer}>
                <div className={s.langWrap}>
                    <p className={s.text}>Languages</p>
                    <select value={languages} onChange={(e) => handleFilterChange('languages', e.target.value)}>
                        <option value="French">French</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                        <option value="Italian">Italian</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Mandarin Chinese">Mandarin Chinese</option>
                    </select>
                </div>

                <div className={s.levelsWrap}>
                    <p className={s.text}>Levels</p>
                    <select value={levels} onChange={(e) => handleFilterChange('levels', e.target.value)}>
                        <option value="A1 Beginner">A1 Beginner</option>
                        <option value="A2 Elementary">A2 Elementary</option>
                        <option value="B1 Intermediate">B1 Intermediate</option>
                        <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
                        <option value="C1 Advanced">C1 Advanced</option>
                        <option value="C2 Proficient">C2 Proficient</option>
                    </select>
                </div>

                <div className={s.praiseWrap}>
                    <p className={s.text}>Price per hour</p>
                    <select value={price} onChange={(e) => handleFilterChange('price', e.target.value)}>
                        <option value="25">25</option>
                        <option value="28">28</option>
                        <option value="30">30</option>
                        <option value="32">32</option>
                        <option value="35">35</option>
                    </select>
                </div>
            </div>
        </div>
    );
};


SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
