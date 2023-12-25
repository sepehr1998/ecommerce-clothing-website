import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyBxPzo38Vcco7lTJ5_f17WtQNBWcIE5yYw",
  
    authDomain: "crwn-clothing-db-b6d07.firebaseapp.com",
  
    projectId: "crwn-clothing-db-b6d07",
  
    storageBucket: "crwn-clothing-db-b6d07.appspot.com",
  
    messagingSenderId: "822578153908",
  
    appId: "1:822578153908:web:4ed9f51afe529ea2144ae1"
  
  };
  
  
  // Initialize Firebase
  
  initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

   export const auth = getAuth();
   export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

   export const db = getFirestore();

   export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
    
    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });
  
    await batch.commit();
    console.log('done');
  };

   export const createUserDocumentFromAuth = async (userAuth, additionInformation={}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) { 
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionInformation,
            });
        } catch (error) {
            console.log(error);
        }
    }
    return userDocRef;
   }

   export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
   }

   export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
   }

   export const signOutUser = async () => await signOut(auth);

   export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

   export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'collections');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
   }