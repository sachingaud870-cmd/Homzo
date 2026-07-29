import Link from "next/link";


export default function Navbar() {

  return (

    <nav className="flex items-center justify-between px-10 py-5 shadow-sm">


      <Link 
        href="/"
        className="text-3xl font-bold text-blue-600"
      >
        PropVerse
      </Link>



      <div className="flex gap-8 text-gray-700">


        <Link href="/">
          Home
        </Link>


        <Link href="/properties">
          Properties
        </Link>


        <Link href="/about">
          About
        </Link>


        <Link href="/contact">
          Contact
        </Link>


      </div>



      <button 
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Login
      </button>


    </nav>

  );

}