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

            <div className={s.borderContainer}>
                <div className={s.info}>
                    <h2 className={s.infoSum}>32,000 +</h2>
                    <p className={s.textInfo}>Experienced tutors</p>
                </div>
                <div className={s.info}>
                    <h2 className={s.infoSum}>300,000 +</h2>
                    <p className={s.textInfo}>5-star tutor reviews</p>
                </div>
                <div className={s.info}>
                    <h2 className={s.infoSum}>120 +</h2>
                    <p className={s.textInfo}>Subjects taught</p>
                </div>
                <div className={s.info}>
                    <h2 className={s.infoSum}>200 +</h2>
                    <p className={s.textInfo}>Tutor nationalities</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
