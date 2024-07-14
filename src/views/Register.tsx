import { Link, useNavigate } from "react-router-dom"
import axios from "../components/axiosConfig";

const Register = () => {
    const navigate = useNavigate()

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
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="h-[100vh]">
            <h1 className="text-white font-black">PayTrack</h1>

            <p className="text-center">New User Registration</p>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" className="block w-full p-2 my-2" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="block w-full p-2 my-2" />
                </div>

                <div> 
                    <label htmlFor="secQuestion">Security Question</label>
                    <input type="text" name="secQuestion" id="secQuestion" className="block w-full p-2 my-2" />
                </div>

                <div>
                    <label htmlFor="secAnswer">Security Answer</label>
                    <input type="text" name="secAnswer" id="secAnswer" className="block w-full p-2 my-2" />
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full my-2">Save</button>
                <Link to="/" className="bg-blue-500 text-white p-2 rounded w-full my-2">Cancel</Link>
                <hr />
                <p>Already have an account? <Link to="/login">Login</Link> </p>
            </form>
        </div>
    )
}

export default Register