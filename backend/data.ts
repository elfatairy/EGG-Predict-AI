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

export const saveReport = async (responses: any) => {
  try {
    if (!auth.currentUser || !(await getItem('userUuid'))) return false;

    await updateDoc(doc(db, `users/${await getItem('userUuid')}`), {
      reports: arrayUnion({
        responses,
        submittedAt: new Date().getTime()
      }),
      lastSubmittedReport: new Date().getTime()
    })

    return true;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return false;
  }
}

export const isReportSubmittedToday = async () => {
  try {
    if (!auth.currentUser || !(await getItem('userUuid'))) return false;

    const document = await getDoc(doc(db, `users/${await getItem('userUuid')}`));
    const lastSubmittedReport = document.data()?.lastSubmittedReport;
    const lastSubmittedReportDate =  new Date(lastSubmittedReport);
    const now = new Date();
    if(lastSubmittedReport && 
      lastSubmittedReportDate.getDate() == now.getDate() &&
      lastSubmittedReportDate.getMonth() == now.getMonth() &&
      lastSubmittedReportDate.getFullYear() == now.getFullYear()
    ) return true;

    return false;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return false;
  }
}

export const getPatientReports = async (patientUuid: string) => {
  try {
    const doc = (await getDocs(query(collection(db, "users"), where("uid", "==", patientUuid)))).docs[0];

    const reports = doc.data()?.reports;

    if(!reports) return [];
    
    return Object.values(reports).sort((a: any, b: any) => a.submittedAt - b.submittedAt)
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return [];
  }
}

export const getReport = async (patientUuid: string, reportTimeStamp: number) => {
  try {
    const document = (await getDocs(query(collection(db, "users"), where("uid", "==", patientUuid)))).docs[0];
    const reports = document.data()?.reports;
    const report = reports.filter((s: any) => s.submittedAt == reportTimeStamp)[0];

    if(!report) return false;
    
    return report.responses;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return false;
  }
}

export const getPatientType = async (patientUuid: string) => {
  try {
    const document = (await getDocs(query(collection(db, "users"), where("uid", "==", patientUuid)))).docs[0];

    if(!document.data()) return false;
    
    return document.data().patientType;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    return false;
  }
}