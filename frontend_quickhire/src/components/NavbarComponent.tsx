import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#f4f6fb]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <span className="text-xl font-semibold text-gray-800">
            QuickHire
          </span>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-10 text-gray-600">
          <a href="#" className="hover:text-blue-600 transition">
            Find Jobs
          </a>
          <a href="#" className="hover:text-blue-600 transition">
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
          <a href="#" className="block text-gray-700">
            Find Jobs
          </a>
          <a href="#" className="block text-gray-700">
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