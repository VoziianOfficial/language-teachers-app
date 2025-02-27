import GetBtn from '../../components/GetBtn/GetBtn'
import s from './Hero.module.css';
import hero from '../../assets/hero.jpg'


const Hero = () => {
    return (
        <div className={s.container}>
            <div className={s.heroContainer}>
                <div className={s.textWrapper}>
                    <h1 className={s.title}>Unlock your potential with the best <span className={s.spanText}>language</span> tutors</h1>
                    <p className={s.text}>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
                    <GetBtn />
                </div>
                <img src={hero} alt="hello" />
            </div>
        </div>
    )
}

export default Hero
