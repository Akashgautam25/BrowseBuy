import React from 'react'
import { BrowserRouter as Akash , Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar' // adjust the path as needed
import Home from './pages/Home'
import Collection from './pages/collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Checkout'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw]'>
      <Akash>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/Footer' element ={<Footer/>}></Route>
        </Routes>

      </Akash>
    </div>
  )
}

export default App