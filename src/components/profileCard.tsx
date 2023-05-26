import React from 'react'
import { IconType } from 'react-icons'

interface IProfileProps{
    icon: IconType,
    name: string,
    linked: boolean
}

const ProfileCard = (props: IProfileProps) => {
  return (
    <div className="border-slate-400 py-4 flex items-center justify-between">
                <props.icon className='text-2xl'/>
                <div className='mr-6 w-24'>
                    <h4 className='font-bold text-xl'>{props.name}</h4>
                    <p className={`text-gray-400 text-xs ${props.linked ? 'text-green-400' : 'text-red-400'}`}>{props.linked ? 'Linked' : 'Unlinked'}</p>
                </div>
                {/* <p className='text-gray-400 text-sm'>{props.linked ? 'Open' : 'Link'}</p> */}
            </div>
  )
}

export default ProfileCard