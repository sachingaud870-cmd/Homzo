"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Hero(){

const router = useRouter();


const [location,setLocation] = useState("");

const [bhk,setBhk] = useState("");



function handleSearch(){

router.push(
`/search?location=${location}&bhk=${bhk}`
);

}



return(

<section className="relative flex min-h-[600px] items-center justify-center bg-gray-900">


{/* Background Image */}

<div className="absolute inset-0">

<img
src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
className="h-full w-full object-cover opacity-60"
/>

</div>



{/* Content */}

<div className="relative z-10 text-center text-white">


<h1 className="text-6xl font-bold">
Find Your Dream Home
</h1>


<p className="mt-5 text-xl">
Premium properties at the best locations
</p>



{/* Search Box */}

<div className="mt-10 flex gap-3 rounded-xl bg-white p-4">


<input

value={location}

onChange={(e)=>setLocation(e.target.value)}

placeholder="Search Location"

className="rounded-lg border p-3 text-black"

/>



<select

value={bhk}

onChange={(e)=>setBhk(e.target.value)}

className="rounded-lg border p-3 text-black"

>


<option value="">
Select BHK
</option>


<option value="1BHK">
1 BHK
</option>


<option value="2BHK">
2 BHK
</option>


<option value="3BHK">
3 BHK
</option>


</select>



<button

onClick={handleSearch}

className="rounded-lg bg-blue-600 px-8 text-white"

>

Search

</button>



</div>


</div>


</section>

)

}