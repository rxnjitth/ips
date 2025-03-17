import React from 'react'
import technical from '../assets/technical.png'
import community from '../assets/community.png'
import innovation from '../assets/innovation.png'
const InfoBox = ({title,description}) => {
  return (
    <div className='md:w-[400px] rounded-2xl shadow-lg flex flex-col justify-between space-y-5 p-5 px-10 font-primary '>
        <div>
            {title === "Technical Workshops" ? <img src={technical} alt="Workshop"/> : title === "Community Event" ?<img src={community} alt="Community" />: <img src={innovation} alt="Innovation"/>}
        </div>
        <div className='font-semibold text-2xl'>{title}</div>
        <div className='font-light text-gray-700 text-sm'>{description}</div>
    </div>
  )
}

export default InfoBox

