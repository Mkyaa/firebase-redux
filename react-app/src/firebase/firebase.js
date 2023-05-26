import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

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

const provider = new GoogleAuthProvider();
const auth = getAuth()


//register
export const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password,)
        return true
    }
    catch (error) {
        error.code === 'auth/email-already-in-use'
            ? toast.error('Email Already In Use')
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
        return true
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

//google login
export const googleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        store.dispatch(login({
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid
        }))
        return true
    } catch (error) {
        error.code === 'auth/account-exists-with-different-credential'
            ? toast.error('Account Exists With Different Credential')
            : error.code === 'auth/auth-domain-config-required'
                ? toast.error('Auth Domain Config Required')
                : error.code === 'auth/cancelled-popup-request'
                    ? toast.error('Cancelled Popup Request')
                    : error.code === 'auth/credential-already-in-use'
                        ? toast.error('Credential Already In Use')
                        : error.code === 'auth/operation-not-allowed'
                            ? toast.error('Operation Not Allowed')
                            : error.code === 'auth/operation-not-supported-in-this-environment'
                                ? toast.error('Operation Not Supported In This Environment')
                                : error.code === 'auth/popup-blocked'
                                    ? toast.error('Popup Blocked')
                                    : error.code === 'auth/popup-closed-by-user'
                                        ? toast.error('Popup Closed By User')
                                        : error.code === 'auth/unauthorized-domain'
                                            ? toast.error('Unauthorized Domain')
                                            : toast.error(error.message)
    }
}