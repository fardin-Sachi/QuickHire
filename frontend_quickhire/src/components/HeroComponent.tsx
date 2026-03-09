import { useState, useEffect, useRef, useMemo } from "react";
import hero from "../assets/hero.svg";
import { jobApiService } from "../services/job.service";
import { debounce } from "lodash";
import type { Job } from "../types/Job";
import type { JobQueryParams } from "../types/JobQueryParams";
import { useNavigate } from "react-router-dom";
import { getCompanyLogo } from "../utils/getCompanyLogo";

function HeroComponent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Job[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string, location?: string | null) => {
        if (!query) {
          setResults([]);
          return;
        }

        try {
          const params: JobQueryParams = {
            search: query,
            limit: 4,
          };

          if (location) {
            params.location = location;
          }

          const res = await jobApiService.getJobs(params);
          setResults(res.data);
        } catch (err) {
          console.error("Search failed", err);
        }
      }, 100),
    [],
  );

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery) params.append("search", searchQuery);
    if (selectedLocation) params.append("location", selectedLocation);

    navigate(`/jobs?${params.toString()}`);
  };

  useEffect(() => {
    debouncedSearch(searchQuery, selectedLocation);
  }, [searchQuery, selectedLocation, debouncedSearch]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleLocationClick = async () => {
    setLocationDropdownOpen((prev) => !prev);
    if (!locations.length) {
      try {
        const locs = await jobApiService.getAvailableLocations();
        setLocations(locs);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    }
  };

  return (
    <section className="relative bg-[#f4f6fb] overflow-visible">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Discover <br />
              more than{" "}
              <span className="relative inline-block text-blue-600">
                5000+ Jobs
                <span className="absolute left-0 -bottom-2 w-full h-3 bg-blue-200 -z-10 rounded-full"></span>
              </span>
            </h1>
            <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            <div className="mt-8 relative max-w-3xl mx-auto lg:mx-0">
              <div className="relative w-full">
                {" "}
                {/* Add a relative wrapper */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0">
                  {/* Job Input */}
                  <div className="flex-1 px-4 py-3 border-b border-gray-200 focus-within:border-indigo-600 lg:border-b-0 relative">
                    <div className="flex items-center">
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
                        ref={searchRef}
                        type="text"
                        placeholder="Job title or keyword"
                        className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowResults(true)}
                        onBlur={() =>
                          setTimeout(() => setShowResults(false), 200)
                        }
                      />
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

                  {/* Location Input */}
                  <div className="flex-1 px-4 py-3 border-b border-gray-200 focus-within:border-indigo-600 lg:border-b-0 relative">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={handleLocationClick}
                    >
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
                        ref={locationRef}
                        type="text"
                        value={selectedLocation || "Select location"}
                        readOnly
                        className="w-full bg-transparent focus:outline-none text-gray-700 cursor-pointer"
                      />
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

                    {/* Floating location dropdown */}
                    {locationDropdownOpen && locations.length > 0 && (
                      <ul className="absolute z-50 bg-white shadow-lg mt-1 w-full rounded-md border border-gray-200 max-h-60 overflow-y-auto divide-y divide-gray-200">
                        {locations.map((loc, idx) => (
                          <li
                            key={idx}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedLocation(loc);
                              setLocationDropdownOpen(false);
                            }}
                          >
                            {loc}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    className="w-full lg:w-auto mt-2 lg:mt-0 lg:ml-4 px-8 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium rounded-lg transition whitespace-nowrap"
                    onClick={handleSearch}
                  >
                    Search my job
                  </button>
                </div>
                {/* Floating search results spanning the full container */}
                {showResults && results.length > 0 && (
                  <ul className="absolute top-full left-0 z-50 w-full mt-2 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto divide-y divide-gray-200">
                    {results.map((job) => (
                      <li
                        key={job.id}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        <img
                          src={getCompanyLogo(job.id)}
                          alt={job.company}
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">
                            {job.title}
                          </span>
                          <span className="text-sm text-gray-500">
                            {job.company}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400 text-left sm:text-left">
              Popular: UI Designer, UX Researcher, Android, Admin
            </p>
          </div>

          <div className="hidden lg:block absolute right-0 top-10">
            <img src={hero} alt="Hero" className="w-112.5 object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroComponent;
