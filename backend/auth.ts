import { auth, db } from "@/firebaseConfig";
import { deleteItem, getItem, setItem } from "./storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc, where, query } from "firebase/firestore";
import { streamClient } from "@/streamConfig";

export const signupPatientHandler = async (name: string, email: string, father: string, password: string) => {
    try {
        const userCreds = await createUserWithEmailAndPassword(auth, email, password);
        const usersCollections = collection(db, 'users');

        updateProfile(auth.currentUser!, {
            displayName: name
        });

        await addDoc(usersCollections, {
            uid: userCreds.user.uid,
            name,
            email,
            father,
            userType: 'patient',
            patientType: false
        })

        await streamClient.connectUser(
            {
                id: userCreds.user.uid,
                name: name
            },
            streamClient.devToken(userCreds.user.uid),
        );

        return true;
    } catch (e) {
        console.log("error");
        console.log(e);
        await logoutHandler();
        return "There is some issue please try again later";
    }
}

export const signupDoctorHandler = async (name: string, email: string, age: string, gender: 'male' | 'female', medicalSpecialties: string, password: string) => {
    try {
        const userCreds = await createUserWithEmailAndPassword(auth, email, password);
        const usersCollections = collection(db, 'users');
        await addDoc(usersCollections, {
            uid: userCreds.user.uid,
            name,
            email,
            age,
            gender,
            medicalSpecialties,
            userType: 'doctor'
        })

        updateProfile(auth.currentUser!, {
            displayName: name
        });

        await streamClient.connectUser(
            {
                id: userCreds.user.uid,
                name: name
            },
            streamClient.devToken(userCreds.user.uid),
        );

        return true;
    } catch (e) {
        console.log("error");
        console.log(e);
        await signOut(auth);
        return "There is some issue please try again later";
    }
}

export const savePatientTypeHandler = async (patientType: 'epilepsy' | 'alzheimer') => {
    try {
        if (!auth.currentUser) return "You are not logged in";

        const usersCollections = collection(db, 'users');
        const doc = (await getDocs(query(usersCollections, where("uid", "==", auth.currentUser.uid)))).docs[0];

        await updateDoc(doc.ref, {
            patientType
        })

        // if (patientType == 'epilepsy') {
        //     const channel = streamClient.channel("messaging", 'epilepsy_group2', {
        //         grants: {
        //             user: [
        //                 "read-channel",     // allow access to the channel
        //                 "create-message",    // create messages in the channel
        //                 "update-message-owner", // update own user messages
        //                 "delete-message-owner", // delete own user messages
        //             ],
        //         },
        //     });
        //     await channel.watch();
        //     await channel.addMembers([doc.data().uid], { text: `${doc.data().name} joined the channel.` })
        // }

        return true;
    } catch (e) {
        console.log("error");
        console.log(e);
        return "There is some issue please try again later";
    }
}

type UserType = 'patient' | 'doctor' | 'admin'

export const checkLogedIn = async (): Promise<false | UserType | 'no-type'> => {
    try {
        if (!auth.currentUser) return false;

        const usersCollections = collection(db, 'users');
        const doc = (await getDocs(query(usersCollections, where("uid", "==", auth.currentUser.uid)))).docs[0];

        if (doc.data().userType != 'patient') return doc.data().userType;

        if (!doc.data().patientType) return 'no-type';

        return 'patient';
    } catch (e) {
        console.log("ERROR");
        console.log(e);
        return false;
    }
}

export const loginHandler = async (email: string, password: string): Promise<false | UserType | 'no-type' | string> => {
    try {
        const userCreds = await signInWithEmailAndPassword(auth, email, password);

        const usersCollections = collection(db, 'users');
        const doc = (await getDocs(query(usersCollections, where("uid", "==", userCreds.user.uid)))).docs[0];

        const connected = await streamClient.connectUser(
            {
                id: userCreds.user.uid,
                name: doc.data().name
            },
            streamClient.devToken(userCreds.user.uid),
        );
        console.log("connected");
        console.log(connected);

        if (doc.data().userType != 'patient') return doc.data().userType;

        if (!doc.data().patientType) return 'no-type';

        return 'patient';
    } catch (e) {
        console.log("error");
        console.log(e);
        await logoutHandler();
        return "Credentials are not correct";
    }
}

export const logoutHandler = async (): Promise<true | string> => {
    try {
        await signOut(auth);

        await streamClient.disconnectUser();

        return true;
    } catch (e) {
        console.log("error");
        console.log(e);
        return "There is some error please try again later";
    }
}