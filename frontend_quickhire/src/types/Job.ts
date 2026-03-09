export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string[];
  description: string;
  created_at: string;
  updated_at?: string;
}