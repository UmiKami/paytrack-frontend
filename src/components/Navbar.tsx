import { Link } from "react-router-dom"

export const Navbar = () => {

    const handleClick = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }

    return (
        <div className="w-100 flex justify-between px-2 bg-sky-400 text-white">
            <ul className="lg:w-[25%] md:w-[35%] sm:w-[50%] w-[100%] flex justify-between">
                <li>User</li>
                <li>Edit</li>
                <li>Modules</li>
                <li>Tools</li>
                <li>Help</li>
            </ul>
            <Link to={"/"} onClick={handleClick}>Log Out</Link>
        </div>
    )
}
