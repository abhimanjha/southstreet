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
import Login from './pages/Login'
import Search from './pages/Search'
import './App.css'

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="about" element={<About />} />
            <Route path="collections" element={<Collections />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  )
}


export default App

