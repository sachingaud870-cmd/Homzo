export default function Navbar(){

return(

<nav className="flex items-center justify-between px-10 py-5 bg-white shadow">


<h1 className="text-3xl font-bold text-blue-600">
PropVerse
</h1>


<div className="flex gap-8 text-gray-700">

<a href="/">Home</a>

<a href="/properties">
Properties
</a>

<a href="#">
About
</a>

<a href="#">
Contact
</a>

</div>


<button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
Login
</button>


</nav>

)

}