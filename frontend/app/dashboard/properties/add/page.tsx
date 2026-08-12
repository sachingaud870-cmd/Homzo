"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProperty, uploadPropertyImages } from "@/lib/api";

export default function AddPropertyPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    project_name: "",
    builder_name: "",
    location: "",
    bhk: "2BHK",
    carpet_area: "",
    price: "",
    rera_number: "",
    status: "READY_TO_MOVE",
    possession_date: "",
    featured: false,
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  function addFiles(files: FileList | File[] | null) {
    const fileList = Array.from(files ?? []);

    if (!fileList.length) {
      return;
    }

    const validImages = fileList.filter((file) => file.type.startsWith("image/"));

    if (!validImages.length) {
      setImageError("Please select valid image files.");
      return;
    }

    const uniqueImages = validImages.filter(
      (file) =>
        !images.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        )
    );

    if (!uniqueImages.length) {
      setImageError("These images are already selected.");
      return;
    }

    setImages((prev) => [...prev, ...uniqueImages]);
    setPreviewUrls((prev) => [
      ...prev,
      ...uniqueImages.map((file) => URL.createObjectURL(file)),
    ]);
    setImageError("");
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    setPreviewUrls((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    addFiles(event.dataTransfer.files);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const property = await createProperty({
        ...formData,
        carpet_area: Number(formData.carpet_area),
        price: Number(formData.price),
        possession_date: formData.possession_date || null,
      });
      await uploadPropertyImages(property.id, images);

      router.push("/dashboard/properties?success=created");
    } catch (error) {
      console.error(error);
      alert("Failed to add property.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Add Property</h1>

          <Link
            href="/dashboard/properties"
            className="rounded bg-gray-500 px-5 py-2 text-white"
          >
            Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            name="project_name"
            placeholder="Project Name"
            value={formData.project_name}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            name="builder_name"
            placeholder="Builder Name"
            value={formData.builder_name}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <select
            name="bhk"
            value={formData.bhk}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="4BHK">4 BHK</option>
          </select>

          <input
            type="number"
            name="carpet_area"
            placeholder="Carpet Area (sq.ft)"
            value={formData.carpet_area}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            name="rera_number"
            placeholder="RERA Number"
            value={formData.rera_number}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >
            <option value="READY_TO_MOVE">Ready To Move</option>
            <option value="UNDER_CONSTRUCTION">
              Under Construction
            </option>
          </select>

          <input
            type="date"
            name="possession_date"
            value={formData.possession_date}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured Property
          </label>

          <textarea
            rows={5}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <div
            onDragEnter={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setDragActive(false);
            }}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              id="property-image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => addFiles(event.target.files)}
              className="hidden"
            />
            <label htmlFor="property-image-upload" className="cursor-pointer">
              <p className="text-lg font-semibold text-gray-800">
                Drag and drop property images here
              </p>
              <p className="mt-2 text-sm text-gray-600">
                You can upload multiple photos at once. JPG, PNG, and WebP are supported.
              </p>
            </label>
            {imageError ? (
              <p className="mt-3 text-sm text-red-600">{imageError}</p>
            ) : null}
          </div>

          {images.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {images.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}-${index}`}
                  className="rounded-xl border border-gray-200 p-3"
                >
                  {previewUrls[index] ? (
                    <img
                      src={previewUrls[index]}
                      alt={file.name}
                      className="mb-3 h-32 w-full rounded-lg object-cover"
                    />
                  ) : null}
                  <p className="truncate text-sm font-medium text-gray-800">
                    {file.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="mt-3 text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {isSubmitting ? "Saving..." : "Save Property"}
          </button>
        </form>
      </div>
    </main>
  );
}
