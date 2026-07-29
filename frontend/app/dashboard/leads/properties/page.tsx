import { getProperties } from "@/lib/api";


export default async function PropertiesDashboard(){


const properties = await getProperties();



return (

<main className="min-h-screen bg-gray-100 p-10">


<div className="mx-auto max-w-7xl bg-white rounded-xl shadow p-8">


<div className="flex justify-between items-center">


<h1 className="text-4xl font-bold">
Property Management
</h1>


<button className="bg-blue-600 text-white px-5 py-2 rounded-lg">

+ Add Property

</button>


</div>




<table className="mt-8 w-full border-collapse border">


<thead>

<tr className="bg-gray-200">


<th className="border p-3">
Project
</th>


<th className="border p-3">
Builder
</th>


<th className="border p-3">
Location
</th>


<th className="border p-3">
BHK
</th>


<th className="border p-3">
Price
</th>


<th className="border p-3">
Status
</th>


<th className="border p-3">
Action
</th>


</tr>

</thead>




<tbody>


{

properties.map((property:any)=>(


<tr key={property.id}>


<td className="border p-3">
{property.project_name}
</td>


<td className="border p-3">
{property.builder_name}
</td>


<td className="border p-3">
{property.location}
</td>


<td className="border p-3">
{property.bhk}
</td>


<td className="border p-3">
₹ {property.price}
</td>


<td className="border p-3">
{property.status}
</td>


<td className="border p-3">


<button className="bg-yellow-500 text-white px-3 py-1 rounded">

Edit

</button>


<button className="ml-2 bg-red-600 text-white px-3 py-1 rounded">

Delete

</button>


</td>


</tr>


))

}


</tbody>


</table>


</div>


</main>

);


}