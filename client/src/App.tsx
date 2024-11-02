import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import GraphProvider from "./providers/GraphProvider";
import { useUser } from "./providers/UserProvider";

function App() {
  const {user} = useUser()
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
        {user && <div className="hidden sm:block col-span-2">
          <Sidebar />
        </div>}
        <div className={`${user ? 'col-span-10': 'col-span-12'}`}>
          <GraphProvider>
            <Outlet />
          </GraphProvider>
        </div>
      </div>
    </>
  );
}

export default App;
