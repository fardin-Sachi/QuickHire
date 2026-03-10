import {
  Paintbrush,
  Monitor,
  Code2,
  Briefcase,
  Users,
  ArrowRight,
  Smartphone,
  Server,
  Layers,
  Settings,
  Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jobApiService } from "../services/job.service";

type Category = {
  title: string;
  jobs: number;
  icon: React.ReactNode;
};

const iconMap: Record<string, React.ReactNode> = {
  "software development": <Code2 size={22} />,
  "frontend": <Monitor size={22} />,
  "backend": <Server size={22} />,
  "design": <Paintbrush size={22} />,
  "ui/ux": <Layers size={22} />,
  "management": <Users size={22} />,
  "product": <Package size={22} />,
  "devops": <Settings size={22} />,
  "infrastructure": <Server size={22} />,
  "mobile": <Smartphone size={22} />,
};

function JobCategoriesComponent() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch top categories
        const res = await jobApiService.getCategories({ page: 1, limit: 8 });

        // For each category, fetch number of jobs
        const counts = await Promise.all(
          res.data.map(async (cat) => {
            const jobsRes = await jobApiService.getJobsByCategory({
              page: 1,
              limit: 1, // we only need total count
              category: [cat],
            });
            return {
              title: cat,
              jobs: jobsRes.pagination.total,
              icon: iconMap[cat.toLowerCase()] ?? <Briefcase size={22} />,
            };
          })
        );

        setCategories(counts);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
            Explore by <span className="text-[#3B82F6]">category</span>
          </h2>

          <Link
            className="hidden md:flex items-center gap-2 text-[#3B82F6] font-medium hover:gap-3 transition-all"
            to="/jobs"
          >
            Show all jobs <ArrowRight size={18} />
          </Link>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() =>
                navigate(`/jobs?category=${encodeURIComponent(cat.title)}`)
              }
              className="group rounded-lg border border-[#E2E8F0] bg-white p-6 cursor-pointer
                transition-all duration-300
                hover:bg-linear-to-br hover:from-[#4F46E5] hover:to-[#4338CA]
                hover:text-white hover:border-transparent"
            >
              <div className="mb-8 text-[#4F46E5] group-hover:text-white transition-colors">
                {cat.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B] group-hover:text-blue-100 transition-colors">
                  {cat.jobs} {cat.jobs === 1 ? "job available" : "jobs available"}
                </span>

                <ArrowRight
                  size={18}
                  className="text-[#334155] group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden flex flex-col gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() =>
                navigate(`/jobs?category=${encodeURIComponent(cat.title)}`)
              }
              className="group flex items-center justify-between bg-white border border-[#E2E8F0] rounded-lg px-5 py-4 cursor-pointer
                transition-all duration-300
                hover:bg-linear-to-r hover:from-[#4F46E5] hover:to-[#4338CA]
                hover:text-white hover:border-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#4F46E5] group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{cat.title}</h3>
                  <p className="text-xs text-[#64748B] group-hover:text-blue-100 transition-colors mt-1">
                    {cat.jobs} {cat.jobs === 1 ? "job" : "jobs"}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={18}
                className="text-[#334155] group-hover:text-white group-hover:translate-x-1 transition-all"
              />
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/jobs"
              className="flex items-center gap-2 text-[#3B82F6] font-medium text-sm"
            >
              Show all jobs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobCategoriesComponent;