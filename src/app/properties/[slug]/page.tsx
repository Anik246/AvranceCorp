import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, CheckCircle2, Circle,
  ArrowRight, CalendarClock, Building2, ChevronRight,
  Dumbbell, Waves, Thermometer, Users, Utensils,
  Leaf, ShoppingCart, GraduationCap, Heart, Star,
} from "lucide-react";
import { projects } from "@/data/projects";
import { GalleryLightbox } from "./GalleryLightbox";
import { ProjectHero } from "./ProjectHero";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | AvranceCorp Developments`,
    description: project.description,
  };
}

const amenityIconMap: [string, ComponentType<LucideProps>][] = [
  ["gymnas",  Dumbbell],
  ["sauna",   Thermometer],
  ["pool",    Waves],
  ["party",   Users],
  ["dining",  Utensils],
  ["patio",   Leaf],
  ["bbq",     Leaf],
  ["beach",   Waves],
  ["grocer",  ShoppingCart],
  ["school",  GraduationCap],
  ["medical", Heart],
  ["gather",  Users],
  ["market",  ShoppingCart],
];

function getIcon(label: string): ComponentType<LucideProps> {
  const lower = label.toLowerCase();
  const match = amenityIconMap.find(([key]) => lower.includes(key));
  return match ? match[1] : Star;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const gallery = project.gallery ?? [];
  const hasAmenities = !!(project.amenities?.length);
  const hasHighlights = !!(project.highlights?.length);
  const hasTimeline = !!(project.timeline?.length);
  const doneCount = project.timeline?.filter((t) => t.done).length ?? 0;

  return (
    <main className="bg-bg-subtle min-h-screen">

      {/* Section */}
      <ProjectHero
        title={project.title}
        address={project.address}
        status={project.status}
        image={project.image}
        gradient={project.gradient}
      />

      {/* Section */}
      <div className="bg-accent border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
            {[
              { icon: Building2,     label: "Total Units",    value: project.units     ?? "TBD" },
              { icon: CalendarClock, label: "Est. Occupancy", value: project.occupancy ?? "TBD" },
              { icon: MapPin,        label: "Location",       value: project.location           },
              { icon: CheckCircle2,  label: "Units Sold",     value: project.sold      ?? "—"  },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-1.5 px-4 py-5 sm:px-6 sm:py-7 sm:first:pl-0">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
                  <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  {label}
                </div>
                <p className="font-display text-lg font-bold text-white leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section */}
      {gallery.length > 0 && (
        <div className="bg-[#0D0D1A] border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
            <GalleryLightbox images={gallery} projectTitle={project.title} />
          </div>
        </div>
      )}

      {/* Section */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">

          {/* Left */}
          <div className="lg:col-span-2 space-y-16">

            {/* Overview */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Overview</span>
              <h2 className="mt-2 font-display text-2xl font-bold text-accent sm:text-3xl">About This Project</h2>
              <div className="mt-3 h-1 w-10 bg-primary rounded-full" />
              <p className="mt-6 text-base leading-relaxed text-accent font-medium sm:text-lg">{project.description}</p>

              {/* Key facts chips */}
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
                {[
                  { label: "Developer",      value: "AvranceCorp Developments"            },
                  { label: "Status",         value: project.status                        },
                  { label: "Location",       value: project.address                       },
                  { label: "Total Units",    value: project.units     ?? "To Be Announced" },
                  { label: "Est. Occupancy", value: project.occupancy ?? "To Be Announced" },
                  { label: "Units Sold",     value: project.sold      ?? "—"              },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs font-bold uppercase tracking-[0.15em] text-text-muted">{label}</dt>
                    <dd className="mt-1 text-base font-bold text-accent">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Timeline */}
            {hasTimeline && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Progress</span>
                <h2 className="mt-2 font-display text-2xl font-bold text-accent sm:text-3xl">Development Timeline</h2>
                <div className="mt-3 h-1 w-10 bg-primary rounded-full" />
                <p className="mt-2 text-lg font-medium text-accent"><span className="font-bold text-primary">{doneCount}</span> of {project.timeline!.length} stages complete</p>

                <div className="mt-8">
                  {project.timeline!.map((item, i) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                          item.done ? "border-primary bg-primary" : "border-border bg-white"
                        }`}>
                          {item.done
                            ? <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                            : <Circle className="h-3.5 w-3.5 text-text-muted" />
                          }
                        </div>
                        {i < project.timeline!.length - 1 && (
                          <div className={`w-px flex-1 my-1 ${item.done ? "bg-primary/30" : "bg-border"}`} />
                        )}
                      </div>
                      <div className="pb-10 pt-0.5">
                        <p className="text-base font-bold text-accent sm:text-xl">{item.label}</p>
                        <p className={`mt-1.5 text-sm sm:text-lg ${item.done ? "text-primary font-semibold" : "text-text-secondary"}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {hasAmenities && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Lifestyle</span>
                <h2 className="mt-2 font-display text-2xl font-bold text-accent sm:text-3xl">Amenities</h2>
                <div className="mt-3 h-1 w-10 bg-primary rounded-full" />
                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {project.amenities!.map((item) => {
                    const Icon = getIcon(item);
                    return (
                      <li key={item} className="flex items-center gap-3 rounded-xl px-4 py-3 border border-border/60 bg-white">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-base font-medium text-accent leading-snug">{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Highlights */}
            {hasHighlights && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Community</span>
                <h2 className="mt-2 font-display text-2xl font-bold text-accent sm:text-3xl">Neighbourhood Highlights</h2>
                <div className="mt-3 h-1 w-10 bg-primary rounded-full" />
                <ul className="mt-6 space-y-3">
                  {project.highlights!.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-base font-medium text-accent leading-snug sm:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right sidebar — sticky */}
          <div className="space-y-5 lg:sticky lg:top-[calc(50vh-160px)] lg:self-start">

            {/* Contact card */}
            <div className="relative overflow-hidden rounded-2xl bg-accent shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
              {/* Decorative red accent top bar */}
              <div className="h-1 w-full bg-primary" />

              {/* Background pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
              />

              <div className="relative px-7 py-8">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get In Touch</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-white leading-tight">
                  Interested in This Project?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Speak with our team to learn more, register your interest, or explore investment opportunities.
                </p>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/40"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="text-center text-xs text-white/30">No commitment required</p>
                </div>
              </div>
            </div>

            {/* Back */}
            <Link
              href="/properties"
              className="flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3.5 text-sm font-semibold text-text-secondary shadow-sm transition-all hover:border-primary/30 hover:text-primary"
            >
              <ChevronRight className="h-4 w-4 rotate-180 shrink-0" />
              Back to all projects
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
