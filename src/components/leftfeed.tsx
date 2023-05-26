import { useUser } from '@clerk/nextjs'
import React from 'react'
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'
import {SiDevpost} from 'react-icons/si'
import {FaHackerrank} from 'react-icons/fa'
import ProfileCard from './profileCard'
import UserCard from './userCard'

const Leftfeed = () => {
    const { user } = useUser()
    if (!user || !user.fullName || !user.username) return <div />
    return (
        <div className='fixed bg-[#121212] ml-2 rounded-md mt-6 w-1/8'>
            <UserCard image={user.profileImageUrl} name={user.fullName} desc={user.username}/>
            <div className="p-8 flex flex-col items-left justify-between">
                <h2 className='text-gray-400'>YOUR PAGES</h2>
                <ProfileCard icon={FiTwitter} name='Twitter' linked={true}/>
                <ProfileCard icon={FiInstagram} name='Instagram' linked={false}/>
                <ProfileCard icon={FiGithub} name='Github' linked={false}/>
                <ProfileCard icon={FiLinkedin} name='LinkedIn' linked={false}/>
            </div>
            <div className="p-8 flex flex-col items-left justify-between">
                <h2 className='text-gray-400'>Hacker Accounts</h2>
                <ProfileCard icon={FaHackerrank} name='HackerEarth' linked={false}/>
                <ProfileCard icon={SiDevpost} name='DevPost' linked={false}/>
            </div>
        </div>
    )
}

export default Leftfeed