import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-purple-700 text-white py-2 px-5' >
        <div className="left font-bold text-[25px]">myTask</div>
        <div className="right flex gap-4 text-[20px]">
            <div className="Home hover:font-bold w-[60px] transition-all duration-200">Home</div>
            <div className="About hover:font-bold w-[60px] transition-all duration-200 ">About</div>
            <div className="Tasks hover:font-bold w-[60px] transition-all duration-200 ">Tasks</div>
        </div>
    </nav>
  )
}

export default Navbar