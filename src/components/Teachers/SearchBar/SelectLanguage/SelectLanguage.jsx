import PropTypes from 'prop-types';
import Select from "react-select";
import { languages } from '../../../../languages/info';
import s from './SelectLanguage.module.css'

const customStyles = {
    control: (provided) => ({
        ...provided,
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        minHeight: 'auto',
        outline: 'none',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: 0,
    }),
};

const SelectLanguage = ({ setLanguage }) => {

    const handleChange = (e) => {
        if (e === null) {
            setLanguage(null);
            return;
        } else {
            setLanguage(e.value);
        }
    };

    return (
        <div className={s.searchContainer}>
            <div className={s.selectContainer}>
                <label htmlFor="langs" className={s.labelSelect}>Languages</label>
                <Select
                    options={languages}
                    placeholder={"Language"}
                    onChange={handleChange}
                    maxMenuHeight={272}
                    isClearable={true}
                    className={s.selectControl}
                    styles={customStyles}
                />
            </div>
        </div>
    );
};

SelectLanguage.propTypes = {
    setLanguage: PropTypes.func.isRequired,
};

export default SelectLanguage;
