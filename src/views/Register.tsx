import { Link, useNavigate, useSearchParams } from "react-router-dom"
import axios from "../components/axiosConfig";
import { useEffect, useState } from "react";

const Register = () => {
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const [showTokenInput, setShowTokenInput] = useState(false)

    useEffect(() => {
        if (searchParams.get("token") === null) {
            alert("You need a token to register. Please input it in the token field. Otherwsie please reach out to the admin team to send you one.")
            setShowTokenInput(true)
        }
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        axios.post("/employee/register", {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            security_question_1: e.currentTarget.secQuestion.value,
            security_answer_1: e.currentTarget.secAnswer.value
        }).then((response) => {
            console.log(response)
            alert("Registration successful. Please login to continue.")
            setShowTokenInput(false)
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="h-[100vh] relative">
            <h1 className="text-7xl text-center font-bold bg-sky-600 pb-[15vh] text-white text-shadow">PayTrack</h1>

            <form className="xl:w-[30%] md:w-[60%] sm:w-[80%] w-[100%] flex flex-col gap-3 rounded-lg px-20 py-10 bg-white drop-shadow-lg absolute top-[36%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                </div>

                <div> 
                    <label htmlFor="secQuestion">Security Question</label>
                    <input type="text" name="secQuestion" id="secQuestion" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                </div>

                <div>
                    <label htmlFor="secAnswer">Security Answer</label>
                    <input type="text" name="secAnswer" id="secAnswer" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                </div>

                {showTokenInput && <div>
                    <label htmlFor="token" className="text-red-500 animate-pulse">Token</label>
                    <input type="text" name="token" id="token" placeholder="Place your token here" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />    
                </div>}

                <button type="submit" className="text-center bg-blue-500 text-white rounded-2xl p-2  w-full my-2">Save</button>
                <Link to="/" className="text-center bg-red-500 text-white p-2  rounded-2xl w-full my-2">Cancel</Link>
                <hr />
                <p className="text-center">Already have an account? <Link className="text-lg text-sky-500" to="/login">Login</Link> </p>
            </form>
        </div>
    )
}

export default Register