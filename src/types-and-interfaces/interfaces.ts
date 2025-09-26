import type { Theme } from "./types";

export interface FileContent {
  data: { [key: string]: string };
  content: string;
  path: string;
}

export interface Contact {
  contact_source: string;
  logo: string;
  link: string;
  type: string;
  file: string;
}

export interface Experience {
  company: string;
  from: string;
  to: string;
  work_summary: string;
  logo: string;
  role: string;
}

export interface Project {
  project: string;
  date_released: string;
  project_summary: string;
  project_image: string;
  project_links: { [key: string]: string }[];
  project_tech: string[];
}

export interface Skill {
  skill: string;
  type: "BE" | "FE" | "O";
  level: "beginner" | "intermediate" | "expert";
  logo: string;
}

export interface About {
  title: string;
  role: string;
  about: string;
  skills: string[];
  logo: string;
}

export interface ContentContextType {
  loading: boolean;
  data: FileContent[];
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
