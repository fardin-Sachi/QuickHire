import React from "react";

interface PostJobsProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick?: () => void;
  dashboardImage: string;
}

function PostJobsComponent({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  dashboardImage,
}: PostJobsProps) {
  return (
    <section className="mt-24">
      <div
        className="
          relative
          bg-linear-to-r from-indigo-600 to-purple-600
          text-white
          overflow-hidden
          
          /* MOBILE: only bottom-right clipped */
          [clip-path:polygon(30%_0%,100%_0%,100%_85%,70%_100%,0%_100%,0%_15%)]
          
          /* DESKTOP: top-left and bottom-right clipped */
          lg:[clip-path:polygon(16%_0%,100%_0%,100%_85%,84%_100%,0%_100%,0%_15%)]
        "
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* LEFT CONTENT */}
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {title}
              </h2>

              <p className="mt-6 text-lg sm:text-xl text-white/90">
                {subtitle}
              </p>

              <button
                onClick={onButtonClick}
                className="mt-8 bg-white text-indigo-600
                           font-semibold px-10 py-4 text-lg
                           rounded-md shadow-md
                           hover:shadow-lg transition"
              >
                {buttonText}
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
              <img
                src={dashboardImage}
                alt="Dashboard Preview"
                className="w-full max-w-xl lg:max-w-2xl rounded-lg shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default PostJobsComponent;