import React, { useEffect, useState } from 'react'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { login, logoutHandle } from '../../redux/app/auth/authSlice'

//styles
import styles from './index.module.css'

//react router dom
import { useNavigate } from 'react-router-dom'

//firebase
import { emailVerification, logout, update } from '../../firebase/firebase'

//react hot toast
import { toast } from 'react-hot-toast'
import UserDetails from '../../component/userDetails'

const Dashboard = () => {

    //redux
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    //local state
    const [displayName, setDisplayName] = useState(user?.displayName || '')
    const [email, setEmail] = useState(user?.email || '')
    const [phone, setPhone] = useState(user?.phone || '')
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '')
    const [emailVerified, setEmailVerified] = useState(user?.emailVerified || false)
    const [uid, setUid] = useState(user?.uid || '')

    //react router dom
    const navigate = useNavigate()


    useEffect(() => {
        console.log(user)
    }, [user])

    //signout
    const handleSignOut = async () => {
        try {
            await logout()
            dispatch(logoutHandle())
            toast.success('Sign Out Successfully')
            navigate('/login')
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //change input
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        switch (name) {
            case 'name':
                setDisplayName(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'phone':
                setPhone(value)
                break;
            case 'photo':
                setPhotoURL(value)
                break;
            case 'emailVerified':
                setEmailVerified(value)
                break;
            default:
                break;
        }
    }

    //update profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            await update({
                displayName,
                email,
                photoURL,
                phone,
                emailVerified,
            })
            dispatch(login({
                displayName,
                email,
                photoURL,
                phone,
                emailVerified,
                uid
            }))
            toast.success('Profile Updated Successfully')
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    //verify email
    const handleVerifyEmail = async () => {
        try {
            await emailVerification()
            toast.success('Check your email for verification link')
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <section className='max-w-5xl mx-auto relative'>
            <h1 className='text-4xl text-center my-10 gap-4'>Dashboard</h1>
            <span className='absolute right-0 top-4 text-gray-400 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
            <div className='flex flex-wrap sm:flex-nowrap justify-center sm:justify-normal mx-4 sm:mx-0 '>
                <UserDetails user={user} />
                <div className='w-full mx-6 flex flex-col gap-4 my-2 sm:my-0'>
                    <form className='w-full flex flex-col gap-4 my-2 sm:my-0'>
                        <h2 className='text-xl mb-4'>Update Profile</h2>
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" placeholder='John Q' onChange={handleChange} name="name" id="name" />
                        </div>
                        <div>
                            <label htmlFor='phone'>Phone</label>
                            <input type="tel" placeholder='05*********' onChange={handleChange} name="phone" id="phone" />
                        </div>
                        <div>
                            <label htmlFor='photo'>Photo URL</label>
                            <input type="text" placeholder='http://via.placeholder.com/640x360' onChange={handleChange} name="photo" id="photo" />
                        </div>

                        <div className='text-center'>
                            <button type='submit' className='bg-blue-500 text-white py-2 w-2/3 ' onClick={handleUpdateProfile} >Update</button>
                        </div>
                    </form>
                    <div>
                        <label>Email Verified</label>
                        <button disabled={user?.emailVerified} onClick={handleVerifyEmail} className='cursor-pointer ml-3 bg-gray-300 text-white py-2 px-6 rounded disabled:bg-gray-100 disabled:cursor-auto '>Verify</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard