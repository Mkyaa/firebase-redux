import React from 'react'

//assets images
import pfp from '../../assets/images/pfp.jpg'


const UserDetails = ({user}) => {
  return (
    <div className='w-full sm:w-96 min-w-[300px] flex flex-col justify-center items-center  bg-gray-100 gap-4 py-10'>
                    {
                        user?.photoURL
                            ? <img src={user.photoURL} alt={user.displayName} className='w-24 h-24 rounded-full object-cover ' />
                            : <img src={pfp} alt="placeholder" className='w-24 h-24 rounded-full object-cover' />
                    }
                    <p className='text-base'>{user?.email}</p>
                    <div className='flex flex-col gap-2 text-center'>
                        <p className='font-medium'>Full Name</p>
                        <p>{user?.displayName ? user.displayName : '-'}</p>
                        <p className='font-medium'>Phone</p>
                        <p>{user?.phone ? user.phone : '-'}</p>
                        <p className='font-medium'>Email Verified</p>
                        <p>{user?.emailVerified ? 'Verified' : 'Not Verified'}</p>
                    </div>
                </div>
  )
}

export default UserDetails