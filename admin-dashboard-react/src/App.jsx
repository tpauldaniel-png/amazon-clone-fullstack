import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/login';
import {AdminDashboard} from './pages/AdminDashboard';
import {AddProduct} from './pages/AddProduct';
import {UpdateProduct} from './pages/UpdateProduct';
import {DeleteProduct} from './pages/DeleteProduct';
import {ProductList} from './pages/ProductList';
import {OrderList} from './pages/OrderList';
import {UserList} from './pages/UserList';
import {AdminDashboardHome} from './pages/AdminDashboardHome';

import './App.css'



function App() {
  

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminDashboardHome />}></Route>
            <Route path="addProduct" element={<AddProduct />}></Route>
            <Route path="updateProduct/:productId" element={<UpdateProduct />}></Route>
            <Route path="productList" element={<ProductList />}></Route>
            <Route path="orderList" element={<OrderList />}></Route>
            <Route path="userList" element={<UserList />}></Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
