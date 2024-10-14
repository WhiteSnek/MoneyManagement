import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'

function App() {

  return (
    <>
      <Header />
      <div className="grid grid-cols-12">
        <Sidebar />
      </div>
    </>
  )
}

export default App
