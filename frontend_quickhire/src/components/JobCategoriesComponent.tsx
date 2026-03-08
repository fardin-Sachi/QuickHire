import {
  Paintbrush,
  BarChart3,
  Megaphone,
  Wallet,
  Monitor,
  Code2,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

type Category = {
  title: string;
  jobs: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { title: "Design", jobs: "235 jobs available", icon: <Paintbrush size={22} /> },
  { title: "Sales", jobs: "756 jobs available", icon: <BarChart3 size={22} /> },
  { title: "Marketing", jobs: "140 jobs available", icon: <Megaphone size={22} /> },
  { title: "Finance", jobs: "325 jobs available", icon: <Wallet size={22} /> },
  { title: "Technology", jobs: "436 jobs available", icon: <Monitor size={22} /> },
  { title: "Engineering", jobs: "542 jobs available", icon: <Code2 size={22} /> },
  { title: "Business", jobs: "211 jobs available", icon: <Briefcase size={22} /> },
  { title: "Human Resource", jobs: "346 jobs available", icon: <Users size={22} /> },
];

function JobCategoriesComponent() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
            Explore by <span className="text-[#3B82F6]">category</span>
          </h2>

          {/* <a
            href="#"
            className="hidden md:flex items-center gap-2 text-[#3B82F6] font-medium hover:gap-3 transition-all"
          >
            Show all jobs
            <ArrowRight size={18} />
          </a> */}

          <Link className="hidden md:flex items-center gap-2 text-[#3B82F6] font-medium hover:gap-3 transition-all"
            to="/jobs">
            Show all jobs <ArrowRight size={18} />
          </Link>
        </div>

        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group rounded-lg border border-[#E2E8F0] bg-white p-6 cursor-pointer
              transition-all duration-300
              hover:bg-linear-to-br hover:from-[#4F46E5] hover:to-[#4338CA]
              hover:text-white hover:border-transparent"
            >
              <div className="mb-8 text-[#4F46E5] group-hover:text-white transition-colors">
                {cat.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {cat.title}
              </h3>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B] group-hover:text-blue-100 transition-colors">
                  {cat.jobs}
                </span>

                <ArrowRight
                  size={18}
                  className="text-[#334155] group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ================= MOBILE LIST ================= */}
        <div className="md:hidden space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group flex items-center justify-between bg-white border border-[#E2E8F0]
              rounded-lg px-5 py-4 cursor-pointer
              transition-all duration-300
              hover:bg-linear-to-r hover:from-[#4F46E5] hover:to-[#4338CA]
              hover:text-white hover:border-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#4F46E5] group-hover:text-white transition-colors">
                  {cat.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-sm">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#64748B] group-hover:text-blue-100 transition-colors mt-1">
                    {cat.jobs}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={18}
                className="text-[#334155] group-hover:text-white group-hover:translate-x-1 transition-all"
              />
            </div>
          ))}

          {/* Mobile Show All */}
          <div className="pt-2">
            <a
              href="#"
              className="flex items-center gap-2 text-[#3B82F6] font-medium text-sm"
            >
              Show all jobs
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobCategoriesComponent;