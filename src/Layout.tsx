import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import ForgotPassword from './views/ForgotPassword'
import Login from './views/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element/>
        <Route path='/admin/employee-management' element/>
        <Route path='/employee/dashboard' element/>
        <Route path='/employee/attendance' element/>
        <Route path='/employee/deductions' element/>
        <Route path='/employee/payroll' element/>
        <Route path='/employee/password-creation' element/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
