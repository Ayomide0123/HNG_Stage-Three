// import firebase from "firebase/app";
import "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVg9YUU3XsPU5gudTxwNkZ6RdXIrKfGGY",
  authDomain: "dragndrop-s3.firebaseapp.com",
  projectId: "dragndrop-s3",
  storageBucket: "dragndrop-s3.appspot.com",
  messagingSenderId: "182249335211",
  appId: "1:182249335211:web:4072d7488ba5dcbb424aee"
};

export default firebaseConfig;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth };