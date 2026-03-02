import { ArrowRight } from "lucide-react";

const jobs = [
  {
    id: 1,
    company: "Revolut",
    role: "Email Marketing",
    location: "Madrid, Spain",
    description:
      "Revolut is looking for Email Marketing to help team ma ...",
    tags: ["Marketing", "Design"],
    logo: "R",
  },
  {
    id: 2,
    company: "Dropbox",
    role: "Brand Designer",
    location: "San Francisco, US",
    description:
      "Dropbox is looking for Brand Designer to help the team ...",
    tags: ["Design", "Business"],
    logo: "D",
  },
  {
    id: 3,
    company: "Pitch",
    role: "Email Marketing",
    location: "Berlin, Germany",
    description:
      "Pitch is looking for Customer Manager to join marketing t ...",
    tags: ["Marketing"],
    logo: "P",
  },
  {
    id: 4,
    company: "Blinkist",
    role: "Visual Designer",
    location: "Granada, Spain",
    description:
      "Blinkist is looking for Visual Designer to help team desi ...",
    tags: ["Design"],
    logo: "B",
  },
  {
    id: 5,
    company: "ClassPass",
    role: "Product Designer",
    location: "Manchester, UK",
    description:
      "ClassPass is looking for Product Designer to help us ...",
    tags: ["Marketing", "Design"],
    logo: "C",
  },
  {
    id: 6,
    company: "Canva",
    role: "Lead Designer",
    location: "Ontario, Canada",
    description:
      "Canva is looking for Lead Engineer to help develop n ...",
    tags: ["Design", "Business"],
    logo: "C",
  },
  {
    id: 7,
    company: "GoDaddy",
    role: "Brand Strategist",
    location: "Marseille, France",
    description:
      "GoDaddy is looking for Brand Strategist to join the team ...",
    tags: ["Marketing"],
    logo: "G",
  },
  {
    id: 8,
    company: "Twitter",
    role: "Data Analyst",
    location: "San Diego, US",
    description:
      "Twitter is looking for Data Analyst to help team desi ...",
    tags: ["Technology"],
    logo: "T",
  },
];

const tagStyles: Record<string, string> = {
  Marketing: "bg-orange-100 text-orange-600",
  Design: "bg-emerald-100 text-emerald-600",
  Business: "bg-indigo-100 text-indigo-600",
  Technology: "bg-red-100 text-red-500",
};

const FeaturedJobsComponent = () => {
  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured <span className="text-blue-500">jobs</span>
          </h2>

          {/* Desktop Link */}
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
          >
            Show all jobs <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* MOBILE: Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none">
        <div className="flex gap-6 w-max snap-x snap-mandatory scroll-smooth">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="snap-start min-w-[280px] max-w-[280px] border border-gray-200 rounded-xl p-6 bg-white"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-xl font-semibold text-gray-700">
                  {job.logo}
                </div>

                <span className="text-xs font-medium px-3 py-1 border border-blue-500 text-blue-600 rounded-md">
                  Full Time
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {job.role}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {job.company} • {job.location}
              </p>

              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`text-xs font-medium px-3 py-1 rounded-full ${tagStyles[tag]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABLET + DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="group border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-xl font-semibold text-gray-700">
                {job.logo}
              </div>

              <span className="text-xs font-medium px-3 py-1 border border-blue-500 text-blue-600 rounded-md">
                Full Time
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {job.role}
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              {job.company} • {job.location}
            </p>

            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs font-medium px-3 py-1 rounded-full ${tagStyles[tag]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Bottom Link */}
      <div className="mt-10 md:hidden">
        <a
          href="#"
          className="flex items-center gap-2 text-blue-600 font-medium"
        >
          Show all jobs <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default FeaturedJobsComponent;