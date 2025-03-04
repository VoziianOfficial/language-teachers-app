import chica1 from "../../../../img/avatars_reviews/chica1.webp";
import chico1 from "../../../../img/avatars_reviews/chico1.webp";
import sprite from "../../../../icons/icons.svg";
import s from './Reviews.module.css';

const Reviews = ({ reviews }) => {
    return (
        <div className={s.listReviewers}>
            {reviews.map((review, index) => {
                return (<li key={index}>
                    <div className={s.imgContainer}>
                        <img src={index === 0 ? chica1 : chico1} alt="Animated person" width={44} height={44} />
                        <div className={s.reviewer}>
                            <p>{review.reviewer_name}</p>
                            <div>
                                <svg width={16} height={16}>
                                    <use xlinkHref={`${sprite}#icon-star`}></use>
                                </svg>
                                <span>{review.reviewer_rating.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                    <p>{review.comment}</p>
                </li>)
            })}
        </div>
    );
};

export default Reviews;