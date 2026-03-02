import React from 'react'

const companies = [
  { name: "Vodafone", logo: "/logos/vodafone.svg" },
  { name: "Intel", logo: "/logos/intel.svg" },
  { name: "Tesla", logo: "/logos/tesla.svg" },
  { name: "AMD", logo: "/logos/amd.svg" },
  { name: "Talkit", logo: "/logos/talkit.svg" },
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