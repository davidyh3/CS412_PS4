import { getApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDSEhHnmdke4zfd90Lkwk4lm1LmcTIHdXE",
    authDomain: "project-383006.firebaseapp.com",
    projectId: "project-383006",
    storageBucket: "project-383006.appspot.com",
    messagingSenderId: "259863739990",
    appId: "1:259863739990:web:cc1692de106ea06ec745f7",
    measurementId: "G-Y1FJ5ZP5ZZ"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export { app };