import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element/>
        <Route path='/login' element/>
        <Route path='/forgot-password' element/>
        <Route path='/reset-password' element/>
        <Route path='/admin/employee-management' element/>
        <Route path='/employee/dashboard' element/>
        <Route path='/employee/attendance' element/>
        <Route path='/employee/deductions' element/>
        <Route path='/employee/payroll' element/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
