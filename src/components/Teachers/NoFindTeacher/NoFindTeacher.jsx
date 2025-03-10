// import bookImg from '../../../img/book.webp';
import s from './NoFindTeacher.module.css'

const NoFindTeacher = () => {
    return (
        <div className={s.noFindTeacher}>
            {/* <img src={bookImg} alt="Open book with glasses" /> */}
            <p>No find any teacher by these parameters</p>
        </div>
    )
}

export default NoFindTeacher;