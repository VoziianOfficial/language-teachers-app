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

//registration
export function whenUserRegister(dataForm) {
    const { name, email, password } = dataForm;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            updateProfile(auth.currentUser, { displayName: name });
            const user = userCredentials.user;
            sendEmailVerification(auth.currentUser).then(reload(user));
            toast.info("Please, verify your email to complete registration and login!");
            console.log(auth.currentUser);
            return user;
        })
        .catch(() => toast.error("Email already in use!"));
}

//login
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

//logout
export function whenLogOut() {
    auth.signOut();
    localStorage.removeItem("isLogin");
}


//get user info
export function getUserData() {
    const user = auth.currentUser;
    if (user !== null) {
        return {
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid,
        };
    }
}

//get teacher info
export async function getAllTeachers(teachersPerPage) {
    try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, "teachers"));
        const teachers = snapshot.val();
        return teachers.slice(0, teachersPerPage);
    } catch (error) {
        console.error(error);
    }
}

// add teacher in favorite
export async function addTeacher(objectTeacher) {
    const userData = getUserData();
    const userId = userData?.uid;
    const db = getDatabase();
    let teachersArray =
        (await get(ref(db, `users/${userId}/teachers`))).val() || [];

    teachersArray = [...teachersArray, objectTeacher];

    set(ref(db, `users/${userId}/teachers`), teachersArray);
}


//delete teacher

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


//filter teacher
export async function getTeachersByLanguage(language) { }
export async function getTeachersByLvl(lvl) { }
export async function getTeachersByPrice(price) { }
export async function getAllFiltered(language, lvl, price) { }
