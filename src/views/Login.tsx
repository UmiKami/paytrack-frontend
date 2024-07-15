import { Link, useNavigate } from "react-router-dom"
import axios from "../components/axiosConfig"
import { useEffect } from "react"

const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {  
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") == "admin") {
                navigate("/admin/employee-management")
            } else {
                navigate("/employee/dashboard")
            }
        }
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        axios.post("/login", {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }).then((response) => {
            console.log(response)
            
            if (response.data["role"] == "admin") {
                localStorage.setItem("token", response.data["access_token"])
                localStorage.setItem("role", response.data["role"])

                navigate("/admin/employee-management")
            } else {
                localStorage.setItem("token", response.data["access_token"])
                localStorage.setItem("token", response.data["access_token"])

                navigate("/employee/dashboard")
            }

        }).catch((_) => {
            alert("Login failed.")
        })  
    }


    return (
        <div className="h-[100vh] relative">
            <h1 className="text-7xl text-center font-bold bg-sky-600 pb-[15vh] text-white text-shadow">PayTrack</h1>

            <form className="xl:w-[30%] md:w-[60%] sm:w-[80%] w-[100%] flex flex-col gap-3 rounded-lg px-20 py-10 bg-white drop-shadow-lg absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" onSubmit={handleSubmit}>
                <div className="text-gray-600">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" className="block w-full rounded-2xl p-2 my-2 border-[1px] border-opacity-40 border-gray-500" />
                </div>

                <div className="text-gray-600">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                </div>

                <button type="submit" className="bg-sky-600 rounded-2xl text-white p-2 text-xl w-full my-2">Log in</button>

                <Link to="/forgot-passoword" className="text-center text-lg text-sky-500">Forgot password?</Link>
                <hr />
                <Link to="/employee/register" className="text-center text-lg text-sky-500">New User Registration</Link>
            </form>
        </div>
    )
}

export default Login