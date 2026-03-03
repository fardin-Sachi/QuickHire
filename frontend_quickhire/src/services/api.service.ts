export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  created_at: string;
  updated_at?: string;
}

export interface Application {
  id?: number;
  jobId: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  created_at?: string;
  updated_at?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  }

  // ====== Jobs ======
  async getJobs(): Promise<Job[]> {
    const res = await fetch(`${this.baseUrl}/api/jobs`);
    if(!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  }

  async getJobById(id: number): Promise<Job> {
    const res = await fetch(`${this.baseUrl}/api/jobs/${id}`);
    if(!res.ok) throw new Error("Failed to fetch job details");
    return res.json();
  }

  async createJob(job: Omit<Job, "id" | "created_at" | "updated_at">): Promise<Job> {
    const res = await fetch(`${this.baseUrl}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if(!res.ok) throw new Error("Failed to create job");
    return res.json();
  }

  async deleteJob(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/jobs/${id}`, {
      method: "DELETE",
    });
    if(!res.ok) throw new Error("Failed to delete job");
  }

  // ====== Applications ======
  async submitApplication(application: Omit<Application, "id" | "created_at" | "updated_at">): Promise<Application> {
    const res = await fetch(`${this.baseUrl}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });
    if(!res.ok) throw new Error("Failed to submit application");
    return res.json();
  }
}

export default new ApiService();