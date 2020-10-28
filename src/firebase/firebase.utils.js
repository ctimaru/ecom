import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC60hnj1cYuQiTS3UbqaITZ9sGXW33FoK8",
  authDomain: "iv-db-6064a.firebaseapp.com",
  databaseURL: "https://iv-db-6064a.firebaseio.com",
  projectId: "iv-db-6064a",
  storageBucket: "iv-db-6064a.appspot.com",
  messagingSenderId: "225961785738",
  appId: "1:225961785738:web:480f56f69a981c22cf7073",
  measurementId: "G-WHK0VPHFLV"
}


export const createUserProfileDocument= async (userAuth, additionalData) => { 
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();
  
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log('Error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;