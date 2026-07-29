import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import Hero from "@/components/home/Hero";


type Property = {
  id: number;
  project_name: string;
  builder_name: string;
  location: string;
  bhk: string;
  price: string;
  status: string;
  carpet_area: number;

  images: {
    id: number;
    image: string;
    is_main: boolean;
  }[];
};



export default async function Home() {

  const properties: Property[] = await getProperties();


  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <Hero />


      <h1 className="text-4xl font-bold">
        PropVerse Properties
      </h1>


      <p className="mt-2 text-gray-600">
        Find your dream home with premium properties
      </p>


      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">


        {properties.map((property) => (

          <PropertyCard
            key={property.id}
            property={property}
          />

        ))}


      </div>


    </main>
  );
}