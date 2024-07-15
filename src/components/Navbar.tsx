import { Link } from "react-router-dom"
import Dropdown from "./Dropdown"

export const Navbar = () => {

    const handleClick = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }

    const isLoggedIn = !!localStorage.getItem('token'); // Assuming a token is stored in localStorage when logged in


    return (
        <nav className="w-100 flex justify-between px-2 py-1 bg-sky-400 text-white">
            <ul className="lg:w-[25%] md:w-[35%] sm:w-[50%] w-[100%] flex justify-between">
                <li>User</li>
                <li>Edit</li>
                <li>
                    <Dropdown />
                </li>
                <li>Tools</li>
                <li>Help</li>
            </ul>
            {isLoggedIn && <Link to="/" onClick={handleClick} className="px-4 bg-sky-600 rounded-md">
                Log Out
            </Link>}
        </nav>
    )
}
