import { Link } from "react-router-dom";
import type { Job } from "../data/jobs";
import { categoryStyles } from "../data/jobs";

type Props = {
  job: Job;
};

const JobCardComponent = ({ job }: Props) => {
  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="h-full border border-gray-200 rounded-xl p-6 hover:shadow-lg transition bg-white flex flex-col">

        <div className="flex items-start justify-between mb-6">
          <img
            className="w-12 h-12 object-contain"
            src={job.logo}
            alt={`${job.company} logo`}
            loading="lazy"
            decoding="async"
          />

          <span className="text-xs px-3 py-1 border border-blue-500 text-blue-600 rounded-md">
            Full Time
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-1">
          {job.title}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          {job.company} • {job.location}
        </p>

        <p className="text-sm text-gray-400 mb-5 line-clamp-3">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <span
            className={`text-xs px-3 py-1 rounded-full ${categoryStyles[job.category]}`}
          >
            {job.category}
          </span>
        </div>

      </div>
    </Link>
  );
};

export default JobCardComponent;