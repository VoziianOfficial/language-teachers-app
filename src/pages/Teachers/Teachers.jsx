import { useState, useEffect } from "react";
import SearchBar from "../../components/Teachers/SearchBar/SearchBar";
import TeachersList from "../../components/Teachers/TeachersList/TeachersList";
import { getAllFiltered } from "../../firebase/api";
import s from "./Teachers.module.css";

const Teachers = () => {
    // local state for values of search selects
    const [language, setLanguage] = useState(null);
    const [lvl, setLvl] = useState(null);
    const [price, setPrice] = useState(null);

    // local state for filtered teachers
    const [filtered, setFiltered] = useState(null);

    // Логируем изменения фильтров
    useEffect(() => {
        console.log("Current filters:", { language, lvl, price });
    }, [language, lvl, price]);

    useEffect(() => {
        const getFilteredTeachers = async () => {
            try {
                console.log("Fetching filtered teachers...");
                const filteredTeachers = await getAllFiltered(language, lvl, price);
                console.log("Filtered teachers:", filteredTeachers); // Логируем результат фильтрации
                setFiltered(filteredTeachers);
            } catch (error) {
                console.error("Error fetching filtered teachers:", error);
            }
        };

        getFilteredTeachers();
    }, [language, lvl, price]);

    return (
        <div className={s.container}>
            <SearchBar setLanguage={setLanguage} setLvl={setLvl} setPrice={setPrice} />
            <TeachersList filtered={filtered} lvl={lvl} />
        </div>
    );
};

export default Teachers;
