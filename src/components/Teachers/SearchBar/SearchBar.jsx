import SelectLevel from "./SelectLevel/SelectLevel";
import SelectLanguage from "./SelectLanguage/SelectLanguage";
import SelectPrice from "./SelectPrice/SelectPrice";
import s from './SearchBar.module.css';

const SearchBar = ({ setLanguage, setLvl, setPrice }) => {
    return (
        <div className="container">
            <div className={s.SearchBar}>
                <SelectLanguage setLanguage={setLanguage} />
                <SelectLevel setLvl={setLvl} />
                <SelectPrice setPrice={setPrice} />
            </div>
        </div>
    );
};

export default SearchBar;
