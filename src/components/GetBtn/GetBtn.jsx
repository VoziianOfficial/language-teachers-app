import s from './GetBtn.module.css';
import { Link } from "react-router-dom";

const GetBtn = () => {
    return (
        <div className={s.GetBtnContainer}>
            <Link to="/teachers">
                <button className={s.getBtn}>Get started</button>
            </Link>

        </div>
    )
}

export default GetBtn;
