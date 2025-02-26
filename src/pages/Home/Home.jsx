
import GetBtn from '../../components/GetBtn/GetBtn'
import Header from '../../components/Header/Header'
import s from './Home.module.css'

const Home = () => {
    return (
        <div className={s.HomeContainer}>
            <Header />
            <h1>Unlock your potential with the best  language tutors</h1>
            <p>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
            <GetBtn />

        </div>
    )
}

export default Home
