import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import ForgotPassword from './views/ForgotPassword'
import Login from './views/Login'
import { Navbar } from './components/Navbar'
import Register from './views/Register'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employee/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element />
        <Route path='/admin/employee-management' element />
        <Route path='/employee/dashboard' element />
        <Route path='/employee/attendance' element />
        <Route path='/employee/deductions' element />
        <Route path='/employee/payroll' element />
        <Route path='/employee/password-creation' element />
        <Route path="*" element={<h1 className='text-4xl animate-bounce text-red-600 text-center font-black my-[35%]'>404 Not Found! <br/> <Link to={"/"} className='text-purple-600 underline'>Back to home page</Link> </h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
