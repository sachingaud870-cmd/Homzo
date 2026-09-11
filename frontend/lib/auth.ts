export type StoredUser = {
    username?: string;
    role?: string;
};

let cachedUserValue: string | null | undefined;
let cachedUser: StoredUser | null = null;

export function getUser(): StoredUser | null {

    if(typeof window === "undefined"){
        return null;
    }


    const user = localStorage.getItem("user");

    if (user === cachedUserValue) {
        return cachedUser;
    }

    cachedUserValue = user;


    if(!user){
        cachedUser = null;
        return null;
    }


    try {
        const parsedUser: unknown = JSON.parse(user);

        if (!parsedUser || typeof parsedUser !== "object" || Array.isArray(parsedUser)) {
            throw new Error("Invalid saved user");
        }

        const { username, role } = parsedUser as Record<string, unknown>;
        cachedUser = {
            ...(typeof username === "string" ? { username } : {}),
            ...(typeof role === "string" ? { role } : {}),
        };

        return cachedUser;
    } catch {
        localStorage.removeItem("user");
        cachedUserValue = null;
        cachedUser = null;
        return null;
    }

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

    cachedUserValue = null;
    cachedUser = null;

}
