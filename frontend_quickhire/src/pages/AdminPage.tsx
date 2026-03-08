import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobs as initialJobs } from "../data/jobs";
import type { Job } from "../data/jobs";
import JobCardComponent from "../components/JobCardComponent";

const AdminJobsPage = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    logo: "",
    category: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addJob = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob: Job = {
      id: Date.now(),
      title: form.title,
      company: form.company,
      location: form.location,
      logo: form.logo || "/placeholder-logo.svg",
      category: form.category,
      description: form.description,
    };

    setJobs((prev) => [newJob, ...prev]);

    setForm({
      title: "",
      company: "",
      location: "",
      logo: "",
      category: "",
      description: "",
    });
  };

  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            ← Back
          </button>

          <h1 className="text-2xl md:text-3xl font-bold">
            Admin <span className="text-blue-500">Job Management</span>
          </h1>
        </div>

        {/* Add Job Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm mb-12">

          <h2 className="text-lg md:text-xl font-semibold mb-6">
            Add New Job
          </h2>

          <form
            onSubmit={addJob}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
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
              placeholder="Category (Design, Marketing...)"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              name="logo"
              value={form.logo}
              onChange={handleChange}
              placeholder="Logo URL"
              className="border rounded-lg px-4 py-2.5 md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
            <h2 className="text-xl font-semibold">
              Existing Jobs
            </h2>

            <span className="text-sm text-gray-500">
              {jobs.length} jobs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="relative group">

                <JobCardComponent job={job} />

                {/* Delete Button */}
                <button
                  onClick={() => deleteJob(job.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md shadow"
                >
                  Delete
                </button>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AdminJobsPage;