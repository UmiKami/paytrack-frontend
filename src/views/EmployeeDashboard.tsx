import { FormEvent, useEffect, useState } from "react"
import axios from "../components/axiosConfig"
import { Link, useNavigate } from "react-router-dom";

interface Payroll {
    payroll_id: string;
    employee_id: string;
    pay_date: string;
    gross_salary: number;
    net_salary: number;
    tax_deduction: number;
    hours_worked: number;
    hourly_rate: number;
}

interface Employee {
    employee_id: string;
    user_id: string;
    personal_email: string;
    first_name: string;
    last_name: string;
    address: string;
    phone: string;
    position: string;
    department: string;
    start_date: string;
    payrolls: Payroll[];
}

const EmployeeDashboard = () => {
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [isEditable, setIsEditable] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }

        axios.get("/employee/dashboard", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            console.log(response)
            setEmployee(response.data)
        }).catch((error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                confirm("Unauthorized access. Please login.")

                localStorage.removeItem("token")
                localStorage.removeItem("role")

                navigate("/login")
            }

            alert("Failed to fetch employee information.")
        })
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!employee) return

        axios.put(`/manage/employee/${employee.employee_id}`, {
            email: employee.personal_email,
            phone: employee.phone,
            position: employee.position,
            department: employee.department
        }).then((response) => {
            console.log(response)
            alert("Employee updated successfully.")
        }).catch((_) => {
            alert("Employee update failed.")
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!employee) return
        const { name, value } = e.target
        setEmployee({ ...employee, [name]: value })
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-7xl w-[100%] mb-5 text-center font-bold bg-sky-600 p-[2vh] text-white text-shadow">PayTrack <br /><p className="text-base font-normal my-3">Employee Dashboard</p></h1>

            <form className="space-y-6 w-[80%] rounded-lg p-5 shadow-sm shadow-black" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="employeeID" className="block text-sm font-medium text-gray-700">Employee ID</label>
                        <input type="text" name="employee_id" id="employeeID" value={employee?.employee_id || ''} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="personal_email" id="email" value={employee?.personal_email || ''} onChange={handleChange} disabled={!isEditable} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" name="phone" id="phone" value={employee?.phone || ''} onChange={handleChange} disabled={!isEditable} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <input type="text" name="department" id="department" value={employee?.department || ''} onChange={handleChange} disabled={!isEditable} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input type="text" name="position" id="position" value={employee?.position || ''} onChange={handleChange} disabled={!isEditable} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                    </div>
                </div>
                <button type="button" onClick={() => setIsEditable(true)} className="mt-4 text-blue-500 hover:underline">Update Information</button>
                <hr className="my-4" />
                <div className="text-lg font-bold">Leave Requests</div>
                <Link to={""} className="text-lg font-medium text-sky-500">Leave History</Link>
                <Link to={""} className="text-lg font-medium text-sky-500">Create New Leave Request</Link>
                <hr className="my-4" />
                <div className="text-lg font-bold">Payroll</div>
                <Link to={"/payrolls"} className="text-lg font-medium  text-sky-500" >View Payroll Records</Link>
                <hr className="my-4" />
                <div className="text-lg font-bold ">Attendance</div>
                <Link to={""} className="text-lg font-medium text-sky-500">View Attendance Records</Link>
                <div className="mt-6 flex justify-end space-x-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                    <button type="button" onClick={() => setIsEditable(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EmployeeDashboard
