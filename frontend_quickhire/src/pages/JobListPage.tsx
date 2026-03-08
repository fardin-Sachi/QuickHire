import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import JobListComponent from "../components/JobListComponent";

const Jobs = () => {
  return (
    <>
    <div className="min-h-dvh flex flex-col">
      <NavbarComponent />

      <main className="flex-1 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-16 w-full">
        <JobListComponent />
      </main>

      <FooterComponent />
    </div>
    </>
  );
};

export default Jobs;