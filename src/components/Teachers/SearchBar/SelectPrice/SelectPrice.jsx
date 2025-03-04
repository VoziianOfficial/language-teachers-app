import Select from 'react-select';
import PropTypes from 'prop-types';
import { prices } from "../../../../languages/info";
import s from './SelectPrice.module.css';

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

const SelectPrice = ({ setPrice }) => {
    const handleChange = (e) => {
        setPrice(e ? e.value : null);
    };

    const placeholder = prices.length > 0 ? prices[0].label : "$/hour";

    return (
        <div className={s.searchContainer}>
            <div className={s.selectContainer}>
                <label className={s.labelSelect} htmlFor="price">Price</label>
                <Select
                    options={prices}
                    placeholder={placeholder}
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

SelectPrice.propTypes = {
    setPrice: PropTypes.func.isRequired,
};

export default SelectPrice;
