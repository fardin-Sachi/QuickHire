import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Job } from "../data/jobs";
import { jobs } from "../data/jobs";


const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
          <img
            className="w-8 h-8"
            src={job.logo}
            alt={job.company}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>

          <p className="text-gray-500 text-sm mt-1">
            {job.company} • {job.location}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {job.category}
          </div>
        </div>
      </div>
    </div>
  );
};

const LatestJobsComponent: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Latest <span className="text-blue-600">jobs open</span>
          </h2>

          <Link
            className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all w-fit max-w-full"
            to="/jobs"
          >
            Show all jobs <ArrowRight size={18} />
          </Link>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}`} className="block cursor-pointer">
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobsComponent;
