import { useState, useContext } from "react";
import { Menu, X, Layout } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and primary nav */}
            <div className="flex-shrink-0 flex items-center">
              <Layout className="h-8 w-8 text-indigo-600" />
              <Link to="/">
                <span className="ml-2 text-xl font-bold text-gray-900">
                  TaskFlow
                </span>
              </Link>
            </div>
            <div className="flex gap-10">
              {/* Desktop Navigation */}
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <NavLink
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-600 transition-colors duration-200"
                >
                  Home
                </NavLink>
                {user && (
                  <>
                    <NavLink
                      to="/tasks"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-600 transition-colors duration-200"
                    >
                      Tasks
                    </NavLink>
                    <NavLink
                      to="/addTask"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-600 transition-colors duration-200"
                    >
                      Add Task
                    </NavLink>
                  </>
                )}
              </div>

              {/* Secondary Nav */}
              <div className="hidden sm:flex sm:items-center">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-600 transition-colors duration-200"
            >
              Home
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/tasks"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-indigo-500 transition-colors duration-200"
                >
                  Tasks
                </NavLink>
                <NavLink
                  to="/addTask"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-indigo-500 transition-colors duration-200"
                >
                  Add Task
                </NavLink>
              </>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-indigo-500 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-indigo-500 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
