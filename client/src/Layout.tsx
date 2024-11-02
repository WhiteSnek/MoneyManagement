import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App'
import { Categories, Dashboard, Lists, Login, Register } from './pages'
import CurrencyProvider from './providers/CurrencyProvider'
import UserProvider from './providers/UserProvider'

const Layout:React.FC = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App/>}>
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='lists' element={<Lists />} />
                <Route path='categories' element={<Categories />}/>
                <Route path='login' element={<Login />}/>
                <Route path='register' element={<Register />}/>
            </Route>
        )
    )
  return (
    <UserProvider>
    <CurrencyProvider>
    <RouterProvider router={router} />
    </CurrencyProvider>
    </UserProvider>
  )
}

export default Layout
