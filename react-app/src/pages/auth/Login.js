import React, { useState } from 'react'

//react router dom
import { useNavigate } from 'react-router-dom'

//firebase
import { signIn } from '../../firebase/firebase'

//react hot toast
import { toast } from 'react-hot-toast'

const Login = () => {

  //state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //navigate
  const navigate = useNavigate()

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await signIn(email, password)
      if (user) {
        toast.success('Login successfully')
        navigate('/dashboard')
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form className='max-w-2xl mx-auto mt-20 flex flex-col gap-4 border rounded-lg shadow-xl p-20'>
      <h1 className='text-4xl text-center'>Login</h1>
      <div className='mt-10'>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='text-center'>
        <p className='text-lg'>Don't have an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/signUp')}>Sign Up</span></p>
      </div>
      <button type="submit" className='bg-blue-600 py-4 rounded text-lg text-white font-medium tracking-wide hover:bg-blue-500' onClick={handleSubmit} >Login</button>
    </form>
  )
}

export default Login