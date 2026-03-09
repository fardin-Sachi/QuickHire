import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { jobApiService } from "../services/job.service";
import type { Job } from "../types/Job";
import { getCompanyLogo } from "../utils/getCompanyLogo";

type JobWithLogo = Job & { logo: string };

const JobCard: React.FC<{ job: JobWithLogo }> = ({ job }) => (
  <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300 flex flex-col justify-between w-full h-full">
    {/* Logo and main info */}
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
        <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{job.company} • {job.location}</p>
      </div>
    </div>

    {/* Category tags */}
    <div className="flex flex-wrap gap-2 mt-4">
      {job.category.map((cat, idx) => (
        <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
          {cat}
        </span>
      ))}
    </div>
  </div>
);

const LatestJobsComponent: React.FC = () => {
  const [jobs, setJobs] = useState<JobWithLogo[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobApiService.getJobs({ limit: 6 });
        const jobsWithLogos: JobWithLogo[] = response.data.map((job) => ({
          ...job,
          logo: getCompanyLogo(job.id),
        }));
        setJobs(jobsWithLogos);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };
    fetchJobs();
  }, []);

  const jobCards = useMemo(() => {
    return jobs.map((job) => (
      <Link className="block w-full h-full"
        key={job.id} 
        to={`/jobs/${job.id}`} 
        state={{ logo: job.logo }}
        >
        <JobCard job={job} />
      </Link>
    ));
  }, [jobs]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Latest <span className="text-blue-600">jobs open</span>
          </h2>

          <Link
            className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
            to="/jobs"
          >
            Show all jobs <ArrowRight size={18} />
          </Link>
        </div>

        {/* Grid with equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {jobCards}
        </div>
      </div>
    </section>
  );
};
import { memo } from "react";

export default memo(LatestJobsComponent);