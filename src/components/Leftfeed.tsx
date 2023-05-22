import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { FiSettings } from 'react-icons/fi'

const Leftfeed = () => {
    const { user } = useUser()
    if (!user) return <div />
    console.log(user)
    return (
        <div>
            <div className="border-b border-slate-400 p-8 flex items-center justify-between">
                <Image
                    src={user.profileImageUrl}
                    alt="Profile image"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full"
                />
                <div className='mr-6'>
                    <h4 className='font-bold'>{user.fullName}</h4>
                    <p className='text-gray-400'>{`@${user.username || 'nousername'}`}</p>
                </div>
                <span className='cursor-pointer'>
                    <FiSettings />
                </span>
            </div>
        </div>
    )
}

export default Leftfeed