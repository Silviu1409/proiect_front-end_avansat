import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBig88AHtthzf_WD7HVhiEcyqeVMVEtASM",
  authDomain: "advanced-front-end.firebaseapp.com",
  projectId: "advanced-front-end",
  storageBucket: "advanced-front-end.appspot.com",
  messagingSenderId: "915845223257",
  appId: "1:915845223257:web:ae91edb114365f90bb7248"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);