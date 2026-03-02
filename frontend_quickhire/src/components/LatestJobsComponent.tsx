import React from "react";

type JobTag = {
  label: string;
  variant?: "filled" | "outline";
  color?: "green" | "orange" | "blue" | "red" | "purple";
};

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  logo: string;
  tags: JobTag[];
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "/logos/nomad.svg",
    tags: [
      { label: "Full-Time", variant: "filled", color: "green" },
      { label: "Marketing", variant: "outline", color: "orange" },
      { label: "Design", variant: "outline", color: "blue" },
    ],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    logo: "/logos/dropbox.svg",
    tags: [
      { label: "Full-Time", variant: "filled", color: "red" },
      { label: "Design", variant: "outline", color: "blue" },
    ],
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    logo: "/logos/terraform.svg",
    tags: [
      { label: "Full-Time", variant: "filled", color: "orange" },
      { label: "Developer", variant: "outline", color: "blue" },
    ],
  },
  {
    id: 4,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    logo: "/logos/packer.svg",
    tags: [
      { label: "Full-Time", variant: "filled", color: "green" },
      { label: "Marketing", variant: "outline", color: "orange" },
      { label: "Management", variant: "outline", color: "purple" },
    ],
  },
  {
    id: 5,
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    logo: "/logos/netlify.svg",
    tags: [
      { label: "Full-Time", variant: "filled", color: "green" },
      { label: "Marketing", variant: "outline", color: "orange" },
    ],
  },
  {
    id: 6,
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, USA",
    logo: "/logos/maze.svg",
    tags: [
      { label: "Full-Time", variant: "filled", color: "green" },
      { label: "Marketing", variant: "outline", color: "orange" },
      { label: "Design", variant: "outline", color: "blue" },
    ],
  },
];

const tagStyles = {
  filled: {
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
  },
  outline: {
    green: "border border-green-500 text-green-600",
    orange: "border border-orange-500 text-orange-600",
    red: "border border-red-500 text-red-600",
    blue: "border border-blue-500 text-blue-600",
    purple: "border border-purple-500 text-purple-600",
  },
};

const Tag: React.FC<JobTag> = ({
  label,
  variant = "outline",
  color = "blue",
}) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
        tagStyles[variant][color]
      }`}
    >
      {label}
    </span>
  );
};

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
          <img src={job.logo} alt={job.company} className="w-8 h-8" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {job.title}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {job.company} • {job.location}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {job.tags.map((tag, index) => (
              <Tag key={index} {...tag} />
            ))}
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

          <button className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all">
            Show all jobs →
          </button>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobsComponent;