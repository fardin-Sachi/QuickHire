import vodafone from '../assets/logos/vodafone.svg'
import intel from '../assets/logos/intel.svg'
import tesla from '../assets/logos/tesla.svg'
import amd from '../assets/logos/amd.svg'
import talkit from '../assets/logos/talkit.svg'

const companies = [
  { name: "Vodafone", logo: vodafone },
  { name: "Intel", logo: intel },
  { name: "Tesla", logo: tesla },
  { name: "AMD", logo: amd },
  { name: "Talkit", logo: talkit },
];

function TrustedCompanies() {
  return (
    <section className="bg-white">
      <div className="container-custom">
        <p className="text-gray-400 text-sm mb-6 text-center lg:text-left">
          Companies we helped grow
        </p>

        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-8">
          {companies.map((company) => (
            <img
              key={company.name}
              src={company.logo}
              alt={company.name}
              className="h-6 sm:h-8 md:h-10 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedCompanies;