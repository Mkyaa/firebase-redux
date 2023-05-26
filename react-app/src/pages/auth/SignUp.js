import React, { useState } from 'react'

//firebase
import { register } from '../../firebase/firebase'

//react hot toast
import { toast } from 'react-hot-toast'

//react router dom
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    //state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //navigate
    const navigate = useNavigate()

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const result = await register(email, password)
          if (result) {
            toast.success('Account created successfully')
            navigate('/login')
          }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-2xl mx-4 sm:mx-auto mt-20 flex flex-col gap-4 border rounded-lg shadow-xl py-20 px-6 sm:p-20'>
            <h1 className='text-4xl text-center'>Sign Up</h1>
            <div className='mt-10'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* login for signed acc */}
            <div className='text-center text-lg'>
                <p>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
            </div>
            <button disabled={!password || !email} className='bg-blue-600 py-4 rounded text-lg text-white font-medium tracking-wide hover:bg-blue-500 cursor-pointer' onClick={handleSubmit} >Sign Up</button>
        </form>
    )
}

export default SignUp