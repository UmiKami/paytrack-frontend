import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const role = localStorage.getItem('role');
    const isLoggedIn = !!localStorage.getItem('token'); // Assuming a token is stored in localStorage when logged in

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 bg-sky-600 text-white rounded-md"
            >
                Modules
            </button>
            {isOpen && (
                <ul className="absolute bg-white text-sky-600 mt-2 rounded-md shadow-lg w-48 z-[1000]">
                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link to="/login" className="block px-4 py-2 hover:bg-sky-100">Login</Link>
                            </li>
                            <li>
                                <Link to="/employee/register" className="block px-4 py-2 hover:bg-sky-100">Register</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/payrolls" className="block px-4 py-2 hover:bg-sky-100">Payrolls</Link>
                    </li>
                    <li>
                        <Link to="/employee/dashboard" className="block px-4 py-2 hover:bg-sky-100">Employee Dashboard</Link>
                    </li>
                    {role === 'admin' && (
                        <li>
                            <Link to="/admin/employee-management" className="block px-4 py-2 hover:bg-sky-100">Admin Dashboard</Link>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
