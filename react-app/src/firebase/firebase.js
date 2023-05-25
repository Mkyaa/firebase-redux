import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from "firebase/auth";

//redux
import store from "../redux/app/store";
import { login } from "../redux/app/auth/authSlice";

//react hot toast
import { toast } from "react-hot-toast";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth()

//register
export const register = async (email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password,)
        return user
    }
    catch (error) {
        error.code === 'auth/email-already-in-use'
            ? toast.error('Email already in use')
            : error.code === 'auth/invalid-email'
                ? toast.error('Invalid Email')
                : error.code === 'auth/weak-password'
                    ? toast.error('Weak Password')
                    : toast.error(error.message)
    }
}

//login
export const signIn = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password,)
        store.dispatch(login({
            displayName: user.user.displayName,
            email: user.user.email,
            emailVerified: user.user.emailVerified,
            phoneNumber: user.user.phoneNumber,
            photoURL: user.user.photoURL,
            uid: user.user.uid
        }))
        return user
    }
    catch (error) {
        error.code === 'auth/invalid-email'
            ? toast.error('Invalid Email')
            : error.code === 'auth/user-disabled'
                ? toast.error('User Disabled')
                : error.code === 'auth/user-not-found'
                    ? toast.error('User Not Found')
                    : error.code === 'auth/wrong-password'
                        ? toast.error('Wrong Password')
                        : toast.error(error.message)
    }
}


//update profile
export const update = async (obj) => {
    try {
        await updateProfile(auth.currentUser, obj)
        return true
    }
    catch (error) {
        error.code === 'auth/invalid-display-name'
            ? toast.error('Invalid Display Name')
            : error.code === 'auth/invalid-photo-url'
                ? toast.error('Invalid Photo URL')
                : toast.error(error.message)
    }
}

//email verification
export const emailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser)
        return true
    }
    catch (error) {
        error.code === 'auth/too-many-requests'
            ? toast.error('Too Many Requests')
            : toast.error(error.message)
    }
}

//signout
export const logout = async () => {
    try {
        await signOut(auth)
        return true
    }
    catch (error) {
        error.code === 'auth/too-many-requests'
            ? toast.error('Too Many Requests')
            : toast.error(error.message)
    }
}