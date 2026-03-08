import '../src/config/env.config'
import { prisma } from '../src/config/prisma.config'

async function main() {
  console.log('Seeding database...')

  await prisma.application.deleteMany({})
  await prisma.job.deleteMany({})

  const jobsData = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'New York, NY',
      category: ['Software Development', 'Frontend'],
      description: 'Build modern React applications.'
    },
    {
      title: 'Backend Developer',
      company: 'DataSolutions',
      location: 'San Francisco, CA',
      category: ['Software Development', 'Backend'],
      description: 'Develop scalable Node.js APIs.'
    },
    {
      title: 'UI/UX Designer',
      company: 'CreativeStudio',
      location: 'Remote',
      category: ['Design', 'UI/UX'],
      description: 'Design beautiful user experiences.'
    },
    {
      title: 'Product Manager',
      company: 'InnovateX',
      location: 'Austin, TX',
      category: ['Management', 'Product'],
      description: 'Lead product development cycles.'
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudOps',
      location: 'Seattle, WA',
      category: ['DevOps', 'Infrastructure'],
      description: 'Maintain CI/CD pipelines and cloud systems.'
    },
    {
      title: 'Mobile Developer',
      company: 'AppWorks',
      location: 'Remote',
      category: ['Mobile', 'Software Development'],
      description: 'Build cross-platform mobile apps.'
    },
    {
      title: 'Data Analyst',
      company: 'InsightLab',
      location: 'Chicago, IL',
      category: ['Data', 'Analytics'],
      description: 'Analyze business data and trends.'
    },
    {
      title: 'Machine Learning Engineer',
      company: 'AI Labs',
      location: 'Boston, MA',
      category: ['AI', 'Machine Learning'],
      description: 'Develop ML models and pipelines.'
    },
    {
      title: 'Graphic Designer',
      company: 'DesignHub',
      location: 'Remote',
      category: ['Design', 'Creative'],
      description: 'Create visual assets for marketing.'
    },
    {
      title: 'Marketing Specialist',
      company: 'Growthify',
      location: 'Los Angeles, CA',
      category: ['Marketing', 'Digital'],
      description: 'Plan and execute marketing campaigns.'
    },
    {
      title: 'Content Writer',
      company: 'ContentWorks',
      location: 'Remote',
      category: ['Content', 'Marketing'],
      description: 'Write engaging blog and marketing content.'
    },
    {
      title: 'QA Engineer',
      company: 'QualitySoft',
      location: 'Denver, CO',
      category: ['QA', 'Software Development'],
      description: 'Test software for bugs and issues.'
    },
    {
      title: 'Security Engineer',
      company: 'SecureTech',
      location: 'Washington, DC',
      category: ['Security', 'Infrastructure'],
      description: 'Protect systems and applications.'
    },
    {
      title: 'Technical Support Engineer',
      company: 'HelpDeskPro',
      location: 'Remote',
      category: ['Support', 'Customer Service'],
      description: 'Assist customers with technical issues.'
    },
    {
      title: 'Full Stack Developer',
      company: 'StackFlow',
      location: 'Toronto, Canada',
      category: ['Software Development', 'Fullstack'],
      description: 'Work on both frontend and backend.'
    },
    {
      title: 'HR Specialist',
      company: 'PeopleFirst',
      location: 'Miami, FL',
      category: ['Human Resources'],
      description: 'Manage recruitment and employee relations.'
    },
    {
      title: 'Sales Manager',
      company: 'SalesForcePro',
      location: 'Dallas, TX',
      category: ['Sales', 'Business'],
      description: 'Lead and grow the sales team.'
    },
    {
      title: 'Blockchain Developer',
      company: 'CryptoTech',
      location: 'Remote',
      category: ['Blockchain', 'Software Development'],
      description: 'Build decentralized applications.'
    },
    {
      title: 'Game Developer',
      company: 'PlayStudio',
      location: 'San Diego, CA',
      category: ['Game Development', 'Software Development'],
      description: 'Develop engaging video games.'
    },
    {
      title: 'Cloud Architect',
      company: 'CloudScale',
      location: 'Remote',
      category: ['Cloud', 'Infrastructure'],
      description: 'Design scalable cloud architecture.'
    }
  ]

  const jobs = await prisma.job.createMany({
    data: jobsData
  })

  console.log(`Created ${jobs.count} jobs.`)

  const jobList = await prisma.job.findMany()

  const applicationsData = [
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Smith', email: 'bob@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' },
    { name: 'David Wilson', email: 'david@example.com' },
    { name: 'Emma Davis', email: 'emma@example.com' },
    { name: 'Frank Miller', email: 'frank@example.com' },
    { name: 'Grace Lee', email: 'grace@example.com' },
    { name: 'Henry Clark', email: 'henry@example.com' },
    { name: 'Isabella Walker', email: 'isabella@example.com' },
    { name: 'Jack Hall', email: 'jack@example.com' },
    { name: 'Karen Allen', email: 'karen@example.com' },
    { name: 'Leo Young', email: 'leo@example.com' },
    { name: 'Mia King', email: 'mia@example.com' },
    { name: 'Nathan Scott', email: 'nathan@example.com' },
    { name: 'Olivia Green', email: 'olivia@example.com' },
    { name: 'Paul Baker', email: 'paul@example.com' },
    { name: 'Quinn Adams', email: 'quinn@example.com' },
    { name: 'Rachel Turner', email: 'rachel@example.com' },
    { name: 'Samuel Hill', email: 'samuel@example.com' },
    { name: 'Tina Carter', email: 'tina@example.com' }
  ]

  const applications = await prisma.application.createMany({
    data: applicationsData.map((app, i) => ({
      jobId: jobList[i % jobList.length].id,
      name: app.name,
      email: app.email,
      resume_link: `https://example.com/resume/${app.name
        .toLowerCase()
        .replace(' ', '-')}.pdf`,
      cover_note: 'I am very interested in this role and believe my skills are a great match.'
    }))
  })

  console.log(`Created ${applications.count} applications.`)
}

main()
  .catch((err) => {
    console.error('Error seeding database:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })