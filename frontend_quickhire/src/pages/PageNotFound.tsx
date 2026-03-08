import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <NavbarComponent />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-xl">

          <h1 className="text-7xl font-bold text-blue-500 mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Page not found
          </h2>

          <p className="text-gray-500 mb-8">
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>

        </div>
      </main>

      <FooterComponent />

    </div>
  );
};

export default PageNotFound;