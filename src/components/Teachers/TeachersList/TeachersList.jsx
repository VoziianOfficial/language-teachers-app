import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import SearchBar from "../SearchBar/SearchBar";
import NoFindTeacher from '../NoFindTeacher/NoFindTeacher';
import s from './TeachersList.module.css'


const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const teachersPerPage = 5;

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
                (!language || teacher.languages?.includes(language)) &&
                (!level || teacher.levels?.some((teacherLevel) => teacherLevel === level)) &&
                (!price || teacher.price_per_hour <= Number(price))
            );
        });

        setFilteredTeachers(filtered);
        setCurrentPage(1);
    };

    // Логика пагинации
    const indexOfLastTeacher = currentPage * teachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
    const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {currentTeachers.length === 0 ? (
                <NoFindTeacher />
            ) : (
                <ul className={s.teacherList}>
                    {currentTeachers.map((teacher) => (
                        <li className={s.teacherItem} key={teacher.id}>
                            <div className={s.wrapContainer}>
                                <div className={s.nameWrap} style={{ display: "flex", alignItems: "center" }}>
                                    <img src={teacher.avatar_url} alt={teacher.name} style={{ width: 60, height: 60, borderRadius: "50%", marginRight: 10 }} />
                                    <div className={s.nameContent}>
                                        <p className={s.Languages}>Languages</p>
                                        <h3>{teacher.name} {teacher.surname}</h3>
                                    </div>
                                </div>
                                <div className={s.infoWrap}>
                                    <p className={s.textWithIcon}>
                                        <img src="/src/assets/icons/book-open.svg" alt="Online lessons icon" width="16" height="16" />
                                        Lessons online
                                    </p>
                                    <span className={s.span}>|</span>
                                    <p className={s.textStyles}><strong className={s.textStyles}>Lessons Done:</strong> {teacher.lessons_done}</p>
                                    <span className={s.span}>|</span>
                                    <p className={s.textStyles}><img className={s.imgStar} src="/src/assets/icons/Star 2.svg" alt="" /><strong className={s.textStyles}>Rating:</strong> {teacher.rating}</p>
                                    <span className={s.span}>|</span>
                                    <p className={s.textStylesPrise}>
                                        <strong className={s.textStyles}>Price / 1 hour:</strong>
                                        <span className={s.priceValue}> ${teacher.price_per_hour}</span>
                                    </p>

                                </div>
                            </div>

                            <p><strong>Speaks:</strong> {teacher.languages?.join(", ")}</p>
                            <p><strong>Levels:</strong> {teacher.levels?.join(", ")}</p>
                            <p><strong>Experience:</strong> {teacher.experience}</p>
                            <p><strong>Lesson Info:</strong> {teacher.lesson_info}</p>
                            <p><strong>Conditions:</strong> {teacher.conditions?.join(", ")}</p>
                            <div>
                                <h4>Reviews:</h4>
                                {teacher.reviews?.map((review, index) => (
                                    <div key={index}>
                                        <p><strong>{review.reviewer_name}:</strong> {review.comment} ({review.reviewer_rating} stars)</p>
                                    </div>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Пагинация */}
            {/* <div>
                {[...Array(Math.ceil(filteredTeachers.length / teachersPerPage))].map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div> */}
        </div>

    );
};

export default TeachersList;
