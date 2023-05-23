import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { FiGithub, FiInstagram, FiLinkedin, FiSettings, FiTwitter } from 'react-icons/fi'
import {SiDevpost} from 'react-icons/si'
import {FaHackerrank} from 'react-icons/fa'
import ProfileCard from './profileCard'

const Leftfeed = () => {
    const { user } = useUser()
    if (!user) return <div />
    console.log(user)
    return (
        <div className='fixed '>
            <div className="border-b border-slate-400 p-8 flex items-center justify-between">
                <Image
                    src={user.profileImageUrl}
                    alt="Profile image"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full"
                />
                <div className='mx-8'>
                    <h4 className='font-bold'>{user.fullName}</h4>
                    <p className='text-gray-400'>{`@${user.username || 'nousername'}`}</p>
                </div>
                <span className='cursor-pointer'>
                    <FiSettings />
                </span>
            </div>
            <div className="border-slate-400 p-8 flex flex-col items-left justify-between">
                <h2 className='text-gray-400'>YOUR PAGES</h2>
                <ProfileCard icon={FiTwitter} name='Twitter' linked={true}/>
                <ProfileCard icon={FiInstagram} name='Instagram' linked={false}/>
                <ProfileCard icon={FiGithub} name='Github' linked={false}/>
                <ProfileCard icon={FiLinkedin} name='LinkedIn' linked={false}/>
            </div>
            <div className="border-slate-400 p-8 flex flex-col items-left justify-between">
                <h2 className='text-gray-400'>Hacker Accounts</h2>
                <ProfileCard icon={FaHackerrank} name='HackerEarth' linked={false}/>
                <ProfileCard icon={SiDevpost} name='DevPost' linked={false}/>
                <ProfileCard icon={FiGithub} name='Github' linked={false}/>
                <ProfileCard icon={FiLinkedin} name='LinkedIn' linked={false}/>
            </div>
        </div>
    )
}

export default Leftfeed