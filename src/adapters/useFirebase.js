import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { useState } from "react";

const useFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCklcgf0tLs4KDosgCqSyPATXa8OuwRQXw",
    authDomain: "metaverse-council.firebaseapp.com",
    projectId: "metaverse-council",
    storageBucket: "metaverse-council.appspot.com",
    messagingSenderId: "952701010364",
    appId: "1:952701010364:web:3327c648725b1d50866bb9"
  };
  const app = initializeApp(firebaseConfig);
  function init() {

    return (getFirestore(app))
  }

  async function getMetaverses() {
    const db = init()
    const collectionRef = collection(db, "metaverses");
    var result = await getDocs(collectionRef)
    return result.docs.map(doc => {
        return {
            ...doc.data(),
            id: doc.id
        }
    })
  }

  async function getMetaverse(id) {
    const db = init()
    const documentRef = doc(db, "metaverses", id);
    var result = await getDoc(documentRef)
    return {
        ...result.data(),
        id: result.id
    }
  }

  async function updateMetaverse(metaverse, id) {
    console.log( { ...metaverse, updatedAt: serverTimestamp(), updatedBy: getUser().uid })
    const db = init()
    const documentRef = doc(db, "metaverses", id);
    var result = await updateDoc(documentRef, { ...metaverse, updatedAt: serverTimestamp(), updatedBy: getUser().uid })
  }


  async function login(email, password) {
    const auth = getAuth(app);
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  }

  async function logout() {
    const auth = getAuth(app);
    return signOut(auth);
  }

  function getUser() {
    const auth = getAuth(app);
    return auth.currentUser;
  }

  async function getUserProfile() {
    const db = init();
    const documentRef = doc(db, "users", getUser().uid);
    return (await getDoc(documentRef)).data()
  }

  async function getUserProfileByEmail(email) {
    const db = init();
    const collectionRef = collection(db, "users");
    var q = query(collectionRef, where("email", "==", email));
    var result = await getDocs(q)
    return result.docs.map(doc => {
        return doc.data()
    })
  }

  async function streamUser(callback) {
    const auth = getAuth(app);
    onAuthStateChanged(auth, callback)
  }


  return { getMetaverses, login, logout, getUser, streamUser, updateMetaverse, getMetaverse, getUserProfile, getUserProfileByEmail,  }
}


export default useFirebase