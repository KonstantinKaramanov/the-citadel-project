import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBo-VnJr52CECHIO0_r4HQXh_hQDcWBGkA",
    authDomain: "the-citadel-project.firebaseapp.com",
    databaseURL: "https://the-citadel-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "the-citadel-project",
    storageBucket: "the-citadel-project.appspot.com",
    messagingSenderId: "519832819116",
    appId: "1:519832819116:web:35b8d2cdf04d08c5809609"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
