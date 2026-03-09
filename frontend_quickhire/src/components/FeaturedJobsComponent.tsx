import { useEffect, useState, useRef, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { jobApiService } from "../services/job.service";
import JobCardComponent from "./JobCardComponent";
import { companyLogos } from "../data/jobs";
import type { Job } from "../types/Job";

type JobWithLogo = Job & { logo: string };

const getLogoById = (jobId: number) =>
  companyLogos[jobId % companyLogos.length];

const FeaturedJobsComponent: React.FC = () => {
  const [jobs, setJobs] = useState<JobWithLogo[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const isTouchingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchScrollLeftRef = useRef(0);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobApiService.getJobs({ limit: 8 });

        const jobsWithLogos: JobWithLogo[] = response.data.map((job) => ({
          ...job,
          logo: getLogoById(job.id),
        }));

        setJobs(jobsWithLogos);
      } catch (err) {
        console.error("Failed to fetch featured jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };
  const handleMouseLeave = () => (isDownRef.current = false);
  const handleMouseUp = () => (isDownRef.current = false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft =
      scrollLeftRef.current - (x - startXRef.current) * 2;
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    isTouchingRef.current = true;
    touchStartXRef.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    touchScrollLeftRef.current = sliderRef.current.scrollLeft;
  };
  const handleTouchEnd = () => (isTouchingRef.current = false);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchingRef.current || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft =
      touchScrollLeftRef.current - (x - touchStartXRef.current) * 2;
  };

  /*** Memoized job cards ***/
  const jobCards = useMemo(
    () => jobs.map((job) => <JobCardComponent key={job.id} job={job} />),
    [jobs],
  );

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
            <div key={job.id} className="snap-start shrink-0 w-62.5">
              <JobCardComponent job={job} />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid max-w-7xl mx-auto px-6 grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
        {jobCards}
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

import { memo } from "react";

export default memo(FeaturedJobsComponent);