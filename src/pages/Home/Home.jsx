import { Link } from 'react-router-dom'
import s from './Home.module.css'

const Home = () => {
    return (
        <div className={s.container}>
            <h1>Unlock your potential with the best  language tutors</h1>
            <p>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
            <Link to="/teachers">
                <button>Get started</button>
            </Link>

        </div>
    )
}

export default Home
