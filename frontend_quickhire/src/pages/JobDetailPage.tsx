import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { jobApiService } from "../services/job.service";
import type { Job } from "../types/Job";
import { getCompanyLogo } from "../utils/getCompanyLogo";
import LoaderComponent from "../components/LoaderComponent";
import { applicationApiService } from "../services/application.service";

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!job) return;

    try {
      setSubmitting(true);
      setMessage(null);

      await applicationApiService.submitApplication({
        jobId: job.id,
        name: formData.name,
        email: formData.email,
        resume_link: formData.resume_link,
        cover_note: formData.cover_note,
      });

      setMessage({
        type: "success",
        text: "Application submitted successfully!",
      });

      setFormData({
        name: "",
        email: "",
        resume_link: "",
        cover_note: "",
      });
    } catch (error) {
      console.error("Failed to submit application", error);

      setMessage({
        type: "error",
        text: "Failed to submit application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const job = await jobApiService.getJobById(Number(id));
        setJob(job);
      } catch (err) {
        console.error("Failed to fetch job", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return <LoaderComponent fullScreen />;
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Job not found</p>
      </div>
    );
  }

  const logo = location.state?.logo ?? getCompanyLogo(job.id);

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarComponent />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Job Details */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-blue-600 font-medium hover:underline flex items-center"
          >
            <ArrowLeft size={18} className="mr-1" />
            Go Back
          </button>

          <div className="flex items-center gap-4 mb-6">
            <img className="w-14 h-14" src={logo} />
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-gray-500">
                {job.company} • {job.location}
              </p>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-3">Job Description</h2>

          <p className="text-gray-600 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Apply Form */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Submit Application</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />

            <input
              type="url"
              name="resume_link"
              placeholder="Resume Link (URL)"
              value={formData.resume_link}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />

            <textarea
              name="cover_note"
              placeholder="Cover Note"
              rows={4}
              value={formData.cover_note}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-md font-medium transition ${
                submitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {submitting ? "Processing..." : "Apply Now"}
            </button>

            {message && (
              <p
                className={`text-sm mt-2 ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>
        </div>
      </main>

      <FooterComponent />
    </div>
  );
};

export default JobDetailsPage;
