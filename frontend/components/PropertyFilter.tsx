"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function PropertyFilter() {

  const router = useRouter();


  const [location, setLocation] = useState("");
  const [bhk, setBhk] = useState("");
  const [status, setStatus] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");



  function handleFilter() {

    const params = new URLSearchParams();


    if(location){
      params.append("location", location);
    }


    if(bhk){
      params.append("bhk", bhk);
    }


    if(status){
      params.append("status", status);
    }


    if(minPrice){
      params.append("min_price", minPrice);
    }


    if(maxPrice){
      params.append("max_price", maxPrice);
    }


    router.push(
      `/properties?${params.toString()}`
    );

  }



  return (

    <div className="rounded-xl bg-white p-6 shadow">


      <h2 className="mb-5 text-xl font-bold">
        Filter Properties
      </h2>



      <input

        placeholder="Location"

        value={location}

        onChange={(e)=>setLocation(e.target.value)}

        className="mb-3 w-full rounded border p-3"

      />



      <select

        value={bhk}

        onChange={(e)=>setBhk(e.target.value)}

        className="mb-3 w-full rounded border p-3"

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




      <select

        value={status}

        onChange={(e)=>setStatus(e.target.value)}

        className="mb-3 w-full rounded border p-3"

      >

        <option value="">
          Select Status
        </option>

        <option value="READY_TO_MOVE">
          Ready To Move
        </option>

        <option value="UNDER_CONSTRUCTION">
          Under Construction
        </option>


      </select>




      <input

        placeholder="Min Price"

        type="number"

        value={minPrice}

        onChange={(e)=>setMinPrice(e.target.value)}

        className="mb-3 w-full rounded border p-3"

      />




      <input

        placeholder="Max Price"

        type="number"

        value={maxPrice}

        onChange={(e)=>setMaxPrice(e.target.value)}

        className="mb-5 w-full rounded border p-3"

      />




      <button

        onClick={handleFilter}

        className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"

      >

        Apply Filter

      </button>


    </div>

  );
}