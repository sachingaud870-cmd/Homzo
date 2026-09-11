"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

type PropertyImage = {
  id: number;
  image: string;
  is_main: boolean;
};

export default function ImageGallery({
  images,
}: {
  images: PropertyImage[];
}) {
  const [activeImage, setActiveImage] = useState(
    images.find((img) => img.is_main)?.image ??
      images[0]?.image ??
      null
  );

  const imageUrl = activeImage
    ? activeImage.startsWith("http")
      ? activeImage
      : `${API_URL}${activeImage}`
    : null;

  return (
    <div className="w-full">

      {/* Main Image */}
      <div className="image-hover group relative h-[300px] overflow-hidden rounded-3xl bg-[#F0E9E2] md:h-[500px]">

        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Property"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <span className="text-5xl"></span>

            <p className="mt-3 text-sm font-medium">
              No images available
            </p>
          </div>
        )}

        {/* Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {/* Top Badge */}
        {images.length > 0 && (
          <div className="absolute left-5 top-5">
            <span className="rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
               {images.length} Photos
            </span>
          </div>
        )}

        {/* Image Counter */}
        {images.length > 0 && (
          <div className="absolute bottom-5 right-5">
            <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
              Property Gallery
            </span>
          </div>
        )}

      </div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

          {images.map((img) => {
            const thumbnailUrl = img.image.startsWith("http")
              ? img.image
              : `${API_URL}${img.image}`;

            const isActive = activeImage === img.image;

            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImage(img.image)}
                className={`group relative h-20 w-24 shrink-0 overflow-hidden rounded-xl transition-all duration-300 md:h-24 md:w-28 ${
                  isActive
                    ? "ring-2 ring-[#C9A961] ring-offset-2 ring-offset-[#FAF6F0]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={thumbnailUrl}
                  alt="Property thumbnail"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />

                {!isActive && (
                  <div className="absolute inset-0 bg-black/10 transition group-hover:bg-transparent" />
                )}
              </button>
            );
          })}

        </div>
      )}

    </div>
  );
}