import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";
import JobCardComponent from "./JobCardComponent";

const FeaturedJobsComponent = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isTouchingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchScrollLeftRef = useRef(0);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2; // scroll speed
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    isTouchingRef.current = true;
    touchStartXRef.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    touchScrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchingRef.current || !sliderRef.current) return;

    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - touchStartXRef.current) * 2;

    sliderRef.current.scrollLeft = touchScrollLeftRef.current - walk;
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured <span className="text-blue-500">jobs</span>
          </h2>

          <Link
            className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
            to="/jobs"
          >
            Show all jobs <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* MOBILE SCROLLER */}
      <div
        ref={sliderRef}
        className="md:hidden overflow-x-auto scrollbar-hide px-6 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div className="flex gap-6 w-max snap-x snap-mandatory scroll-smooth">
          {jobs.map((job) => (
            <div key={job.id} className="snap-start min-w-70">
              <JobCardComponent job={job} />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid max-w-7xl mx-auto px-6 grid-cols-2 lg:grid-cols-4 gap-8">
        {jobs.map((job) => (
          <JobCardComponent key={job.id} job={job} />
        ))}
      </div>

      <div className="mt-10 md:hidden px-6">
        <Link
          className="flex items-center gap-2 text-blue-600 font-medium"
          to="/jobs"
        >
          Show all jobs <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedJobsComponent;
