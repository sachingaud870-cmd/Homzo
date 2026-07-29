"use client";
import { useState } from "react"; 
export default function LeadForm() {
    
const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  alert("Form Submitted");

  console.log("Form Submitted");
  console.log(formData);

  setSubmitted(true);
};

const [formData, setFormData] = useState({
  name: "",
  mobile: "",
  email: "",
  location: "",
  budget: "",
  message: "",
});


  return (
    <section className="px-10 py-16">

      <div className="mx-auto max-w-2xl rounded-xl p-8 shadow-lg">

        <h2 className="text-3xl font-bold">
          Get Property Details
        </h2>

        <p className="mt-2 text-gray-600">
          Share your details and our property expert will contact you.
        </p>


        <form 
  onSubmit={handleSubmit}
  className="mt-6 space-y-4"
>

          <input
  type="text"
  value={formData.name}
  onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
  }
  className="w-full rounded-lg border p-3"
  placeholder="Your Name"
/>


         <input
  type="tel"
  value={formData.mobile}
  onChange={(e) =>
    setFormData({ ...formData, mobile: e.target.value })
  }
  className="w-full rounded-lg border p-3"
  placeholder="Mobile Number"
/>


          <input
  type="email"
  value={formData.email}
  onChange={(e) =>
    setFormData({ ...formData, email: e.target.value })
  }
  className="w-full rounded-lg border p-3"
  placeholder="Email Address"
/>
<select
  value={formData.location}
  onChange={(e) =>
    setFormData({ ...formData, location: e.target.value })
  }
  className="w-full rounded-lg border p-3">


          
            <option>
              Select Location
            </option>

            <option>
              Vasai
            </option>

            <option>
              Virar
            </option>

            <option>
              Nalasopara
            </option>

          </select>


          <select
  value={formData.budget}
  onChange={(e) =>
    setFormData({ ...formData, budget: e.target.value })
  }
  className="w-full rounded-lg border p-3"
>
            <option>
              Budget
            </option>

            <option>
              Under ₹50 Lakhs
            </option>

            <option>
              ₹50 Lakhs - ₹1 Crore
            </option>

            <option>
              Above ₹1 Crore
            </option>

          </select>


         <textarea
  value={formData.message}
  onChange={(e) =>
    setFormData({ ...formData, message: e.target.value })
  }
  className="w-full rounded-lg border p-3"
  placeholder="Your Requirement"
/>


          <button
  type="submit"
  className="w-full rounded-lg bg-blue-600 py-3 text-white"
>
  Submit Enquiry
</button>
{submitted && (
  <p className="mt-4 text-green-600">
    Thank you! Our property expert will contact you soon.
  </p>
)}

        </form>

      </div>

    </section>
  );
}