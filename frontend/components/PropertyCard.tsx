import Link from "next/link";


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


export default function PropertyCard(
  { property }: { property: Property }
) {

  return (
    <div className="rounded-xl bg-white p-5 shadow-lg transition hover:shadow-xl">


      {/* Property Image */}

      <div className="h-48 overflow-hidden rounded-lg">

        {property.images && property.images.length > 0 ? (

          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.images[0].image}
            alt={property.project_name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />

        ) : (

          <div className="flex h-full items-center justify-center bg-gray-200">
            No Image
          </div>

        )}

      </div>



      {/* Property Name */}

      <h2 className="mt-5 text-2xl font-bold">
        {property.project_name}
      </h2>



      {/* Location */}

      <p className="mt-2 text-gray-600">
        📍 {property.location}
      </p>



      {/* Builder */}

      <p className="text-gray-500">
        Builder: {property.builder_name}
      </p>



      {/* Status + BHK */}

      <div className="mt-4 flex items-center justify-between">

        <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
          {property.status.replace("_", " ")}
        </span>


        <span className="font-semibold">
          {property.bhk}
        </span>

      </div>



      {/* Area */}

      <p className="mt-3 text-gray-600">
        📐 {property.carpet_area} sq.ft
      </p>



      {/* Price */}

      <p className="mt-3 text-xl font-bold">
        ₹ {Number(property.price).toLocaleString("en-IN")}
      </p>



      {/* Details Button */}

      <Link
        href={`/property/${property.id}`}
        className="mt-5 block w-full rounded-lg bg-blue-600 py-3 text-center text-white hover:bg-blue-700"
      >
        View Details
      </Link>


    </div>
  );
}