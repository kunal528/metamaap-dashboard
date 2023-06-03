
import React from 'react'
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";


const useAccess = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCklcgf0tLs4KDosgCqSyPATXa8OuwRQXw",
        authDomain: "metaverse-council.firebaseapp.com",
        projectId: "metaverse-council",
        storageBucket: "metaverse-council.appspot.com",
        messagingSenderId: "952701010364",
        appId: "1:952701010364:web:3327c648725b1d50866bb9"
    };
    const app = initializeApp(firebaseConfig, 'admin app');


    async function getUsers() {
        const db = getFirestore(app)
        const collectionRef = collection(db, "users");
        var result = await  getDocs(collectionRef)
        return result.docs.map(doc => {
            return {
                ...doc.data(),
            }
        }
        )
    }

    function deleteUser(id) {
        const db = getFirestore(app)
        const documentRef = doc(db, "users", id);
        return deleteDoc(documentRef)
    }

    async function addUser(id, email) {
        const db = getFirestore(app)
        const documentRef = doc(db, "users", id);
        await setDoc(documentRef, { id: id,email: email,  createdAt: serverTimestamp(), role: 'admin' })
        return (await getDoc(documentRef)).data()
    }

    async function signin(email, password) {
        const auth = getAuth(app);
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    return { getUsers, deleteUser, addUser, signin }

}

export default useAccess