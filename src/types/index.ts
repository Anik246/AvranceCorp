// ─── Property ────────────────────────────────────────────────────────────────

export type PropertyType = "sale" | "rent";
export type PropertyCategory = "apartment" | "house" | "villa" | "commercial" | "land";
export type PropertyStatus = "available" | "sold" | "rented";

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  category: PropertyCategory;
  status: PropertyStatus;
  price: number;
  currency?: string;
  location: Location;
  features: PropertyFeatures;
  images: string[];
  agent?: Agent;
  createdAt: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  zip?: string;
  lat?: number;
  lng?: number;
}

export interface PropertyFeatures {
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  areaUnit?: "sqft" | "sqm";
  parking?: number;
  yearBuilt?: number;
  amenities?: string[];
}

// ─── Agent ───────────────────────────────────────────────────────────────────

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  title?: string;
  bio?: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export type Size = "sm" | "md" | "lg";
export type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
