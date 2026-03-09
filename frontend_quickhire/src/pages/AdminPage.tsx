import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobApiService } from "../services/job.service";
import type { Job } from "../types/Job";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getCompanyLogo } from "../utils/getCompanyLogo";
import LoaderComponent from "../components/LoaderComponent";

const AdminJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const JOBS_PER_PAGE = 12;

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await jobApiService.getJobs({ page, limit: JOBS_PER_PAGE });
        setJobs(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page]);

  // Form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add job
  const addJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      company: form.company,
      location: form.location,
      category: form.category.split(",").map((c) => c.trim()),
      description: form.description,
    };

    try {
      const newJob = await jobApiService.createJob(payload);
      setJobs((prev) => [newJob, ...prev]);
      setForm({ title: "", company: "", location: "", category: "", description: "" });
    } catch (err) {
      console.error("Failed to create job", err);
    }
  };

  const deleteJob = async (id: number) => {
    try {
      await jobApiService.deleteJob(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Failed to delete job", err);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 font-medium hover:underline flex"
          >
            <ArrowLeft size={18} className="mr-1" /> Go Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">
            Admin <span className="text-blue-500">Job Management</span>
          </h1>
        </div>

        {/* Add Job Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm mb-12">
          <h2 className="text-lg md:text-xl font-semibold mb-6">Add New Job</h2>
          <form onSubmit={addJob} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category (comma separated) (e.g. marketing,graphics,software)"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Job Description"
              rows={4}
              className="border rounded-lg px-4 py-2.5 md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Add Job
            </button>
          </form>
        </div>

        {/* Job List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Existing Jobs</h2>
            <span className="text-sm text-gray-500">{jobs.length} jobs</span>
          </div>

          {loading ? (
            <LoaderComponent />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-xl p-4 bg-white shadow-sm cursor-pointer relative hover:shadow-md transition"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={getCompanyLogo(job.id)}
                      alt={job.company}
                      className="w-10 h-10 object-contain rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-gray-500 text-sm">{job.company}</p>
                      <p className="text-gray-400 text-xs">{job.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.category.map((cat, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteJob(job.id);
                    }}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-600 p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-8">
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
      </div>
    </section>
  );
};

export default AdminJobsPage;