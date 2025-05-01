import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-full max-w-4xl">
        <h1 className="font-bold text-4xl text-center text-blue-600 mb-6">
          Welcome to the AI-Mailing
        </h1>

        <nav className="flex space-x-8 mb-6 justify-center">
          <div>
            <NavLink
              to="/curate"
              className="text-xl text-gray-700 hover:text-blue-600 transition-colors"
              style={({ isActive }) => ({
                fontWeight: isActive ? "600" : "400",
                color: isActive ? "#1e3a8a" : "#4b5563", // Blue when active
              })}
            >
              CURATE EMAIL
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/reply"
              className="text-xl text-gray-700 hover:text-blue-600 transition-colors"
              style={({ isActive }) => ({
                fontWeight: isActive ? "600" : "400",
                color: isActive ? "#1e3a8a" : "#4b5563", // Blue when active
              })}
            >
              CURATE REPLY
            </NavLink>
          </div>
        </nav>
        {/* <div >
          <h1>Hello</h1>
        </div> */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;

