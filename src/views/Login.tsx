import { Link } from "react-router-dom"
import axios from "../components/axiosConfig"

const Login = () => {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        axios.post("/login", {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }).then((response) => {
            console.log(response)
            alert("Login successful.")
        }).catch((error) => {
            console.log(error)
        })  
    }


    return (
        <div className="h-[100vh]">
            <h1 className="text-white font-black">PayTrack</h1>

            <form onSubmit={handleSubmit}>
                <div className="">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" className="block w-full p-2 my-2" />
                </div>

                <div className="">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="block w-full p-2 my-2" />
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full my-2">Login</button>

                <Link to="/forgot-passoword" className="text-center">Forgot password?</Link>
                <hr />
                <Link to="/register" className="text-center">New User Registration</Link>
            </form>
        </div>
    )
}

export default Login