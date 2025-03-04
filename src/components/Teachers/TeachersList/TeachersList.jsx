import { useEffect, useState } from "react";
import TeacherItem from "../TeacherItem/TeacherItem";
import { getAllTeachers } from "../../../firebase/api";
import NoFindTeacher from "../NoFindTeacher/NoFindTeacher";
import s from './TeachersList.module.css'


const ListTeachers = ({ filtered, lvl }) => {
    const [teachersPerPage, setTeachersPerPage] = useState(4);
    const [favoritesPerPage, setFavoritesPerPage] = useState(4);
    const [teachers, setTeachers] = useState(null);

    useEffect(() => {
        const getTeachersData = async () => {
            let teachersData = await getAllTeachers(teachersPerPage);
            setTeachers(teachersData);
        };
        getTeachersData();
    }, [teachersPerPage]);

    const handleShowMore = () => {
        setTeachersPerPage((prev) => (prev += 4));
    };

    const favoritesShowMore = () => {
        setFavoritesPerPage((prev) => (prev += 4));
    };

    return (
        <div className={s.container}>
            <div className={s.list}>
                {filtered
                    ? filtered?.slice(0, favoritesPerPage)?.map((teach, index) => (
                        <TeacherItem key={index} teach={teach} lvl={lvl} />
                    ))
                    : teachers?.map((teach, index) => (
                        <TeacherItem key={index} teach={teach} lvl={lvl} />
                    ))}
                {filtered?.length === 0 && <NoFindTeacher />}
            </div>
            {(teachers?.length < 30 && !filtered) && (
                <button className={s.showMoreBtn} type="button" onClick={handleShowMore}>
                    Show more
                </button>
            )}
            {filtered?.length > favoritesPerPage && (
                <button className={s.showMore} type="button" onClick={favoritesShowMore}>
                    Show more
                </button>
            )}
        </div>
    );
};

export default ListTeachers;