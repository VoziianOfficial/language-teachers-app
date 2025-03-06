import { useState, useEffect } from "react";
import TeachersList from "../../components/Teachers/TeachersList/TeachersList";
import SearchBar from "../../components/Teachers/SearchBar/SearchBar";
import s from './Teachers.module.css'

const Teachers = () => {
    const [language, setLanguage] = useState(null);
    const [lvl, setLvl] = useState(null);
    const [price, setPrice] = useState(null);
    const [filtered, setFiltered] = useState(null);

    useEffect(() => {
        const getFilteredTeachers = async () => {
            try {
                const filteredTeachers = await getAllFiltered(language, lvl, price);
                setFiltered(filteredTeachers);
            } catch (error) {
                console.error("Error fetching filtered teachers:", error);
            }
        };

        getFilteredTeachers();
    }, [language, lvl, price]);

    return (
        <div className={s.pageTeachers}>
            <div className={s.pageCont}>
                <SearchBar
                    setLanguage={setLanguage}
                    setLvl={setLvl}
                    setPrice={setPrice}
                />
                <TeachersList filtered={filtered} lvl={lvl} />
            </div>
        </div>
    );
};

export default Teachers;