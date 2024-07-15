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

const EmployeeManagement = () => {
    const [employeeList, setEmployeeList] = useState<Employee[]>([])

    const [view, changeView] = useState("add")

    const navigate = useNavigate()

    useEffect(() => {

        if (!localStorage.getItem("token")) {
            navigate("/login")
        }

        axios.get("/manage/employee", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            console.log(response)
            setEmployeeList(response.data)
        }).catch((error) => {
            if (error.response.status == 401) {
                confirm("Unauthorized access. Please login.")

                localStorage.removeItem("token")
                localStorage.removeItem("role")

                navigate("/login")
            }

            alert("Failed to fetch employee list.")
        })
    }, [])

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()

        axios.post("/manage/employee/add", {
            email: e.currentTarget.email.value,
            first_name: e.currentTarget.first_name.value,
            last_name: e.currentTarget.last_name.value,
            address: e.currentTarget.address.value,
            phone: e.currentTarget.phone.value,
            position: e.currentTarget.position.value,
            department: e.currentTarget.department.value,
            start_date: e.currentTarget.start_date.value,
            salary: e.currentTarget.salary.value
        }).then((response) => {
            console.log(response)
            setEmployeeList(response.data["employee_list"])
            changeView("modify")
            alert("Employee added successfully.")
        }).catch((_) => {
            alert("Employee addition failed.")
        })
    }

    const handleCellEdit = (
        employeeIndex: number,
        field: keyof Employee,
        value: any
    ) => {
        const updatedEmployees = [...employeeList];
        updatedEmployees[employeeIndex][field] = value;
        
        saveEmployee(updatedEmployees[employeeIndex])

        setEmployeeList(updatedEmployees);
    };

    const renderEditableCell = (
        employeeIndex: number,
        field: keyof Employee,
        value: string | number,
        isEditable: boolean = true
    ) => {
        return (
            <td
                className={`border px-4 py-2 ${isEditable ? 'cursor-pointer' : ''}`}
                onDoubleClick={(e) => {
                    if (isEditable) {
                        const newValue = prompt(`Edit ${field}`, value.toString());
                        if (newValue !== null) {
                            handleCellEdit(employeeIndex, field, newValue);
                        }
                    }
                }}
            >
                {value}
            </td>
        );
    };

    const saveEmployee = (employee: Employee) => {
        axios.put(`/manage/employee/${employee.employee_id}`, {
            email: employee.personal_email,
            first_name: employee.first_name,
            last_name: employee.last_name,
            address: employee.address,
            phone: employee.phone,
            position: employee.position,
            department: employee.department,
            start_date: employee.start_date,
        }).then((response) => {
            console.log(response)
            alert("Employee updated successfully.")
        }).catch((_) => {
            alert("Employee update failed.")
        })

    }

    return (
        <div className="h-[100vh] relative">
            <h1 className="text-7xl text-center font-bold bg-sky-600 pb-[15vh] text-white text-shadow">PayTrack<br /><p className="text-base font-normal my-4">Employee Management</p></h1>

            <form className="xl:w-[85%] md:w-[90%] sm:w-[95%] w-[100%] flex flex-col gap-3 rounded-lg px-10 py-10 bg-white drop-shadow-lg absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" onSubmit={handleSubmit}>
                <ul className="flex gap-4 ">
                    <li className={`text-${view == "add" && "pink" || "sky"}-500 hover:cursor-pointer hover:text-${view == "add" && "pink" || "sky"}-600`} onClick={() => changeView("add")}>Add New Employee</li>
                    <li className={`text-${view == "modify" && "pink" || "sky"}-500 hover:cursor-pointer hover:text-${view == "add" && "pink" || "sky"}-600` }onClick={() => changeView("modify")} >Modify Employee</li>
                    <li className={`text-${view == "delete" && "pink" || "sky"}-500 hover:cursor-pointer hover:text-${view == "add" && "pink" || "sky"}-600`} onClick={() => changeView("delete")} >Delete Employee</li>
                </ul>
                {view == "add" && <>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="employeeID">Employee ID</label>
                            <input type="text" name="employeeID" id="employeeID" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" name="email" id="email" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" id="first_name" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" id="last_name" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" id="address" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" name="phone" id="phone" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="department">Department</label>
                            <input type="text" name="department" id="department" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="position">Job Title</label>
                            <input type="text" name="position" id="position" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="salary">Salary</label>
                            <input type="text" name="salary" id="salary" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                        {/* Position Type Down Below */}
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="position">Position</label>
                            <input type="text" name="position" id="position" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>

                    </div>

                    <div className="flex">
                        <div className="flex flex-col gap-2 w-[30%]">
                            <label htmlFor="start_date">Hire Date</label>
                            <input type="date" name="start_date" id="start_date" className="block rounded-2xl border-[1px] border-opacity-40 border-gray-500 w-full p-2 my-2" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="text-center bg-blue-500 text-white rounded-2xl p-2 w-[30%] my-2">Save</button>
                        <button type="reset" className="text-center bg-red-500 text-white rounded-2xl p-2 w-[30%] my-2">Cancel</button>
                    </div>
                </>}

                {view == "modify" && employeeList.length > 0 && <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    {[
                                        'Employee ID',
                                        'User ID',
                                        'Personal Email',
                                        'First Name',
                                        'Last Name',
                                        'Address',
                                        'Phone',
                                        'Position',
                                        'Department',
                                        'Start Date',
                                    ].map((header) => (
                                        <th className="bg-gray-200 text-gray-600 text-left px-4 py-2" key={header}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {employeeList.map((employee, index) => (
                                    <tr key={employee.employee_id}>
                                        {renderEditableCell(index, 'employee_id', employee.employee_id, false)}
                                        {renderEditableCell(index, 'user_id', employee.user_id, false)}
                                        {renderEditableCell(index, 'personal_email', employee.personal_email)}
                                        {renderEditableCell(index, 'first_name', employee.first_name)}
                                        {renderEditableCell(index, 'last_name', employee.last_name)}
                                        {renderEditableCell(index, 'address', employee.address)}
                                        {renderEditableCell(index, 'phone', employee.phone)}
                                        {renderEditableCell(index, 'position', employee.position)}
                                        {renderEditableCell(index, 'department', employee.department)}
                                        {renderEditableCell(index, 'start_date', employee.start_date)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>}

            </form>
        </div>
    )
}

export default EmployeeManagement