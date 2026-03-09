import { useEffect, useState } from "react";
import JobCardComponent from "./JobCardComponent";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { jobApiService } from "../services/job.service";
import type { Job } from "../types/Job";
import { companyLogos } from "../data/jobs";
import LoaderComponent from "./LoaderComponent";

type JobWithLogo = Job & { logo: string };

const getLogoById = (jobId: number) =>
  companyLogos[jobId % companyLogos.length];

const JobListComponent = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<JobWithLogo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobApiService.getJobs({ page, limit: 10 });
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
  }, [page]);

  if(loading) {
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
