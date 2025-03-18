import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';
import { languages, levels, prices } from '../../../languages/info'; // Импортируем данные

const SearchBar = ({ onSearch }) => {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');
    const [price, setPrice] = useState('');

    // Функция для обработки изменения фильтров
    const handleFilterChange = (field, value) => {
        if (field === "language") {
            setLanguage(value);
        } else if (field === "level") {
            setLevel(value);
        } else if (field === "price") {
            setPrice(value);
        }

        onSearch({
            language: field === "language" ? value : language,
            level: field === "level" ? value : level,
            price: field === "price" ? value : price,
        });
    };

    return (
        <div className={s.container}>
            <div className={s.searchContainer}>
                <div className={s.langWrap}>
                    <p className={s.text}>Languages</p>
                    <select className={s.selectLang} value={language} onChange={(e) => handleFilterChange('language', e.target.value)}>
                        <option value="">French</option>
                        {languages.map(lang => (
                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                        ))}
                    </select>
                </div>

                <div className={s.levelsWrap}>
                    <p className={s.text}>Level of knowledge</p>
                    <select className={s.selectLevel} value={level} onChange={(e) => handleFilterChange('level', e.target.value)}>
                        <option value="">A1 Beginner</option>
                        {levels.map(lvl => (
                            <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                        ))}
                    </select>
                </div>

                <div className={s.praiseWrap}>
                    <p className={s.text}>Price</p>
                    <select className={s.selectPrice} value={price} onChange={(e) => handleFilterChange('price', e.target.value)}>
                        <option value="">30$</option>
                        {prices.map(prc => (
                            <option key={prc.value} value={prc.value}>{prc.label}</option>
                        ))}
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
