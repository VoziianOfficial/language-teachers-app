import FormUser from "./FormUser/FormUser";
import s from './BookForm.module.css'

const BookForm = ({ name, surname, avatar_url, setShowBookModal }) => {
    return (
        <div>
            <div className={s.titleForm}>Book trial lesson</div>
            <p className={s.paragraph}>
                Our experienced tutor will assess your current language level, discuss
                your learning goals, and tailor the lesson to your specific needs.
            </p>
            <div className={s.infoTeacher}>
                <img src={avatar_url} alt="avatar of teacher" width={44} height={44} />
                <div>
                    <p>Your teacher</p>
                    <span>{name} {surname}</span>
                </div>
            </div>
            <FormUser setShowBookModal={setShowBookModal} />
        </div>
    );
};

export default BookForm;