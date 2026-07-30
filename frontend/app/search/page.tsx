import { searchProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

type Property = { id: number; project_name: string; builder_name: string; location: string; status: string; price: string; bhk: string; carpet_area: number; images: { id: number; image: string; is_main: boolean }[] };


export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
    bhk?: string;
  }>;
}) {


  const params = await searchParams;


  const properties = await searchProperties(
    params.location || "",
    params.bhk || ""
  );


  return (

    <main className="min-h-screen bg-gray-100 p-10">


      <h1 className="text-4xl font-bold">
        Search Results
      </h1>


      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">


        {properties.map((property: Property)=>(

          <PropertyCard
            key={property.id}
            property={property}
          />

        ))}


      </div>


    </main>

  );
}
