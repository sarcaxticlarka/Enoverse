import React from 'react'
import logo from '../assets/logo.png'

const Logo = () => {
    return (
        <div className='relative z-50 -left-10 -top-10  '>
            <img className=' right-200 bottom-[1100%] w-65 rotate-[-40deg]' src={logo} alt="" />

        </div>
    )
}

export default Logo