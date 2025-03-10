//src/pages/Teachers/Teachers.jsx
import TeachersList from "../../components/Teachers/TeachersList/TeachersList";

import s from './Teachers.module.css'

const Teachers = () => {


    return (
        <div className={s.pageTeachers}>

            <TeachersList />

        </div>
    );
};

export default Teachers;