import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../config/firebase.js';
import { validateUser } from '../api/oAuth.js';
import Logout from '../components/logout.js';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [ auth, setAuth ] = useState(false || window.localStorage.getItem("auth") === "true");
    const [ user, setUser ] = useState(null)
    const navigate = useNavigate();
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        const userCred = await signInWithPopup(firebaseAuth, provider);
        if (userCred) {
            setAuth(true);
            window.localStorage.setItem("auth", "true");
            const token = await userCred.user.getIdToken();
            console.log(token);
            const data = await validateUser(token);
            setUser(data.user);
            navigate('/request', { state: { user: data.user } });
        }
    };

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred){
                userCred.getIdToken().then(token => {
                    window.localStorage.setItem("auth", "true");
                    validateUser(token).then((data) => {
                        setUser(data.user);
                    });
                });
            } else {
                setAuth(false);
                setUser(null);
                window.localStorage.setItem("auth", "false");
            }
        })
    }, [])

    return (
        <>
        <div className='login'>
          <button onClick={loginWithGoogle}>Login</button>
        </div>
        </>
      );
    }