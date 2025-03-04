import { useEffect } from "react";
import ModalBookLesson from "../ModalBookLesson/ModalBookLesson";
import BookForm from "../BookForm/BookForm";

const BookLesson = ({ setShowBookModal, name, surname, avatar_url }) => {
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Escape") {
                setShowBookModal(false);
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [setShowBookModal]);

    return (
        <>
            <ModalBookLesson setShowBookModal={setShowBookModal}>
                <BookForm name={name} surname={surname} avatar_url={avatar_url} setShowBookModal={setShowBookModal} />
            </ModalBookLesson>
        </>
    );
};

export default BookLesson;
