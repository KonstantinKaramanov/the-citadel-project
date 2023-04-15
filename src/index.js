import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import firebase from 'firebase/compat/app';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo-VnJr52CECHIO0_r4HQXh_hQDcWBGkA",
  authDomain: "the-citadel-project.firebaseapp.com",
  databaseURL: "https://the-citadel-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "the-citadel-project",
  storageBucket: "the-citadel-project.appspot.com",
  messagingSenderId: "519832819116",
  appId: "1:519832819116:web:35b8d2cdf04d08c5809609"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} firebaseApp={app}>
        <App />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);