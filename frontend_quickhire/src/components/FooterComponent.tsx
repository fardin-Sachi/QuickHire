import logo from '../../public/vite.svg'
import {
  FaFacebookF,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className="bg-linear-to-br from-[#1f2432] to-[#1b2030] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-12">
          
          {/* Logo + Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {/* <div className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full"></div>
              </div> */}
              <img src={logo} alt="QuickHire Logo" />
              <h2 className="text-white text-2xl font-semibold">
                QuickHire
              </h2>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm text-base">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-xl mb-6">
              About
            </h3>
            <ul className="space-y-4 text-gray-400">
              {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <a
                      // href="#"
                      className="hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-xl mb-6">
              Resources
            </h3>
            <ul className="space-y-4 text-gray-400">
              {["Help Docs", "Guide", "Updates", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    // href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-4">
            <h3 className="text-white font-semibold text-xl mb-4">
              Get job notifications
            </h3>

            <p className="text-gray-400 mb-6 leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>

            {/* Desktop: inline | Mobile: stacked */}
            <div className="flex flex-col sm:flex-row sm:items-stretch gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full sm:flex-1 px-4 py-3 rounded-md bg-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none"
              />

              <button className="sm:w-auto w-1/2 px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm text-center md:text-left">
            2021 @ QuickHire. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {[FaFacebookF, FaInstagram, FaDribbble, FaLinkedinIn, FaTwitter].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-700 hover:bg-indigo-600 transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="text-white text-sm" />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;