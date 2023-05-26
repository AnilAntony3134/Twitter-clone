import { useUser } from '@clerk/nextjs'
import React from 'react'
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'
import {SiDevpost} from 'react-icons/si'
import {FaHackerrank} from 'react-icons/fa'
import ProfileCard from './profileCard'
import UserCard from './userCard'

const RightFeed = () => {
    const { user } = useUser()
    if (!user) return <div />
    return (
        <div className='fixed right-0 ml-2 mt-6 w-1/6 mr-2'>
            <div className="p-8 flex flex-col items-left justify-between bg-[#121212] rounded-md">
                <h2 className='text-gray-400'>Suggestion for you</h2>
                <UserCard image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" name='Sreejitk' desc="product manager" followed={true}/>
                <UserCard image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" name='Sreejitk' desc="product manager" followed={true}/>
                <UserCard image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" name='Sreejitk' desc="product manager" followed={true}/>
            <p className='text-blue-400 text-center mt-2'>Show more</p>
            </div>
            <div className="p-8 flex flex-col items-left justify-between bg-[#121212] mt-2 rounded-md">
                <h2 className='text-gray-400'>Hacker Accounts</h2>
                <ProfileCard icon={FaHackerrank} name='HackerEarth' linked={false}/>
                <ProfileCard icon={SiDevpost} name='DevPost' linked={false}/>
                <ProfileCard icon={FiGithub} name='Github' linked={false}/>
                <ProfileCard icon={FiLinkedin} name='LinkedIn' linked={false}/>
            </div>
        </div>
    )
}

export default RightFeed