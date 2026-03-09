import { companyLogos } from "../data/jobs";

export const getCompanyLogo = (jobId: number) =>
  companyLogos[jobId % companyLogos.length];