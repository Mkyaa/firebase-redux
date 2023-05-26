import React, { useState } from 'react'

//react-icons
import { FcGoogle } from 'react-icons/fc'

//react router dom
import { useNavigate } from 'react-router-dom'

//firebase
import { googleLogin, signIn } from '../../firebase/firebase'

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
      const result = await signIn(email, password)
      if (result) {
        toast.success('Giriş başarılı')
        navigate('/dashboard')
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  // google login
  const handleGoogle = async () => {
    try {
      await googleLogin()
      toast.success('Giriş başarılı')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='max-w-2xl mx-4 sm:mx-auto mt-20 flex flex-col border rounded-lg shadow-xl py-20 px-6 sm:p-20 gap-4 '>
      <h1 className='text-4xl text-center'>Login</h1>
      <form className='flex flex-col gap-4 '>
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
      <div className='flex mx-auto items-center border px-5 py-3 rounded-lg cursor-pointer hover:shadow-lg mt-4' onClick={handleGoogle} >
      <FcGoogle className='' size={30} onClick={handleGoogle}/> 
      <p className='text-gray-500 ml-2 '>Google</p>
      </div>
    </div>

  )
}

export default Login