"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage(){


const router = useRouter();


const [username,setUsername] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);



async function handleLogin(e:any){

e.preventDefault();


setLoading(true);



try{


const response = await fetch(
"http://127.0.0.1:8000/api/login/",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

username,
password

})


}

);



const data = await response.json();



if(!response.ok){

alert(data.detail || "Login failed");

return;

}




// save token

localStorage.setItem(
"access",
data.access
);



localStorage.setItem(
"refresh",
data.refresh
);



// save user

localStorage.setItem(
"user",
JSON.stringify({
username:username
})
);



// update navbar

window.dispatchEvent(
new Event("auth-change")
);



router.push("/");


}

catch(error){

console.log(error);

alert("Server error");

}


finally{

setLoading(false);

}


}





return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">


<form
onSubmit={handleLogin}
className="bg-white p-8 rounded-xl shadow w-96"
>


<h1 className="text-3xl font-bold mb-6">
Login
</h1>



<input

className="w-full border p-3 mb-4 rounded"

placeholder="Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>



<input

type="password"

className="w-full border p-3 mb-4 rounded"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button

disabled={loading}

className="w-full bg-blue-600 text-white py-3 rounded"

>


{
loading
?
"Logging..."
:
"Login"
}


</button>


</form>


</div>

);


}