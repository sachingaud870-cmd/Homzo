"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import {
  getProperty,
  API_URL,
  PropertyPayload,
  PropertyImage,
  updateProperty,
  uploadPropertyImages,
  deletePropertyImage,
  setPropertyImageAsMain,
} from "@/lib/api";


const emptyProperty: PropertyPayload = {
  project_name: "",
  builder_name: "",
  location: "",
  bhk: "2BHK",
  carpet_area: 0,
  price: 0,
  rera_number: "",
  status: "READY_TO_MOVE",
  possession_date: null,
  featured: false,
  description: "",
};


export default function EditPropertyPage() {

  const router = useRouter();

  const params = useParams<{ id: string }>();


  const [formData, setFormData] =
    useState<PropertyPayload>(emptyProperty);


  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const [existingImages, setExistingImages] =
    useState<PropertyImage[]>([]);


  const [loading, setLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);



  useEffect(() => {

    getProperty(params.id)

      .then((property) => {


        setFormData({

          ...emptyProperty,

          ...property,

          carpet_area: Number(property.carpet_area),

          price: Number(property.price),

          possession_date:
            property.possession_date || null,

        });


        setExistingImages(
          property.images || []
        );


      })

      .catch(() =>
        alert("Unable to load this property.")
      )

      .finally(() =>
        setLoading(false)
      );


  }, [params.id]);





  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {

    const {
      name,
      value,
      type
    } = event.target;


    setFormData((previous) => ({

      ...previous,

      [name]:

        type === "checkbox"

          ? (event.target as HTMLInputElement).checked

          : value,

    }));

  }





  function addFiles(files: FileList | File[] | null) {
    const fileList = Array.from(files ?? []);
    const validFiles = fileList.filter((file) => file.type.startsWith("image/"));

    if (!validFiles.length) {
      alert("Please choose valid image files.");
      return;
    }

    setImages((previous) => [...previous, ...validFiles]);
    setPreviewUrls((previous) => [
      ...previous,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ]);
  }

  function removeNewImage(index: number) {
    setImages((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
    setPreviewUrls((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    addFiles(event.dataTransfer.files);
  }

  async function handleDeleteImage(
    id:number
  ){

    try{

      await deletePropertyImage(id);


      setExistingImages((previous)=>

        previous.filter(
          (image)=> image.id !== id
        )

      );


    }
    catch{

      alert(
        "Image delete failed"
      );

    }

  }

  async function handleSetMainImage(id: number) {
    try {
      await setPropertyImageAsMain(id);
      setExistingImages((previous) =>
        previous.map((image) => ({ ...image, is_main: image.id === id }))
      );
    } catch {
      alert("Unable to set main image.");
    }
  }





  async function handleSubmit(
    event: FormEvent
  ){

    event.preventDefault();

    setIsSubmitting(true);


    try{


      await updateProperty(
        Number(params.id),
        formData
      );


      await uploadPropertyImages(
        Number(params.id),
        images
      );


      router.push(
        "/dashboard/properties?success=updated"
      );


      router.refresh();


    }

    catch{

      alert(
        "Failed to update property."
      );

    }

    finally{

      setIsSubmitting(false);

    }

  }





  if(loading)

    return (
      <main className="p-10">
        Loading property...
      </main>
    );





  return (

    <main className="min-h-screen bg-gray-100 p-10">


      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">


        <div className="flex items-center justify-between">


          <h1 className="text-4xl font-bold">
            Edit Property
          </h1>


          <Link

            href="/dashboard/properties"

            className="rounded bg-gray-500 px-5 py-2 text-white"

          >
            Back
          </Link>


        </div>





        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >



          <input
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            className="w-full rounded border p-3"
            placeholder="Project Name"
            required
          />



          <input
            name="builder_name"
            value={formData.builder_name}
            onChange={handleChange}
            className="w-full rounded border p-3"
            placeholder="Builder Name"
            required
          />



          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded border p-3"
            placeholder="Location"
            required
          />



          <select
            name="bhk"
            value={formData.bhk}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >

            <option value="1BHK">
              1 BHK
            </option>

            <option value="2BHK">
              2 BHK
            </option>

            <option value="3BHK">
              3 BHK
            </option>

            <option value="4BHK">
              4 BHK
            </option>

          </select>




          <input
            type="number"
            name="carpet_area"
            value={formData.carpet_area}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />



          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />



          <input
            name="rera_number"
            value={formData.rera_number}
            onChange={handleChange}
            className="w-full rounded border p-3"
            placeholder="RERA Number"
          />



          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >

            <option value="READY_TO_MOVE">
              Ready To Move
            </option>

            <option value="UNDER_CONSTRUCTION">
              Under Construction
            </option>

          </select>




          <input
            type="date"
            name="possession_date"
            value={
              formData.possession_date ?? ""
            }
            onChange={handleChange}
            className="w-full rounded border p-3"
          />



          <label className="flex gap-3">

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

            value={formData.description}

            onChange={handleChange}

            className="w-full rounded border p-3"

          />





          {/* EXISTING IMAGES */}

          <div>

            <h2 className="mb-3 text-xl font-bold">
              Existing Images
            </h2>


            <div className="grid grid-cols-3 gap-4">


              {
                existingImages.map((image)=>(

                  <div
                    key={image.id}
                    className="rounded border p-2"
                  >

                    <img

                      src={image.image.startsWith("http") ? image.image : `${API_URL}${image.image}`}

                      alt={`Property image for ${formData.project_name || "this property"}`}

                      className="h-32 w-full rounded object-cover"

                    />


                    {image.is_main ? (
                      <div className="mt-2 rounded bg-green-100 px-2 py-1 text-center text-sm font-medium text-green-700">
                        Main Image
                      </div>
                    ) : null}

                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSetMainImage(image.id)}
                        className="flex-1 rounded bg-blue-600 py-1 text-white"
                      >
                        Set Main
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image.id)}
                        className="flex-1 rounded bg-red-600 py-1 text-white"
                      >
                        Delete
                      </button>
                    </div>


                  </div>

                ))
              }


            </div>

          </div>






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
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              id="edit-property-images"
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => addFiles(event.target.files)}
              className="hidden"
            />
            <label htmlFor="edit-property-images" className="cursor-pointer">
              <p className="text-lg font-semibold text-gray-800">Upload more images</p>
              <p className="mt-2 text-sm text-gray-600">Drag and drop or choose multiple files.</p>
            </label>
          </div>

          {images.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {images.map((file, index) => (
                <div key={`${file.name}-${file.lastModified}-${index}`} className="rounded border p-2">
                  {previewUrls[index] ? (
                    <img src={previewUrls[index]} alt={file.name} className="mb-2 h-32 w-full rounded object-cover" />
                  ) : null}
                  <p className="truncate text-sm font-medium text-gray-800">{file.name}</p>
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="mt-2 w-full rounded bg-gray-600 py-1 text-white"
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

            className="w-full rounded bg-blue-600 py-3 font-semibold text-white"

          >

            {
              isSubmitting
              ? "Saving..."
              : "Save Changes"
            }

          </button>




        </form>


      </div>


    </main>

  );

}
