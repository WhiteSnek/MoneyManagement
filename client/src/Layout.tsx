import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App'
import { Categories, Dashboard, Lists } from './pages'
import CurrencyProvider from './providers/CurrencyProvider'

const Layout:React.FC = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App/>}>
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='lists' element={<Lists />} />
                <Route path='categories' element={<Categories />}/>
            </Route>
        )
    )
  return (
    <CurrencyProvider>
    <RouterProvider router={router} />
    </CurrencyProvider>
  )
}

export default Layout
