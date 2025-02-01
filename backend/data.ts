import { auth, db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Doctor } from "./types";

export const getDoctors = async () => {
    try {
        if (!auth.currentUser) return false;

        const usersCollections = collection(db, 'users');
        const docs = (await getDocs(query(usersCollections, where("userType", "==", "doctor")))).docs;

        const doctors: Doctor[] = [];
        for(const doc of docs) {
            const {uid, name, medicalSpecialties, gender} = doc.data();
            doctors.push({uid, name, medicalSpecialties, gender});
        }

        return doctors;
    } catch (e) {
        console.log("ERROR");
        console.log(e);
        return false;
    }
}