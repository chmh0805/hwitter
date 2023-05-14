import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
} from "firebase/auth";

import {
	getFirestore,
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	query,
	orderBy,
	doc,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export const authService = {
	onAuthStateChanged: (...args) => {
		return auth.onAuthStateChanged(...args);
	},
	signInWithEmailAndPassword: (...args) => {
		return signInWithEmailAndPassword(auth, ...args);
	},
	createUserWithEmailAndPassword: (...args) => {
		return createUserWithEmailAndPassword(auth, ...args);
	},
	signInWithPopup: (...args) => {
		return signInWithPopup(auth, ...args);
	},
	GoogleAuthProvider,
	GithubAuthProvider,
};

export const dbService = {
	addDoc,
	collection: (...args) => {
		return collection(firestore, ...args);
	},
	getDocs,
	onSnapshot,
	query,
	orderBy,
	doc: (...args) => {
		return doc(firestore, ...args);
	},
	deleteDoc,
	updateDoc,
};

