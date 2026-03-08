import Revolut from "../assets/companyLogos/revolut.svg";
import dropbox from "../assets/companyLogos/dropbox.svg";
import pitch from "../assets/companyLogos/pitch.svg";
import blinkist from "../assets/companyLogos/blinklist.svg";
import classpass from "../assets/companyLogos/classpass.svg";
import canva from "../assets/companyLogos/canva.svg";
import godaddy from "../assets/companyLogos/godaddy.svg";
import twitter from "../assets/companyLogos/twitter.svg";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  logo: string;
};

export const categoryStyles: Record<string, string> = {
  Marketing: "bg-orange-100 text-orange-600",
  Design: "bg-emerald-100 text-emerald-600",
  Business: "bg-indigo-100 text-indigo-600",
  Technology: "bg-red-100 text-red-500",
};

export const jobs: Job[] = [
  {
    id: 1,
    company: "Revolut",
    title: "Email Marketing",
    location: "Madrid, Spain",
    category: "Marketing",
    description:
      "Revolut is looking for an Email Marketing specialist to help manage campaigns and grow engagement.",
    logo: Revolut,
  },
  {
    id: 2,
    company: "Dropbox",
    title: "Brand Designer",
    location: "San Francisco, US",
    category: "Design",
    description:
      "Dropbox is looking for a Brand Designer to help strengthen visual identity across products.",
    logo: dropbox,
  },
  {
    id: 3,
    company: "Pitch",
    title: "Email Marketing",
    location: "Berlin, Germany",
    category: "Marketing",
    description:
      "Pitch is looking for a Customer Marketing Manager to join the marketing team.",
    logo: pitch,
  },
  {
    id: 4,
    company: "Blinkist",
    title: "Visual Designer",
    location: "Granada, Spain",
    category: "Design",
    description:
      "Blinkist is looking for a Visual Designer to support the design team in creating engaging assets.",
    logo: blinkist,
  },
  {
    id: 5,
    company: "ClassPass",
    title: "Product Designer",
    location: "Manchester, UK",
    category: "Design",
    description:
      "ClassPass is looking for a Product Designer to craft intuitive experiences for users.",
    logo: classpass,
  },
  {
    id: 6,
    company: "Canva",
    title: "Lead Designer",
    location: "Ontario, Canada",
    category: "Design",
    description:
      "Canva is looking for a Lead Designer to help lead the design direction for new features.",
    logo: canva,
  },
  {
    id: 7,
    company: "GoDaddy",
    title: "Brand Strategist",
    location: "Marseille, France",
    category: "Marketing",
    description:
      "GoDaddy is looking for a Brand Strategist to guide brand campaigns and messaging.",
    logo: godaddy,
  },
  {
    id: 8,
    company: "Twitter",
    title: "Data Analyst",
    location: "San Diego, US",
    category: "Technology",
    description:
      "Twitter is looking for a Data Analyst to analyze platform data and generate insights.",
    logo: twitter,
  },
];