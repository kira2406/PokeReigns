import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyBmRc-XR01vJG0my0u2hQpYNBBmtyQr8qM",
  authDomain: "pokereigns.firebaseapp.com",
  databaseURL: "https://pokereigns.firebaseio.com",
  projectId: "pokereigns",
  storageBucket: "pokereigns.appspot.com",
  messagingSenderId: "630420974502",
  appId: "1:630420974502:web:5886d80807232170c2bd67",
  measurementId: "G-Z1DH7YD8BZ",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
