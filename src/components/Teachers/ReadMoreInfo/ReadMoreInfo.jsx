import Reviews from './Reviews/Reviews'
import s from './ReadMoreInfo.module.css'

const ReadMoreInfo = ({ reviews, experience, setShowInfo }) => {
    return (
        <div className={s.addInfoContainer} onClick={() => setShowInfo(false)}>
            <p>{experience}</p>
            <Reviews reviews={reviews} />
        </div>
    )
}

export default ReadMoreInfo