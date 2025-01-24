import React from 'react'
import DoctorLoginPage from './components/DoctorLoginPage'
import { Flex } from 'antd'
import { Route, Router, Routes ,BrowserRouter} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import DoctorsHomepage from './components/DoctorsHomepage'
import DoctorPatientsinfo from './components/DoctorPatientsinfo'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {

  const isTokenPresent = sessionStorage.getItem('token');
  return (
    <div>
      
      <BrowserRouter>
        <Routes>

          <Route path='/doctor-login' element={<DoctorLoginPage />}/>
   
       

        <Route path='/' element={<LandingPage />}/>
        <Route path='/doctor-home' element={<ProtectedRoute DoctorsHomepage  />} />
        <Route path = '/doctor-patientsinfo' element={<ProtectedRoute DoctorPatientsinfo />}/>
   
      
        </Routes>
        </BrowserRouter>
      
      
    </div>
  )
}

export default App
