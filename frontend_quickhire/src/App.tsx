import './App.css'
import FeaturedJobs from './components/FeaturedJobsComponent'
import FooterComponent from './components/FooterComponent'
import HeroComponent from './components/HeroComponent'
import JobCategoriesComponent from './components/JobCategoriesComponent'
import LatestJobsComponent from './components/LatestJobsComponent'
import NavbarComponent from './components/NavbarComponent'
import PostJobsComponent from './components/PostJobsComponent'
import TrustedCompanies from './components/TrustedCompanies'


function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="grow lg:mx-auto">
          <NavbarComponent />
          <HeroComponent />
          
          <main className='px-6 md:px-12 lg:px-20 gap-y-20 max-w-7xl pt-6 md:pt-12 lg:pt-20'>
            
            <TrustedCompanies />
            <JobCategoriesComponent />
            <PostJobsComponent
              title="Start posting jobs today"
              subtitle="Start posting jobs for only $10."
              buttonText="Sign Up For Free"
              // dashboardImage={dashboard}
              onButtonClick={() => alert("Sign up clicked")}
            />
            <FeaturedJobs />
            <LatestJobsComponent />
          </main>
          
          <FooterComponent />
        </div>
      </div>
    </>
  )
}

export default App;