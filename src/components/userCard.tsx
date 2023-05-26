import Image from 'next/image'
import React from 'react'
import {AiOutlineLink} from 'react-icons/ai'

interface IProfileProps{
    image: string,
    name: string,
    followed?: boolean
    desc: string
}

const UserCard = (props: IProfileProps) => {
  return (
    <div className="py-4 flex items-center justify-between px-4">
    <Image
        src={props.image}
        alt="Profile image"
        width={56}
        height={56}
        className="h-14 w-14 rounded-full"
    />
    <div className='mx-4 cursor-pointer'>
        <h4 className='font-bold'>{props.name}</h4>
        <p className='text-gray-400'>{props.desc}</p>
    </div>
    {props.followed !== undefined && (
      <div className='cursor-pointer'>
          <AiOutlineLink/>
      </div>
    )}
</div>
  )
}

export default UserCard