import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1g_VTP4V4MBDeT8OJcB28ogjKedMNcAg",
  authDomain: "mappit-c8d5d.firebaseapp.com",
  projectId: "mappit-c8d5d",
  storageBucket: "mappit-c8d5d.appspot.com",
  messagingSenderId: "233256493371",
  appId: "1:233256493371:web:00a95f440a246cde9ed71e",
  measurementId: "G-WBQPW3XYQT",
};

const firebaseApp = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { firebaseApp };
