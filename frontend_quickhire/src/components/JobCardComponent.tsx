import { Link } from "react-router-dom";
import type { Job } from "../types/Job";

type JobWithLogo = Job & { logo: string };

const JobCardComponent: React.FC<{ job: JobWithLogo }> = ({ job }) => {
  return (
    <Link
      to={`/jobs/${job.id}`}
      state={{ logo: job.logo }}
      className="block h-full"
    >
      <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300 flex flex-col justify-between h-full">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <img
              src={job.logo}
              alt={job.company}
              className="w-8 h-8 object-contain"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">
              {job.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {job.company} • {job.location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {job.category.map((cat, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
            >
              {cat}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
};

export default JobCardComponent;