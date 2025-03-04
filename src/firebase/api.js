import { getDatabase, ref, set, child, get } from "firebase/database";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signInWithEmailAndPassword,
    reload,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "./firebase";

// ======================= USER REGISTRATION
export function whenUserRegister(dataForm) {
    const { name, email, password } = dataForm;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            updateProfile(auth.currentUser, { displayName: name });
            const user = userCredentials.user;
            sendEmailVerification(auth.currentUser).then(reload(user));
            toast.info(
                "Please, verify your email to complete registration and login!"
            );
            console.log(auth.currentUser);
            return user;
        })
        .catch(() => toast.error("Email already in use!"));
}

// ======================== USER LOGIN
export function whenUserLogin(dataForm, setShowLogin) {
    const { email, password } = dataForm;
    signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            if (res.user.emailVerified) {
                setShowLogin(false);
                toast.success(`Welcome ${res.user?.displayName} to LearnLingo`);
                localStorage.setItem("isLogin", "true");
            } else {
                toast.warn("Please, verify Your email!");
            }
        })
        .catch(() => toast.error("Invalid credentials"));
}

// ======================== USER LOGOUT
export function whenLogOut() {
    auth.signOut();
    localStorage.removeItem("isLogin");
}

//========================= GET USER DATA
export function getUserData() {
    const user = auth.currentUser;
    if (user !== null) {
        const userData = {
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid,
        };
        return userData;
    }
}

//========================= GET ALL TEACHERS FROM REAL-TIME DATABASE

export async function getAllTeachers(teachersPerPage) {
    try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, "teachers"));
        const teachers = snapshot.val();

        if (!teachers) {
            console.warn("No teachers found in the database.");
            return [];
        }


        return Object.values(teachers).slice(0, teachersPerPage);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
}

//========================= ADD TEACHER TO FAVORITES
export async function addTeacher(objectTeacher) {
    const userData = getUserData();
    const userId = userData?.uid;
    const db = getDatabase();
    let teachersArray =
        (await get(ref(db, `users/${userId}/teachers`))).val() || [];
    if (teachersArray?.length < 1) {
        teachersArray = [objectTeacher];
    } else {
        teachersArray = [...teachersArray, objectTeacher];
    }
    set(ref(db, `users/${userId}/teachers`), teachersArray);
}

//========================= REMOVE TEACHER FROM FAVORITES
export async function removeTeacher(teacherID) {
    const userData = getUserData();
    const userId = userData?.uid;
    const db = getDatabase();
    try {
        const arrayFavorites = await getFavorites();
        const updatedFavorites = arrayFavorites?.filter(
            (favorite) => favorite.id !== teacherID
        );
        set(ref(db, `users/${userId}/teachers`), updatedFavorites);
        return updatedFavorites;
    } catch (error) {
        console.log(error);
    }
}

//========================= GET ALL FAVORITES TEACHERS FROM REAL-TIME DATABASE
export async function getFavorites() {
    const userData = getUserData();
    const userId = userData?.uid;
    const db = getDatabase();
    try {
        const snapshot = await get(child(ref(db), `users/${userId}/teachers`));
        return snapshot.val();
    } catch (error) {
        console.error(error);
    }
}

//========================= GET ALL TEACHERS BY LANGUAGES
export async function getTeachersByLanguage(language) {
    try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, "teachers"));
        const teachers = snapshot.val();
        const filteredTeachers = Object.values(teachers).filter((teacher) =>
            teacher.languages.includes(language)
        );
        return filteredTeachers;
    } catch (error) {
        console.error(error);
    }
}

//========================= GET ALL TEACHERS BY LEVELS
export async function getTeachersByLvl(lvl) {
    try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, "teachers"));
        const teachers = snapshot.val();
        const filteredTeachersByLvl = Object.values(teachers).filter((teacher) =>
            teacher?.levels.includes(lvl)
        );
        return filteredTeachersByLvl;
    } catch (error) {
        console.error(error);
    }
}

//========================= GET ALL TEACHERS BY PRICE
export async function getTeachersByPrice(price) {
    try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, "teachers"));
        const teachers = snapshot.val();
        const filteredTeachersByPrice = Object.values(teachers).filter(
            (teacher) => teacher.price_per_hour === +price
        );
        return filteredTeachersByPrice;
    } catch (error) {
        console.error(error);
    }
}

//========================= GET ALL TEACHERS BY LANGUAGE, LEVEL AND PRICE
export async function getAllFiltered(language, lvl, price) {
    try {
        if (language && !lvl && !price) {
            let teachersLang = await getTeachersByLanguage(language);
            return teachersLang;
        } else if (lvl && !language && !price) {
            let teachersLvl = await getTeachersByLvl(lvl);
            return teachersLvl;
        } else if (price && !language && !lvl) {
            let teachersPrice = await getTeachersByPrice(price);
            return teachersPrice;
        } else if (language && lvl && !price) {
            let teachersLang = await getTeachersByLanguage(language);
            let teachersLvl = await getTeachersByLvl(lvl);
            const intersectedTeachers = teachersLang.filter((teacherLvl) => {
                return teachersLvl.some(
                    (teacherLang) => teacherLang.id === teacherLvl.id
                );
            });
            return intersectedTeachers;
        } else if (lvl && price && !language) {
            let teachersLvl = await getTeachersByLvl(lvl);
            let teachersPrice = await getTeachersByPrice(price);
            const intersectedTeachers = teachersLvl.filter((teacherLvl) => {
                return teachersPrice.some(
                    (teacherPrice) => teacherPrice.id === teacherLvl.id
                );
            });
            return intersectedTeachers;
        } else if (language && price && !lvl) {
            let teachersLang = await getTeachersByLanguage(language);
            let teachersPrice = await getTeachersByPrice(price);
            const intersectedTeachers = teachersLang.filter((teacherLang) => {
                return teachersPrice.some(
                    (teacherPrice) => teacherLang.id === teacherPrice.id
                );
            });
            return intersectedTeachers;
        } else if (language && lvl && price) {
            let teachersLang = await getTeachersByLanguage(language);
            let teachersLvl = await getTeachersByLvl(lvl);
            let teachersPrice = await getTeachersByPrice(price);
            const intersectedTeachers = teachersLang.filter((teacherLang) => {
                return teachersLvl.some((teacherLvl) => {
                    return teachersPrice.some((teacherPrice) => teacherPrice.id === teacherLvl.id && teacherLvl.id === teacherLang.id);
                });
            });

            return intersectedTeachers;
        }
    } catch (error) {
        console.error(error);
    }
}

