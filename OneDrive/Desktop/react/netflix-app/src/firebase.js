// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
	apiKey: 'AIzaSyDiWqE1OKjB4bnKFLbce4TjA580Irg95Z4',
	authDomain: 'netflix-home.firebaseapp.com',
	projectId: 'netflix-home',
	storageBucket: 'netflix-home.appspot.com',
	messagingSenderId: '830633782093',
	appId: '1:830633782093:web:517f6282621373809ba504',
	measurementId: 'G-Z3V75RELF7',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { auth };
export default db;
