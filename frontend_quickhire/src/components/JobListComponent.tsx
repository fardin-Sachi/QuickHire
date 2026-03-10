import { useEffect, useState } from "react";
import JobCardComponent from "./JobCardComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { jobApiService } from "../services/job.service";
import type { Job } from "../types/Job";
import { companyLogos } from "../data/jobs";
import LoaderComponent from "./LoaderComponent";
import type { JobQueryParams } from "../types/JobQueryParams";

type JobWithLogo = Job & { logo: string };

const getLogoById = (jobId: number) =>
  companyLogos[jobId % companyLogos.length];

const JobListComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const location = searchParams.get("location");
  const isSearchResults =
    searchParams.has("search") || searchParams.has("location");

  const [jobs, setJobs] = useState<JobWithLogo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        let response;

        const params: JobQueryParams = {
          page,
          limit: 8,
        };

        if (search) params.search = search;
        if (location) params.location = location;

        if (search || location) {
          response = await jobApiService.getJobs(params);
        } else if (category) {
          const categoryParams = {
            ...params,
            category: category.split(","),
          };

          response = await jobApiService.getJobsByCategory(categoryParams);
        } else {
          response = await jobApiService.getJobs(params);
        }

        const jobsWithLogos = response.data.map((job) => ({
          ...job,
          logo: getLogoById(job.id),
        }));

        setJobs(jobsWithLogos);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, category, search, location]);

  useEffect(() => {
    setPage(1);
  }, [search, location, category]);

  if (loading) {
    return <LoaderComponent fullScreen />;
  }

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 font-medium hover:underline flex items-center"
        >
          <ArrowLeft size={18} className="mr-1" />
          Go Back
        </button>

        <h2 className="text-3xl font-bold mb-10">
          {isSearchResults ? (
            <>
              Search Results
              {search && (
                <>
                  {" "}
                  for <span className="text-blue-500">{search}</span>
                </>
              )}
              {location && (
                <>
                  {" "}
                  in <span className="text-blue-500">{location}</span>
                </>
              )}
            </>
          ) : category ? (
            <>
              {category} <span className="text-blue-500">Jobs</span>
            </>
          ) : (
            <>
              All <span className="text-blue-500">Jobs</span>
            </>
          )}
        </h2>

        {/* Job Grid */}
        {jobs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700">
              No jobs found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or explore other opportunities.
            </p>

            <button
              onClick={() => navigate("/jobs")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Browse All Jobs
            </button>
          </div>
        )}
        {jobs.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {jobs.map((job) => (
              <JobCardComponent key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-12">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-40"
          >
            Prev
          </button>

          <span className="px-4 py-2 text-sm">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobListComponent;
