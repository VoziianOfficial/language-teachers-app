import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import s from './Home.module.css'

const Home = () => {
    return (
        <div className={s.HomeContainer}>
            <Header />
            <Hero />

        </div>
    )
}

export default Home
