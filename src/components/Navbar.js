import React from 'react'
import { Button } from '@mui/material'

const Navbar = () => {

    return (
        <div className="navbar flex justify-between text-lg">
            <h1 className="logo text-[#6b6869]">EthExplorer</h1>
            <div className="links flex gap-2 md:gap-5 lg:gap-7 text-[#a07281]">
                <a href="/">
                    <Button variant='outlined'>Home</Button>
                </a>
                <a href="/">
                <Button variant='outlined'>Contact</Button>
                </a>
            </div>
        </div>
    )
}

export default Navbar
