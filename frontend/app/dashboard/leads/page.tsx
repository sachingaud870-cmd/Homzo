"use client";


import { useEffect, useState } from "react";

import {
  getLeads,
  getDashboardStats,
  updateLeadStatus
} from "@/lib/api";



export default function LeadsPage(){


  const [leads,setLeads] = useState<any[]>([]);

  const [stats,setStats] = useState<any>({});

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadData();

  },[]);




  async function loadData(){

    try{


      const leadData = await getLeads();

      const statsData = await getDashboardStats();



      setLeads(leadData);

      setStats(statsData);

      setLoading(false);



    }

    catch(error){

      console.log(
        "Dashboard Error:",
        error
      );

      setLoading(false);

    }

  }





  async function changeStatus(
    id:number,
    status:string
  ){


    try{


      await updateLeadStatus(
        id,
        status
      );



      setLeads((previousLeads)=>

        previousLeads.map((lead)=>

          lead.id === id

          ?

          {
            ...lead,
            status:status
          }

          :

          lead

        )

      );


      loadData();


    }

    catch(error){

      console.log(
        "Status Update Error:",
        error
      );

    }


  }





  if(loading){

    return (

      <div className="p-10 text-xl">

        Loading Dashboard...

      </div>

    );

  }





return (

<main className="min-h-screen bg-gray-100 p-10">


<div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow">


<h1 className="text-4xl font-bold">
Lead Dashboard
</h1>


<p className="mt-2 text-gray-600">
Manage customer enquiries
</p>





{/* STATS CARDS */}

<div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">


<div className="rounded-xl bg-blue-100 p-5">

<h3 className="text-gray-600">
Properties
</h3>

<p className="text-3xl font-bold">
{stats.total_properties || 0}
</p>

</div>





<div className="rounded-xl bg-green-100 p-5">

<h3 className="text-gray-600">
Total Leads
</h3>

<p className="text-3xl font-bold">
{stats.total_leads || 0}
</p>

</div>





<div className="rounded-xl bg-yellow-100 p-5">

<h3 className="text-gray-600">
New Leads
</h3>

<p className="text-3xl font-bold">
{stats.new_leads || 0}
</p>

</div>





<div className="rounded-xl bg-purple-100 p-5">

<h3 className="text-gray-600">
Interested
</h3>

<p className="text-3xl font-bold">
{stats.interested_leads || 0}
</p>

</div>





<div className="rounded-xl bg-red-100 p-5">

<h3 className="text-gray-600">
Closed
</h3>

<p className="text-3xl font-bold">
{stats.closed_leads || 0}
</p>

</div>


</div>







{/* LEADS TABLE */}


<div className="mt-10 overflow-x-auto">


<table className="w-full border-collapse border">


<thead>


<tr className="bg-gray-200">


<th className="border p-3 text-left">
Name
</th>


<th className="border p-3">
Mobile
</th>


<th className="border p-3">
Email
</th>


<th className="border p-3">
Location
</th>


<th className="border p-3">
Budget
</th>


<th className="border p-3">
Status
</th>


<th className="border p-3">
Date
</th>


</tr>


</thead>





<tbody>


{

leads.map((lead:any)=>(


<tr
key={lead.id}
className="border-t"
>



<td className="border p-3">
{lead.name}
</td>



<td className="border p-3">
{lead.mobile}
</td>



<td className="border p-3">
{lead.email}
</td>



<td className="border p-3">
{lead.location}
</td>



<td className="border p-3">
{lead.budget}
</td>





<td className="border p-3">


<select


value={
lead.status || "NEW"
}


onChange={(e)=>

changeStatus(
lead.id,
e.target.value
)

}


className="rounded border p-2"


>


<option value="NEW">
NEW
</option>


<option value="CONTACTED">
CONTACTED
</option>


<option value="INTERESTED">
INTERESTED
</option>


<option value="CLOSED">
CLOSED
</option>


</select>


</td>





<td className="border p-3">

{
new Date(
lead.created_at
).toLocaleDateString()
}

</td>



</tr>


))


}



</tbody>


</table>


</div>


</div>


</main>

);


}