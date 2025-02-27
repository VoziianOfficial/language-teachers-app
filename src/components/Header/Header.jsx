import s from './Header.module.css';
import logo from '../../assets/logo.svg';
import loginIcon from '../../assets/log-in-01.svg' // Імпортуємо іконку
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="container">
            <header className={s.headerContainer}>
                <div className={s.logoContainer}>
                    <img src={logo} alt="LearnLingo Logo" className={s.logoImg} />
                    <p className={s.logoText}>LearnLingo</p>
                </div>

                <nav className={s.navContainer}>
                    <Link to="/" className={s.navLink}>Home</Link>
                    <Link to="/teachers" className={s.navLink}>Teachers</Link>
                </nav>

                <nav className={s.registerContainer}>
                    <Link to="/login" className={s.authLink}>
                        <img src={loginIcon} alt="Login" className={s.icon} />
                        Log in
                    </Link>
                    <Link to="/register"><button className={s.registerLink}>Registration</button></Link>
                </nav>
            </header>
        </div>
    );
};

export default Header;
