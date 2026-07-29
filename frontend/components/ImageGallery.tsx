"use client";

import { useState } from "react";


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
  images[0]?.image
);



return (

<div>


<img
src={activeImage}
className="h-[450px] w-full rounded-xl object-cover"
/>



<div className="mt-4 flex gap-4">


{
images.map((img)=>(

<img

key={img.id}

src={img.image}

onClick={()=>setActiveImage(img.image)}

className="h-24 w-24 cursor-pointer rounded-lg object-cover"

/>

))
}


</div>


</div>

)

}