import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'


const Navbar = () => {

    return (
        <div className="navbar flex justify-between text-lg mx-3 mt-3 mb-6">
            <a href="/blockexplorer">
                <h1 className="logo text-[#6b6869]">EthExplorer</h1>
            </a>
            <nav className="links flex gap-2 md:gap-5 lg:gap-7 text-[#a07281]">
                <Link to="/blockexplorer">
                    <Button variant='outlined' size='small'>Home</Button>
                </Link>
                <Link to="/contact">
                    <Button variant='outlined' size='small'>Contact</Button>
                </Link>
            </nav> 
        </div>
    )
}

export default Navbar
