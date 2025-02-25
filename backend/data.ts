import { auth, db } from "@/firebaseConfig";
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Doctor, Medication, Unit } from "./types";
import { getItem } from "./storage";

export const getDoctors = async () => {
  try {
    if (!auth.currentUser) return false;

    const usersCollections = collection(db, "users");
    const docs = (
      await getDocs(query(usersCollections, where("userType", "==", "doctor")))
    ).docs;

    const doctors: Doctor[] = [];
    for (const doc of docs) {
      const { uid, name, medicalSpecialties, gender } = doc.data();
      doctors.push({ uid, name, medicalSpecialties, gender });
    }

    return doctors;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return false;
  }
};

export const getMedications = async () => {
  try {
    if (!auth.currentUser) return false;

    const document = await getDoc(doc(db, `users/${await getItem("userUuid")}`));
    const meds: Record<string, Medication> | undefined = document.data()?.meds;

    if(!meds) 
      return {};

    return meds;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return {};
  }
};

export const updateLocation = async (latitude: number, longitude: number) => {
  try {
    if (!auth.currentUser || !(await getItem('userUuid'))) return false;

    await updateDoc(doc(db, `users/${await getItem('userUuid')}`), {
      location: {
        latitude,
        longitude
      }
    })

    return true;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return false;
  }
};

export const addMedicine = async (name: string, amount: string, frequency: Medication['frequency'], time: number) => {
  try {
    if (!auth.currentUser || !(await getItem('userUuid'))) return false;

    await updateDoc(doc(db, `users/${await getItem('userUuid')}`), {
      meds: arrayUnion({
        name, 
        amount, 
        frequency, 
        time
      })
    })

    return true;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return false;
  }
}