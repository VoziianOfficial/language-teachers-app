import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import SearchBar from "../SearchBar/SearchBar";

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            const querySnapshot = await getDocs(collection(db, "teachers"));
            const teachersArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTeachers(teachersArray);
            setFilteredTeachers(teachersArray); // По умолчанию показываем всех преподавателей
        };

        fetchTeachers();
    }, []);

    const handleSearch = (filters) => {
        const { language, level, price } = filters;

        const filtered = teachers.filter((teacher) => {
            return (
                // Фильтрация по языку
                (!language || teacher.languages?.includes(language)) &&
                // Фильтрация по уровню
                (!level || teacher.levels?.some((teacherLevel) => teacherLevel === level)) &&
                // Фильтрация по цене
                (!price || teacher.price_per_hour <= Number(price))
            );
        });

        setFilteredTeachers(filtered);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <ul>
                {filteredTeachers.length === 0 && <p>Нет преподавателей, соответствующих фильтрам.</p>}
                {filteredTeachers.map((teacher) => (
                    <li key={teacher.id}>
                        <h3>{teacher.name} {teacher.surname}</h3>
                        <p>Price / 1 hour:  ${teacher.price_per_hour}</p>
                        <p>Speaks: {teacher.languages?.join(", ")}</p>
                        <p>{teacher.levels?.join(", ")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeachersList;

