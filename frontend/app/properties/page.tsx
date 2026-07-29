import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";


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



export default async function PropertiesPage({

  searchParams,

}: {

  searchParams: Promise<{
    [key:string]: string | string[] | undefined
  }>

}) {


  const params = await searchParams;


  const properties = await getProperties(params);



  return (

    <main className="min-h-screen bg-gray-100 p-10">


      <div className="mx-auto max-w-7xl">


        <h1 className="text-4xl font-bold">
          All Properties
        </h1>


        <p className="mt-2 text-gray-600">
          Browse all available properties
        </p>



        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">



          {/* Filter Sidebar */}

          <div className="lg:col-span-1">

            <PropertyFilter />

          </div>





          {/* Properties List */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-3">


            {
              properties.map(
                (property: Property)=>(
                  
                  <PropertyCard

                    key={property.id}

                    property={property}

                  />

                )
              )
            }


          </div>



        </div>



      </div>


    </main>

  );

}