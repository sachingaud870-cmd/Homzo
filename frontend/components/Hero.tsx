export default function Hero() {
  return (
    <section className="px-10 py-24 text-center">

      <h1 className="text-5xl font-bold text-gray-900">
        Find Your Dream Property
      </h1>

      <p className="mt-5 text-xl text-gray-600">
        Discover premium homes and projects across Vasai-Virar
      </p>


      <div className="mx-auto mt-10 flex max-w-4xl gap-4 rounded-xl bg-white p-5 shadow-lg">

        <input
          className="flex-1 rounded-lg border p-4"
          placeholder="Search location..."
        />

        <select className="rounded-lg border p-4">
          <option>Select Property Type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Commercial</option>
        </select>


        <button className="rounded-lg bg-blue-600 px-8 text-white">
          Search
        </button>

      </div>

    </section>
  );
}