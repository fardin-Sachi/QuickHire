import hero from '../assets/hero.svg'

function HeroComponent() {
  return (
    <section className="relative bg-[#f4f6fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Discover <br />
              more than{" "}
              <span className="relative inline-block text-blue-600">
                5000+ Jobs
                {/* Blue underline highlight */}
                <span className="absolute left-0 -bottom-2 w-full h-3 bg-blue-200 -z-10 rounded-full"></span>
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* SEARCH CARD */}
            <div
              className="mt-8 bg-white shadow-lg rounded-xl 
             p-4 sm:p-5 
             flex flex-col lg:flex-row 
             items-stretch lg:items-center 
             gap-4 lg:gap-0 
             max-w-3xl mx-auto lg:mx-0"
            >
              {/* JOB INPUT */}
              <div className="flex-1 px-4 py-3 border-b border-gray-200 focus-within:border-indigo-600 lg:border-b-0">
                <div className="flex items-center">
                  {/* Search Icon */}
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>

                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full bg-transparent focus:outline-none 
                   text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Vertical Divider (desktop only) */}
              <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

              {/* LOCATION INPUT */}
              <div className="flex-1 px-4 py-3 border-b border-gray-200 focus-within:border-indigo-600 lg:border-b-0">
                <div className="flex items-center">
                  {/* Location Icon */}
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>

                  <input
                    type="text"
                    defaultValue="Florence, Italy"
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />

                  {/* Dropdown arrow */}
                  <svg
                    className="w-4 h-4 text-gray-400 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* BUTTON */}
              <button
                className="w-full lg:w-auto mt-2 lg:mt-0 
               lg:ml-4 px-8 py-3 
               bg-[#4F46E5] hover:bg-[#4338CA] 
               text-white font-medium 
               rounded-lg transition whitespace-nowrap"
              >
                Search my job
              </button>
            </div>

            {/* POPULAR */}
            <p className="mt-4 text-sm text-gray-400 text-left sm:text-left">
              Popular: UI Designer, UX Researcher, Android, Admin
            </p>
          </div>

          {/* HERO IMAGE (ABSOLUTE on Desktop) */}
          <div className="hidden lg:block absolute right-0 top-10">
            <img
              src={hero}
              alt="Hero"
              className="w-112.5 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroComponent;



