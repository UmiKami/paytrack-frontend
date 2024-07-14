import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
    return (
        <div className=" h-[100vh]">
            <h1 className="text-7xl text-center font-bold bg-blue-600 py-[15vh] text-white text-shadow">Welcome to PayTrack</h1>
            <div className="flex flex-col h-[25vh] items-center justify-end my-auto">
                <Link to="/login" className="bg-blue-500  text-center text-2xl text-white p-2 rounded w-52 my-2">Login</Link>
                <Link to="/register" className="bg-red-500  text-center text-2xl text-white p-2 rounded w-52 my-2">Register</Link>
            </div>
        </div>
    )
}

export default Home