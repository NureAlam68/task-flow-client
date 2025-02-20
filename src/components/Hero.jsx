import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import hero from "../assets/hero.jpg"


const Hero = () => {
    const {user} = useContext(AuthContext);
    return (
        <header className="bg-indigo-950 text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between py-20">
          {/* Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Manage Your Tasks <br /> with <span className="text-yellow-300">Ease & Efficiency</span>
            </h1>
            <p className="mt-8 text-lg text-gray-200">
              Boost your productivity with TaskFlow. Organize, track, and complete your tasks effortlessly.
            </p>
            <div className="mt-16">
              <Link
                to={user ? "/tasks" : "/login"}
                className="px-6 py-3 text-lg font-semibold bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-100 transition"
              >
                {user ? "View Tasks" : "Get Started"}
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="mt-10 lg:mt-0">
            <img
              src={hero}
              alt="Task Management"
              className="w-80 md:w-96"
            />
          </div>
        </div>
      </header>
    );
};

export default Hero;