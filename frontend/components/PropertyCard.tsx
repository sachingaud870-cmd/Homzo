import Link from "next/link";
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

export default function PropertyCard({
  property,
}: {
  property: Property;
}) {
  const image =
    property.images?.find((img) => img.is_main)?.image ??
    property.images?.[0]?.image;

  const imageUrl = image?.startsWith("http")
    ? image
    : image
      ? `${API_URL}${image}`
      : null;

  const formattedStatus = property.status.replaceAll("_", " ");

  return (
    <article className="premium-card group overflow-hidden">

      {/* Property Image */}
      <div className="image-hover relative h-60">

        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={property.project_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#F5D5C8] to-[#E8C4B3]">
            <div className="text-center">
              <div className="text-4xl">🏡</div>
              <p className="mt-2 text-sm font-medium text-[#9B7E52]">
                No Image Available
              </p>
            </div>
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Status */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#9B7E52] shadow-lg backdrop-blur-md">
            {formattedStatus}
          </span>
        </div>

        {/* BHK */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-[#2C2C2C]/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            {property.bhk}
          </span>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">

          <div>
            <p className="text-xs text-white/80">
              Starting from
            </p>

            <p className="text-2xl font-bold">
              ₹ {Number(property.price).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs backdrop-blur-md">
            📐 {property.carpet_area} sq.ft
          </div>

        </div>

      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title */}
        <h2 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#9B7E52]">
          {property.project_name}
        </h2>

        {/* Location */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <span className="text-[#C9A961]">📍</span>

          <span className="line-clamp-1">
            {property.location}
          </span>
        </div>

        {/* Builder */}
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-gray-400">
            Builder
          </span>

          <span className="font-medium text-gray-700">
            {property.builder_name}
          </span>
        </div>

        {/* Details */}
        <div className="mt-5 grid grid-cols-3 divide-x divide-gray-200 rounded-2xl border border-[#C9A961]/10 bg-[#FAF6F0]/70 py-3">

          <div className="text-center">
            <p className="text-xs text-gray-400">
              Type
            </p>

            <p className="mt-1 text-sm font-bold text-gray-800">
              {property.bhk}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              Area
            </p>

            <p className="mt-1 text-sm font-bold text-gray-800">
              {property.carpet_area}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              Status
            </p>

            <p className="mt-1 text-sm font-bold text-[#9B7E52]">
              Available
            </p>
          </div>

        </div>

        {/* Button */}
        <Link href={`/property/${property.id}`}
        
          className="btn-accent mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3"
        >
          View Property
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>

    </article>
  );
}