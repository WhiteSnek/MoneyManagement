import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'

function App() {

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
        <div className='hidden sm:block col-span-2'>
        <Sidebar />
        </div>
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
