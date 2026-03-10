import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../public/vite.svg"
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#f4f6fb]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link className="flex items-center gap-2"
          to="/"
          >
          <img className="w-8 h-8" 
            src={Logo} 
            alt="QuickHire Logo" 
            />
          <span className="text-xl font-semibold text-gray-800">
            QuickHire
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-10 text-gray-600">
          {/* <a href="#" className="">
            
          </a> */}
          <Link className="hover:text-blue-600 transition"
              to="/jobs">
              Find Jobs
          </Link>
          <a className="hover:text-blue-600 transition" 
            // href="#" 
            >
            Browse Companies
          </a>
        </nav>

        {/* DESKTOP BUTTONS */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-blue-600 font-medium hover:underline">
            Login
          </button>

          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-[#f4f6fb]">
          <Link className="block text-gray-700"
            to="/jobs"
            >
            Find Jobs
          </Link>
          <a className="block text-gray-700"
            // href="#"
            >
            Browse Companies
          </a>

          <div className="pt-4 flex flex-col gap-3">
            <button className="text-blue-600 font-medium text-left">
              Login
            </button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;