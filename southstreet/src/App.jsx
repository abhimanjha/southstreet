import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ShopContextProvider } from './context/ShopContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Men from './pages/Men'
import Women from './pages/Women'
import About from './pages/About'
import Collections from './pages/Collections'
import NewArrivals from './pages/NewArrivals'
import Sale from './pages/Sale'
import Cart from './pages/Cart'
import Search from './pages/Search'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'
import FAQ from './pages/FAQ'
import SizeGuide from './pages/SizeGuide'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import UserDashboard from './pages/UserDashboard'
import OrderConfirmation from './pages/OrderConfirmation'
import InvoicePreview from './pages/InvoicePreview'
import Orders from './pages/Orders'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AddProduct from './pages/admin/AddProduct'
import OrderDetail from './pages/admin/OrderDetail'
import LowStock from './pages/admin/LowStock'
import Categories from './pages/admin/Categories'
import Discounts from './pages/admin/Discounts'
import Users from './pages/admin/Users'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'
import EditProduct from './pages/admin/EditProduct'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'
import './App.css'

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ShopContextProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin' element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path='products' element={<AdminProducts />} />
                <Route path='products/add' element={<AddProduct />} />
                <Route path='orders' element={<AdminOrders />} />
                <Route path='orders/:id' element={<OrderDetail />} />
                <Route path='low-stock' element={<LowStock />} />
                <Route path='users' element={<Users />} />
                <Route path='categories' element={<Categories />} />
                <Route path='discounts' element={<Discounts />} />
                <Route path='reports' element={<Reports />} />
                <Route path='settings' element={<Settings />} />
                <Route path='products/edit/:id' element={<EditProduct />} />
              </Route>
            </Route>

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="new-arrivals" element={<NewArrivals />} />
              <Route path="men" element={<Men />} />
              <Route path="women" element={<Women />} />
              <Route path="sale" element={<Sale />} />
              <Route path="about" element={<About />} />
              <Route path="collections" element={<Collections />} />
              <Route path="cart" element={<Cart />} />
              <Route path="search" element={<Search />} />
              <Route path="product/:productId" element={<Product />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="contact" element={<Contact />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="returns" element={<Returns />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="size-guide" element={<SizeGuide />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />

              <Route path="cookies" element={<CookiePolicy />} />
              <Route path="account" element={<UserDashboard />} />
              <Route path="account/orders" element={<Orders />} />
              <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="invoice-preview" element={<InvoicePreview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </GoogleOAuthProvider>
  )
}



export default App

