import PropTypes from 'prop-types';
import Select from "react-select";
import { levels } from "../../../../languages/info";
import s from './SelectLevel.module.css'

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

const SelectLevel = ({ setLvl }) => {
    const handleChange = (e) => {
        setLvl(e ? e.value : null);
    };

    return (
        <div className={s.levelContainer}>
            <div className={s.levelWrap}>
                <label htmlFor="langs" className={s.labelLevel}>Level of knowledge</label>
                <Select
                    options={levels}
                    placeholder="Level"
                    onChange={handleChange}
                    maxMenuHeight={272}
                    className={s.selectControl}
                    isClearable={true}
                    styles={customStyles}
                />
            </div>
        </div>
    );
};


SelectLevel.propTypes = {
    setLvl: PropTypes.func.isRequired,
};

export default SelectLevel;
