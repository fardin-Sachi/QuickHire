import { useState } from "react";
import { jobs } from "../data/jobs";
import JobCardComponent from "./JobCardComponent";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// const tagStyles: Record<string, string> = {
//   Marketing: "bg-orange-100 text-orange-600",
//   Design: "bg-emerald-100 text-emerald-600",
//   Business: "bg-indigo-100 text-indigo-600",
//   Technology: "bg-red-100 text-red-500",
// };

const JOBS_PER_PAGE = 14;

const JobListComponent = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  // const start = (page - 1) * JOBS_PER_PAGE;
  // const currentJobs = jobs.slice(start, start + JOBS_PER_PAGE);

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
          All <span className="text-blue-500">Jobs</span>
        </h2>

        {/* Job Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {jobs.map((job) => (
            <JobCardComponent key={job.id} job={job} />
          ))}
        </div>

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
