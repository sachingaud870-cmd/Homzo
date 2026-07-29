"use client";

import { useState } from "react";


export default function EnquiryForm({
  propertyId
}:{
  propertyId:number
}) {


const [form,setForm] = useState({

name:"",
mobile:"",
email:"",
location:"",
budget:"",
message:""

});


async function handleSubmit(e:React.FormEvent){

e.preventDefault();


const response = await fetch(
"http://127.0.0.1:8000/api/leads/",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

property:propertyId,

...form

})

});


if(response.ok){

alert("Enquiry Submitted Successfully");

}
else{

alert("Something went wrong");

}


}



return (

<form
onSubmit={handleSubmit}
className="mt-8 space-y-4 rounded-xl bg-gray-100 p-6"
>


<input
className="w-full rounded border p-3"
placeholder="Name"
onChange={(e)=>setForm({...form,name:e.target.value})}
/>


<input
className="w-full rounded border p-3"
placeholder="Mobile"
onChange={(e)=>setForm({...form,mobile:e.target.value})}
/>


<input
className="w-full rounded border p-3"
placeholder="Email"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>


<input
className="w-full rounded border p-3"
placeholder="Location"
onChange={(e)=>setForm({...form,location:e.target.value})}
/>


<input
className="w-full rounded border p-3"
placeholder="Budget"
onChange={(e)=>setForm({...form,budget:e.target.value})}
/>


<textarea
className="w-full rounded border p-3"
placeholder="Message"
onChange={(e)=>setForm({...form,message:e.target.value})}
/>


<button
className="rounded-lg bg-blue-600 px-8 py-3 text-white"
>
Submit Enquiry
</button>


</form>

)

}