import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
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
const auth = firebase.auth(); // Add parenthesis to initialize the auth instance
const firestore = firebase.firestore();

export async function getBearerToken(currentUser) {
	try {
		const credentials = await auth.signInWithEmailAndPassword(currentUser.email, currentUser.password);
		const token = await credentials.user.getIdToken();
		const user = await searchUserByEmail(credentials.user.email);
		return { token, user };
	} catch (err) {
		throw new Error(err.message);
	}
}

export async function searchUserByEmail(email) {
	try {
		const users = await firestore.collection('users').where('email', '==', email).get();
		return users.docs.map((doc) => doc.data())[0];
	} catch (err) {
		console.error(err);
	}
}

export async function createUser(userData) {
	try {
		const credentials = await auth.createUserWithEmailAndPassword(userData.email, userData.password);
		const token = await credentials.user.getIdToken();
		const user = {
			email: userData.email,
			firstName: userData.firstName,
			lastName: userData.lastName,
		};
		await firestore.collection('users').doc(credentials.user.uid).set(user);
		return { token, user };
	} catch (err) {
		throw new Error(err.message);
	}
}

export async function getUserById(id) {
	try {
		const user = await firestore.collection('users').doc(id).get();
		return user.data();
	} catch (err) {
		console.error(err);
	}
}

export async function getTeachers() {
	try {
		const teachers = await firestore.collection('users').where('isTeacher', '==', true).get();
		return teachers.docs.map((doc) => doc.data());
	} catch (err) {
		console.error(err);
	}
}

export async function userLogout() {
	try {
		console.log('userLogout function called');
		await auth.signOut();
		console.log('user logged out successfully');
	} catch (err) {
		console.error(err);
	}
}


export async function addBookingToUser(userId, data) {
	try {
		await firestore.collection('users').doc(userId).update({
			bookings: firebase.firestore.FieldValue.arrayUnion(data),
		});
	} catch (err) {
		console.error(err);
	}
}

export function validateEmail(mail) {
	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return true;
	} else {
		return false;
	}
}

export function validateUrl(value) {
	try {
		new URL(value);
		return true;
	} catch (error) {
		return false;
	}
}

