import type { Application } from "../types/Application";
import apiClient from "./api.service";

class ApplicationApiService {

  async submitApplication(
    application: Omit<Application, "id" | "created_at" | "updated_at">
  ): Promise<Application> {

    const res = await apiClient.post<Application>(
      "/api/applications",
      application
    );

    return res.data;
  }

  async getApplications(): Promise<Application[]> {
    const res = await apiClient.get<Application[]>("/api/applications");
    return res.data;
  }

  async getApplicationById(id: number): Promise<Application> {
    const res = await apiClient.get<Application>(`/api/applications/${id}`);
    return res.data;
  }

  async getResumeLink(
    applicationId: number
  ): Promise<{ resume_link: string }> {

    const res = await apiClient.get<{ resume_link: string }>(
      `/api/applications/resume/${applicationId}`
    );

    return res.data;
  }
}

export const applicationApiService = new ApplicationApiService();