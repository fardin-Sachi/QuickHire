import type { Job } from "../types/Job";
import apiClient from "./api.service";

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type PaginatedJobsResponse = {
  success: boolean;
  data: Job[];
  pagination: Pagination;
};

class JobApiService {

  async getJobs(params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedJobsResponse> {
  const res = await apiClient.get<PaginatedJobsResponse>("/api/jobs", {
    params, // now it can include search
  });

  return res.data;
}
  
  async getAvailableLocations(): Promise<string[]> {
    const res = await apiClient.get<{ success: boolean; data: string[] }>("/api/jobs/location-available");
    return res.data.data;
  }

  async getJobById(id: number): Promise<Job> {
    const res = await apiClient.get<{ success: boolean; data: Job }>(`/api/jobs/${id}`);
    return res.data.data;
  }

  async createJob(
    job: Omit<Job, "id" | "created_at" | "updated_at">
  ): Promise<Job> {

    const res = await apiClient.post<{ success: boolean; data: Job }>("/api/jobs", job);
    return res.data.data;
  }

  async deleteJob(id: number): Promise<void> {
    await apiClient.delete(`/api/jobs/${id}`);
  }
}

export const jobApiService = new JobApiService();