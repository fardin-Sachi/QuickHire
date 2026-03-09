export interface Application {
  id: number;
  jobId: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  created_at?: string;
  updated_at?: string;
}