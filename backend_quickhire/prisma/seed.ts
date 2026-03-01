// Load environment first
import '../src/config/env.config';
import { prisma } from '../src/config/prisma.config';

async function main() {
  console.log('Seeding database...');

  // Delete existing data
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});

  // Seed jobs
  const jobs = await prisma.job.createMany({
    data: [
      {
        title: 'Frontend Developer',
        company: 'TechCorp',
        location: 'New York, NY',
        category: 'Software Development',
        description: 'We are looking for a skilled React developer.'
      },
      {
        title: 'Backend Developer',
        company: 'DataSolutions',
        location: 'San Francisco, CA',
        category: 'Software Development',
        description: 'Looking for an experienced Node.js developer.'
      },
      {
        title: 'UI/UX Designer',
        company: 'CreativeStudio',
        location: 'Remote',
        category: 'Design',
        description: 'Design beautiful user interfaces and experiences.'
      }
    ]
  });

  console.log(`Created ${jobs.count} jobs.`);

  const jobList = await prisma.job.findMany();

  // Seed applications
  const applications = await prisma.application.createMany({
    data: [
      {
        jobId: jobList[0].id,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        resume_link: 'https://example.com/resume/alice.pdf',
        cover_note: 'I am passionate about frontend development.'
      },
      {
        jobId: jobList[1].id,
        name: 'Bob Smith',
        email: 'bob@example.com',
        resume_link: 'https://example.com/resume/bob.pdf',
        cover_note: 'Node.js is my specialty.'
      },
      {
        jobId: jobList[2].id,
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        resume_link: 'https://example.com/resume/charlie.pdf'
      }
    ]
  });

  console.log(`Created ${applications.count} applications.`);
}

main()
  .catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });