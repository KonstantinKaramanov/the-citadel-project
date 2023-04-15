import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/compat/firestore';


const db = firebase.firestore();

export async function getAll()  {
	try {
		let classesRef = db.collection('classes').limit(50);
		let querySnapshot = await classesRef.get();
		return querySnapshot.docs.map(doc => doc.data());
	} catch (err) {
		console.error(err)
	}
}

export async function getLatest()  {
	try {
		let classesRef = db.collection('classes').orderBy('date', 'desc').limit(6);
		let querySnapshot = await classesRef.get();
		return querySnapshot.docs.map(doc => doc.data());
	} catch (err) {
		console.error(err)
	}
}

export async function createClass(classData, userToken) {
	try {
		let classesRef = db.collection('classes');
		let docRef = await classesRef.add(classData);
		return docRef.get().then(doc => doc.data());
	} catch (err) {
		console.error(err)
	}
}

export async function getClassById(id) {
	try {
		let classRef = db.collection('classes').doc(id);
		let doc = await classRef.get();
		return doc.data();
	} catch (err) {
		console.error(err)
	}
}

export async function editClassbyId(classData, classId, userToken) {
	try {
		let classRef = db.collection('classes').doc(classId);
		await classRef.update(classData);
		let doc = await classRef.get();
		return doc.data();
	} catch (err) {
		console.error(err)
	}
}

export async function deleteClassbyId(classId, userToken) {
	try {
		let classRef = db.collection('classes').doc(classId);
		await classRef.delete();
		return { message: 'Class deleted successfully.' };
	} catch (err) {
		console.error(err)
	}
}

export async function getAllbyPerson(personId)  {
	try {
		let classesRef = db.collection('classes').where('teacherId', '==', personId);
		let querySnapshot = await classesRef.get();
		return querySnapshot.docs.map(doc => doc.data());
	} catch (err) {
		console.error(err)
	}
}

export async function bookClassbyId(classData, classId, userToken) {
	try {
		let classRef = db.collection('classes').doc(classId);
		await classRef.update(classData);
		let doc = await classRef.get();
		return doc.data();
	} catch (err) {
		console.error(err)
	}
}

export async function getSeveralClassesByIds(classIds) {
	try {
		let classesRef = db.collection('classes').where(firebase.firestore.FieldPath.documentId(), 'in', classIds);
		let querySnapshot = await classesRef.get();
		return querySnapshot.docs.map(doc => doc.data());
	} catch (err) {
		console.error(err)
	}
}












//DELETE THIS
// import { auth, firestore } from '../firebase';

// export async function createUser(email, password, displayName) {
// 	try {
// 		const userCredential = await auth.createUserWithEmailAndPassword(email, password);
// 		await userCredential.user.updateProfile({ displayName });
// 		return userCredential.user;
// 	} catch (error) {
// 		throw new Error(error.message);
// 	}
// }

// export async function getAll()  {
// 	try {
// 		const classesRef = firestore.collection('classes');
// 		const snapshot = await classesRef.get();
// 		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// export async function getLatest()  {
// 	try {
// 		const classesRef = firestore.collection('classes').orderBy('date', 'desc').limit(6);
// 		const snapshot = await classesRef.get();
// 		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// export async function createClass(classData, userToken) {
// 	try {
// 		const classesRef = firestore.collection('classes');
// 		await classesRef.add(classData);
// 		return classData;
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// export async function getClassById(id) {
// 	try {
// 		const classRef = firestore.collection('classes').doc(id);
// 		const doc = await classRef.get();
// 		if (doc.exists) {
// 			return { id: doc.id, ...doc.data() };
// 		} else {
// 			throw new Error('No such class document!');
// 		}
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// export async function editClassbyId(classData, classId, userToken) {
// 	try {
// 		const classRef = firestore.collection('classes').doc(classId);
// 		await classRef.update(classData);
// 		return classData;
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// export async function deleteClassbyId(classId, userToken) {
// 	try {
// 		const classRef = firestore.collection('classes').doc(classId);
// 		await classRef.delete();
// 		return { message: 'Class deleted successfully!' };
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// export async function getAllbyPerson(personId)  {
// 	try {
// 		const classesRef = firestore.collection('classes').where('teacherId', '==', personId);
// 		const snapshot = await classesRef.get();
// 		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// export async function bookClassbyId(classData, classId, userToken) {
// 	try {
// 		const classRef = firestore.collection('classes').doc(classId);
// 		await classRef.update({ bookings: [...classData.bookings, userToken] });
// 		return classData;
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

// export async function getSeveralClassesByIds(classIds) {
// 	try {
// 		const classesRef = firestore.collection('classes').where(firestore.FieldPath.documentId(), 'in', classIds);
// 		const snapshot = await classesRef.get();
// 		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// 	} catch(err) {
// 		console.error(err);
// 	}
// }

