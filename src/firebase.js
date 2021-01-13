// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCgND3AOX__r-Kyb7bg9mVibmu0hyuV1J4",
    authDomain: "whatsapp-clone-54a1b.firebaseapp.com",
    projectId: "whatsapp-clone-54a1b",
    storageBucket: "whatsapp-clone-54a1b.appspot.com",
    messagingSenderId: "578227877643",
    appId: "1:578227877643:web:f56826a9e58bb10c50540e",
    measurementId: "G-PBRQ9T9VVW"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export { auth, provider };
  export default db;

  //https://whatsapp-clone-54a1b.web.app/