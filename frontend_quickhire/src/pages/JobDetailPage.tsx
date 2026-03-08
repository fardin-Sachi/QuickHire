import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { jobs } from "../data/jobs";
import { ArrowLeft } from "lucide-react";

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    return <div className="p-10">Job not found</div>;
  }

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
            <img className="w-14 h-14" src={job.logo} />
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas.
          </p>
        </div>

        {/* Apply Form */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Apply Now</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded-md px-4 py-2"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-md px-4 py-2"
            />

            <input
              type="url"
              placeholder="Resume Link (URL)"
              className="w-full border rounded-md px-4 py-2"
            />

            <textarea
              placeholder="Cover Note"
              rows={4}
              className="w-full border rounded-md px-4 py-2"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </main>

      <FooterComponent />
    </div>
  );
};

export default JobDetailsPage;
