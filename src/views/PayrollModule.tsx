import { FormEvent, useEffect, useState } from "react"
import axios from "../components/axiosConfig"
import { useNavigate } from "react-router-dom";

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

const PayrollModule = () => {
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [employeeId, setEmployeeId] = useState<string>('')
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [newPayroll, setNewPayroll] = useState<Partial<Payroll>>({})
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }

        // Check user role
        const userRole = localStorage.getItem("role")
        setIsAdmin(userRole === 'admin')

        axios.get("/employee/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            setEmployee(response.data)
            setEmployeeId(response.data.employee_id)
        }).catch((error) => {
            if (error.response.status === 401) {
                confirm("Unauthorized access. Please login.")

                localStorage.removeItem("token")
                localStorage.removeItem("role")

                navigate("/login")
            }

            alert("Failed to fetch employee information.")
        })
    }, [navigate])

    const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeId(e.target.value)
    }

    const handleEmployeeFetch = (e: FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token) return

        axios.get(`/manage/employee/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            setEmployee(response.data)
        }).catch((error) => {
            if (error.response.status === 401) {
                confirm("Unauthorized access. Please login.")

                localStorage.removeItem("token")
                localStorage.removeItem("role")

                navigate("/login")
            } else if (error.response.status === 403) {
                alert("You are not authorized to perform this action.")
            } else if (error.response.status === 404) {
                alert("Employee not found.")
            } else {
                alert("Failed to fetch employee information.")
            }
        })
    }

    const handlePayrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewPayroll((prevPayroll) => ({ ...prevPayroll, [name]: value }))
    }

    const handlePayrollSubmit = (e: FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token || !employee) return

        axios.post(`/admin/employee/${employee.employee_id}/payroll/create`, newPayroll, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            alert("Payroll created successfully!")
            setNewPayroll({})
            handleEmployeeFetch(e) // Refresh the employee data to include the new payroll
        }).catch((error) => {
            if (error.response.status === 401) {
                confirm("Unauthorized access. Please login.")

                localStorage.removeItem("token")
                localStorage.removeItem("role")

                navigate("/login")
            } else if (error.response.status === 403) {
                alert("You are not authorized to perform this action.")
            } else if (error.response.status === 404) {
                alert("Employee not found.")
            } else {
                alert("Failed to create payroll.")
            }
        })
    }

    return (
        <div className="p-6">
            <form onSubmit={handleEmployeeFetch} className="mb-4">
                <label htmlFor="employeeID" className="block text-sm font-medium text-gray-700">Employee ID</label>
                <input type="text" name="employee_id" id="employeeID" value={employeeId} onChange={handleEmployeeIdChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2">Fetch Employee</button>
            </form>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="personal_email" id="email" value={employee?.personal_email || ''} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" name="phone" id="phone" value={employee?.phone || ''} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                    <input type="text" name="department" id="department" value={employee?.department || ''} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input type="text" name="position" id="position" value={employee?.position || ''} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                </div>
            </div>
            <hr className="my-4" />
            <div className="text-lg font-bold mb-2">Payroll Records</div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            {[
                                'Payroll ID',
                                'Pay Date',
                                'Gross Salary',
                                'Net Salary',
                                'Tax Deduction',
                                'Hours Worked',
                                'Hourly Rate'
                            ].map((header) => (
                                <th className="bg-gray-200 text-gray-600 text-left px-4 py-2" key={header}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employee && employee.payrolls.length > 0 ? (
                            employee.payrolls.map((payroll) => (
                                <tr key={payroll.payroll_id}>
                                    <td className="border px-4 py-2">{payroll.payroll_id}</td>
                                    <td className="border px-4 py-2">{payroll.pay_date}</td>
                                    <td className="border px-4 py-2">{payroll.gross_salary}</td>
                                    <td className="border px-4 py-2">{payroll.net_salary}</td>
                                    <td className="border px-4 py-2">{payroll.tax_deduction}</td>
                                    <td className="border px-4 py-2">{payroll.hours_worked}</td>
                                    <td className="border px-4 py-2">{payroll.hourly_rate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="border px-4 py-2 text-center">No payrolls</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isAdmin && (
                <form onSubmit={handlePayrollSubmit} className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="pay_date" className="block text-sm font-medium text-gray-700">Pay Date</label>
                            <input type="date" name="pay_date" id="pay_date" value={newPayroll.pay_date || ''} onChange={handlePayrollChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="hours_worked" className="block text-sm font-medium text-gray-700">Hours Worked</label>
                            <input type="number" name="hours_worked" id="hours_worked" value={newPayroll.hours_worked || ''} onChange={handlePayrollChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="hourly_rate" className="block text-sm font-medium text-gray-700">Hourly Rate</label>
                            <input type="number" name="hourly_rate" id="hourly_rate" value={newPayroll.hourly_rate || ''} onChange={handlePayrollChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="tax_deduction" className="block text-sm font-medium text-gray-700">Tax Deduction</label>
                            <input type="number" name="tax_deduction" id="tax_deduction" value={newPayroll.tax_deduction || ''} onChange={handlePayrollChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                        </div>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md mt-2">Add Payroll</button>
                </form>
            )}
        </div>
    )
}

export default PayrollModule
