import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import s from "./FormUser.module.css";

const valuesField = [
    { id: 1, forLabel: "Career and business", forValue: "career" },
    { id: 2, forLabel: "Lesson for kids", forValue: "lesson" },
    { id: 3, forLabel: "Living abroad", forValue: "living" },
    { id: 4, forLabel: "Exams and coursework", forValue: "exams" },
    { id: 5, forLabel: "Culture, travel or hobby", forValue: "culture" },
];

const FormUser = ({ setShowBookModal }) => {
    const initialValues = {
        reason: "",
        name: "",
        email: "",
        phone: "",
    };

    const schema = yup.object().shape({
        reason: yup.string().required("Please select a reason"),
        name: yup.string().min(5, "Too short").max(24, "Too long").required("Required"),
        email: yup.string().email("Invalid email").required("Required"),
        phone: yup.string().min(9, "Too short").max(12, "Too long").required("Required"),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => {
                setShowBookModal(false);
                toast.success("Thank you, a tutor will contact you soon!");
            }}
        >
            <Form className={s.form}>
                <p className={s.text}>What is your main reason for learning English?</p>

                <div className={s.fieldsGroup}>
                    {valuesField.map((vl) => (
                        <label key={vl.id} className={s.radioLabel}>
                            <Field type="radio" name="reason" value={vl.forValue} className={s.radioBtn} />
                            {vl.forLabel}
                        </label>
                    ))}
                    <ErrorMessage name="reason" component="div" className={s.error} />
                </div>

                <div className={s.groupInputs}>
                    <Field type="text" name="name" placeholder="Full Name" className={s.input} />
                    <ErrorMessage name="name" component="div" className={s.error} />

                    <Field type="email" name="email" placeholder="Email" className={s.input} />
                    <ErrorMessage name="email" component="div" className={s.error} />

                    <Field type="tel" name="phone" placeholder="Phone number" className={s.input} />
                    <ErrorMessage name="phone" component="div" className={s.error} />
                </div>

                <button type="submit" className={s.submitBtn}>
                    Book
                </button>
            </Form>
        </Formik>
    );
};

export default FormUser;
