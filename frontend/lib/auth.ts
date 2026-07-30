export function getUser(){

    if(typeof window === "undefined"){
        return null;
    }


    const user = localStorage.getItem("user");


    if(!user){
        return null;
    }


    return JSON.parse(user);

}



export function getToken(){

    if(typeof window === "undefined"){
        return null;
    }


    return localStorage.getItem("access");

}




export function logout(){

    localStorage.removeItem("access");

    localStorage.removeItem("refresh");

    localStorage.removeItem("user");

}