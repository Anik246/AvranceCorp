import data from "./projects.json";

export type TimelineItem = {
  label: string;
  value: string;
  done: boolean;
};

export type Project = {
  title: string;
  slug: string;
  location: string;
  address: string;
  status: string;
  description: string;
  image: string | null;
  gradient?: string | null;
  featured?: boolean;
  units?: string | null;
  occupancy?: string | null;
  sold?: string | null;
  website?: string | null;
  gallery?: string[];
  timeline?: TimelineItem[];
  amenities?: string[] | null;
  highlights?: string[] | null;
};

export const projects: Project[] = data.projects as Project[];
export const completedProjects: Project[] = data.completedProjects as Project[];
export const featuredProjects = projects.filter((p) => p.featured);
