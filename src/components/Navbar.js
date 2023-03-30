// import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <div className="navbar flex justify-between text-lg">
            <h1 className="logo text-[#6b6869]">EthExplorer</h1>
            <div className="links flex gap-2 text-[#a07281]">
                <a href="/">
                    Home
                </a>
                <a href="/">
                    Contact
                </a>
            </div>
        </div>
    )
}

export default Navbar
