import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import ForgotPassword from './views/ForgotPassword'
import Login from './views/Login'
import { Navbar } from './components/Navbar'
import Register from './views/EmployeeRegister'
import EmployeeManagement from './views/EmployeeManagement'
import EmployeeDashboard from './views/EmployeeDashboard'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employee/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin/employee-management' element={<EmployeeManagement/>} />
        <Route path='/employee/dashboard' element={<EmployeeDashboard/>} />
        <Route path='/employee/attendance' element />
        <Route path='/employee/deductions' element />
        <Route path='/employee/payroll' element />
        <Route path='/employee/password-reset' element />
        <Route path="*" element={<h1 className='text-4xl animate-bounce text-red-600 text-center font-black my-[35%]'>404 Not Found! <br/> <Link to={"/"} className='text-purple-600 underline'>Back to home page</Link> </h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
