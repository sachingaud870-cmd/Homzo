"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { getProperty, PropertyPayload, updateProperty, uploadPropertyImages } from "@/lib/api";

const emptyProperty = {
  project_name: "", builder_name: "", location: "", bhk: "2BHK", carpet_area: 0,
  price: 0, rera_number: "", status: "READY_TO_MOVE", possession_date: null,
  featured: false, description: "",
};

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [formData, setFormData] = useState<PropertyPayload>(emptyProperty);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getProperty(params.id)
      .then((property) => setFormData({
        ...emptyProperty,
        ...property,
        carpet_area: Number(property.carpet_area),
        price: Number(property.price),
        possession_date: property.possession_date || null,
      }))
      .catch(() => alert("Unable to load this property."))
      .finally(() => setLoading(false));
  }, [params.id]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await updateProperty(Number(params.id), formData);
      await uploadPropertyImages(Number(params.id), images);
      router.push("/dashboard/properties");
      router.refresh();
    } catch {
      alert("Failed to update property.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return <main className="p-10">Loading property...</main>;

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <div className="flex items-center justify-between"><h1 className="text-4xl font-bold">Edit Property</h1><Link href="/dashboard/properties" className="rounded bg-gray-500 px-5 py-2 text-white">Back</Link></div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input name="project_name" value={formData.project_name} onChange={handleChange} className="w-full rounded border p-3" required />
          <input name="builder_name" value={formData.builder_name} onChange={handleChange} className="w-full rounded border p-3" required />
          <input name="location" value={formData.location} onChange={handleChange} className="w-full rounded border p-3" required />
          <select name="bhk" value={formData.bhk} onChange={handleChange} className="w-full rounded border p-3"><option value="1BHK">1 BHK</option><option value="2BHK">2 BHK</option><option value="3BHK">3 BHK</option><option value="4BHK">4 BHK</option></select>
          <input type="number" name="carpet_area" value={formData.carpet_area} onChange={handleChange} className="w-full rounded border p-3" min="0" required />
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full rounded border p-3" min="0" required />
          <input name="rera_number" value={formData.rera_number} onChange={handleChange} className="w-full rounded border p-3" placeholder="RERA Number" />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded border p-3"><option value="READY_TO_MOVE">Ready To Move</option><option value="UNDER_CONSTRUCTION">Under Construction</option></select>
          <input type="date" name="possession_date" value={formData.possession_date ?? ""} onChange={handleChange} className="w-full rounded border p-3" />
          <label className="flex items-center gap-3"><input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} /> Featured Property</label>
          <textarea rows={5} name="description" value={formData.description} onChange={handleChange} className="w-full rounded border p-3" required />
          <input type="file" multiple accept="image/*" onChange={(event) => setImages(Array.from(event.target.files ?? []))} className="w-full rounded border p-3" />
          <button type="submit" disabled={isSubmitting} className="w-full rounded bg-blue-600 py-3 font-semibold text-white disabled:opacity-60">{isSubmitting ? "Saving..." : "Save Changes"}</button>
        </form>
      </div>
    </main>
  );
}
