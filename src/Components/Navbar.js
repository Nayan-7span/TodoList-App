import React from 'react'

function Navbar() {
  return (
    <div className="navbar p-4 md:p-6 bg-yellow-300 flex space-x-1 items-center justify-center ">
        <img src="https://img.icons8.com/sf-regular-filled/48/000000/note.png" alt='notelogo'/>
        <h1 className=' text-xl md:text-3xl font-extrabold underline underline-offset-8'>KeepNotes</h1>
    </div>
  )
}

export default Navbar
