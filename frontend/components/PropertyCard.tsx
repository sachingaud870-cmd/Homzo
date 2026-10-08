import Link from "next/link";
import { ArrowRight, BedDouble, MapPin, Ruler } from "lucide-react";
import { API_URL } from "@/lib/api";

type Property = {
  id: number;
  project_name: string;
  builder_name: string;
  location: string;
  status: string;
  price: string;
  bhk: string;
  carpet_area: number;
  images: {
    id: number;
    image: string;
    is_main: boolean;
  }[];
};

export default function PropertyCard({ property }: { property: Property }) {
  const image =
    property.images?.find((img) => img.is_main)?.image ?? property.images?.[0]?.image;

  const getImageUrl = (image?: string | null) => {
    if (!image) return null;

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${API_URL.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
  };

  const imageUrl = getImageUrl(image);
  const formattedStatus = property.status?.replaceAll("_", " ") ?? "Available";

  return (
    <article className="group overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)] transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--border-hover)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={property.project_name}
            className="h-full w-full object-cover transition duration-900 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#f3d6bb] via-[#f6eadc] to-[#e7d3b5] text-[#7a5f39]">
            <div className="text-center">
              <div className="text-3xl">🏠</div>
              <p className="mt-2 text-sm font-semibold">No Image Available</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-md border border-white/35 bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {formattedStatus}
          </span>
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {property.bhk}
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Starting from</p>
            <p className="mt-1 text-2xl font-bold leading-none">
              ₹ {Number(property.price).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-md border border-white/20 bg-black/35 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
            {property.carpet_area} sq.ft
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="line-clamp-1 text-xl font-bold text-[color:var(--heading)]">
              {property.project_name}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-[color:var(--muted)]">
              <MapPin size={14} className="text-[color:var(--primary)]" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-y border-[color:var(--border)] py-3 text-sm text-[color:var(--muted)]">
          <span className="flex items-center gap-2">
            <BedDouble size={15} className="text-[color:var(--primary)]" />
            {property.bhk}
          </span>
          <span className="flex items-center gap-2">
            <Ruler size={15} className="text-[color:var(--primary)]" />
            {property.carpet_area} sq.ft
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-[color:var(--muted)]">Builder</span>
          <span className="max-w-[60%] truncate text-right font-semibold text-[color:var(--foreground)]">
            {property.builder_name}
          </span>
        </div>

        <Link
          href={`/property/${property.id}`}
          className="group/link mt-2 flex w-full items-center justify-between rounded-lg bg-[#111] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#292929]"
        >
          View Property
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}