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
            setFilteredTeachers(teachersArray);
        };

        fetchTeachers();
    }, []);

    const handleSearch = (filters) => {
        const { language, level, price } = filters;

        const filtered = teachers.filter((teacher) => {
            return (
                (!language || teacher.languages?.includes(language)) &&  // Учитываем массив
                (!level || teacher.levels?.includes(level)) &&  // Учитываем массив
                (!price || teacher.price_per_hour <= Number(price))  // Используем корректное название
            );
        });

        setFilteredTeachers(filtered);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <ul>
                {filteredTeachers.map((teacher) => (
                    <li key={teacher.id}>
                        <h3>{teacher.name} {teacher.surname}</h3>
                        <p>Языки: {teacher.languages?.join(", ")}</p>  {/* Отображаем массив */}
                        <p>Уровни: {teacher.levels?.join(", ")}</p>  {/* Отображаем массив */}
                        <p>Цена: ${teacher.price_per_hour}</p>  {/* Используем правильный ключ */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeachersList;