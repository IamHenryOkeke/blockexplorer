import React from 'react'
import { Button } from '@mui/material'

const Navbar = () => {

    return (
        <div className="navbar flex justify-between text-lg">
            <a href="/blockexplorer">
                <h1 className="logo text-[#6b6869]">EthExplorer</h1>
            </a>
            <div className="links flex gap-2 md:gap-5 lg:gap-7 text-[#a07281]">
                <Button variant='outlined'>Home</Button>
                <Button variant='outlined'>Contact</Button>
            </div>
        </div>
    )
}

export default Navbar
