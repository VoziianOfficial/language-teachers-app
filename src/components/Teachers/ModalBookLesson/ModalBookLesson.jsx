import { useRef } from "react";
import { createPortal } from "react-dom";
import sprite from "../../../icons/icons.svg";
import s from './ModalBookLesson.module.css'

const ModalBookLesson = ({ children, setShowBookModal }) => {
    const modalRoot = document?.getElementById("modal-root");
    const backdropRef = useRef(null);

    const handleClose = () => {
        setShowBookModal(false);
    };

    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) {
            setShowBookModal(false);
        }
    };

    return (
        <>
            {createPortal(
                <div className={s.backdrop} ref={backdropRef} onClick={handleBackdropClick}>
                    <div className={s.form}>
                        <button className={s.btn} type="button" onClick={handleClose}>
                            <svg width={32} height={32}>
                                <use xlinkHref={`${sprite}#icon-close`}></use>
                            </svg>
                        </button>
                        {children}
                    </div>
                </div>,
                modalRoot
            )}
        </>
    );
};

export default ModalBookLesson;