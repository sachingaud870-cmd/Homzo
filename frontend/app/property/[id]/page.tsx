import { getProperty } from "@/lib/api";
import EnquiryForm from "@/components/EnquiryForm";
import ImageGallery from "@/components/ImageGallery";


export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const property = await getProperty(id);


  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow-lg">


        {/* Main Image */}

       <ImageGallery 
 images={property.images}
/>

        {/* Title */}

        <h1 className="mt-8 text-4xl font-bold">
          {property.project_name}
        </h1>


        <p className="mt-3 text-gray-600">
          📍 {property.location}
        </p>


        <p className="mt-2 text-gray-600">
          Builder: {property.builder_name}
        </p>


        {/* Details */}

        <div className="mt-6 grid grid-cols-2 gap-4">


          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-500">
              BHK
            </p>

            <p className="font-bold">
              {property.bhk}
            </p>
          </div>



          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-500">
              Carpet Area
            </p>

            <p className="font-bold">
              {property.carpet_area} sq.ft
            </p>
          </div>



          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-500">
              Status
            </p>

            <p className="font-bold">
              {property.status}
            </p>
          </div>



          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-500">
              Price
            </p>

            <p className="font-bold text-blue-600">
              ₹ {Number(property.price).toLocaleString("en-IN")}
            </p>
          </div>


        </div>



        {/* Description */}

        <h2 className="mt-8 text-2xl font-bold">
          About Property
        </h2>


        <p className="mt-3 leading-7 text-gray-700">
          {property.description}
        </p>



        {/* Enquiry Button */}

        <EnquiryForm propertyId={property.id}/>


      </div>

    </main>

  );
}

