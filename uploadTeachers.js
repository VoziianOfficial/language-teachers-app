import { collection, addDoc } from "firebase/firestore";
import { db } from "./src/firebase/firebaseConfig.js";
import fs from 'fs';

const teachersData = JSON.parse(fs.readFileSync('./teachers.json', 'utf-8'));

const uploadTeachers = async () => {
    try {
        const teachersCollection = collection(db, "teachers");
        for (const teacher of teachersData) {
            await addDoc(teachersCollection, teacher);
            console.log(`✅ Учитель добавлен: ${teacher.name} ${teacher.surname}`);
        }
        console.log("🎉 Все учителя успешно загружены в Firestore!");
    } catch (error) {
        console.error("❌ Ошибка при загрузке:", error);
    }
};

uploadTeachers();
