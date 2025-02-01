import { deleteItem, getItem, setItem } from "./storage"
import { ref, onValue, get, set } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Patient } from "./types";

export const getPatientType = async (): Promise<false | 'epilepsy' | 'alzheimer'> => {
    try {
        if (!auth.currentUser) return false;

        const usersCollections = collection(db, 'users');
        const doc = (await getDocs(query(usersCollections, where("uid", "==", auth.currentUser.uid)))).docs[0];

        if (doc.data().userType != 'patient') return false;

        return doc.data().patientType;
    } catch (e) {
        console.log("ERROR");
        console.log(e);
        return false;
    }
}

export const getPatient = async (patientId: string): Promise<Patient | false> => {
    try {
        const usersCollections = collection(db, 'users');
        const doc = (await getDocs(query(usersCollections, where("uid", "==", patientId)))).docs[0];

        if (doc.data().userType != 'patient') return false;

        const { uid, name } = doc.data();

        return { uid, name };
    } catch (e) {
        console.log("ERROR");
        console.log(e);
        return false;
    }
}