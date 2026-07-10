export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  skills: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
}