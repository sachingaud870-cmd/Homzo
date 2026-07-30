"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { API_URL } from "@/lib/api";


export default function ImageGallery({
  images
}:{
  images:{
    id:number;
    image:string;
    is_main:boolean;
  }[]
}){


const [activeImage,setActiveImage] = useState(
  images[0]?.image ?? null
);
const imageUrl = activeImage?.startsWith("http") ? activeImage : activeImage ? `${API_URL}${activeImage}` : null;



return (

<div>


{imageUrl ? <img src={imageUrl} alt="Property" className="h-[450px] w-full rounded-xl object-cover" /> : <div className="flex h-[450px] items-center justify-center rounded-xl bg-gray-100 text-gray-500">No images available</div>}



<div className="mt-4 flex gap-4">


{
images.map((img)=>(

<img

key={img.id}

src={img.image.startsWith("http") ? img.image : `${API_URL}${img.image}`}
alt="Property thumbnail"

onClick={()=>setActiveImage(img.image)}

className="h-24 w-24 cursor-pointer rounded-lg object-cover"

/>

))
}


</div>


</div>

)

}
