import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import ProductDetail from '../Pages/ProductDetail'
import ForgetPasswrod from '../Pages/ForgetPasswrod'
import Resetpassword from '../Pages/ResetPassword'
import Dashboarad from '../Dashboard/dashboarad'
import DashboardLayout from '../Dashboard/dashboradLayout'
import AddProducts from '../Dashboard/DashboradPages/AddProducts'
import YourBag from '../Pages/YourBag'
import CheckOut from '../Pages/CheckOut'
export default function Router() {
 
    return (
        <BrowserRouter>
      <Routes>
      <Route  path='/' element={<HomePage />}/>
      <Route  path='/dashboarad' element={<Dashboarad />}/>
      <Route  path="/dashboard/*" element={<DashboardLayout />}/>
      <Route path="/dashboard/AddProducts" element={<AddProducts/>}/> 
      <Route  path='/ForgetPasswrod' element={<ForgetPasswrod />}/>
      <Route  path='/YourBag' element={<YourBag />}/>
      <Route  path='/CheckOut' element={<CheckOut />}/>
      <Route  path='/reset-password' element={<Resetpassword />}/>
      <Route  path='/ProductDetail/:id' element={<ProductDetail/>}/>      
      </Routes>
      </BrowserRouter>
  )
}
