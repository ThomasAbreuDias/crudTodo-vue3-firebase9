
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAL6mxIHuQaF25gHJCl3ijg6YvbpyLoBbs',
  authDomain: 'test-8e1dc.firebaseapp.com',
  projectId: 'test-8e1dc',
  storageBucket: 'test-8e1dc.appspot.com',
  messagingSenderId: '425675811177',
  appId: '1:425675811177:web:93511d42e865fde508f5f8',
  measurementId: 'G-3H5TB4EQSM'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    db
}