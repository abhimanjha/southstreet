import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ShopContextProvider } from './context/ShopContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Men from './pages/Men'
import Women from './pages/Women'
import About from './pages/About'
import Collections from './pages/Collections'
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
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AddProduct from './pages/admin/AddProduct'
import './App.css'

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='products/add' element={<AddProduct />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='discounts' element={<h1 style={{ fontSize: '2rem' }}>Discount Management</h1>} />
          </Route>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  )
}



export default App

