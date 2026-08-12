export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export type PropertyPayload = {
  project_name: string;
  builder_name: string;
  location: string;
  bhk: string;
  carpet_area: number;
  price: number;
  rera_number: string;
  status: string;
  possession_date: string | null;
  featured: boolean;
  description: string;
};
export type PropertyImage = {
  id: number;
  image: string;
  is_main: boolean;
};

export type LeadPayload = {
  property?: number;
  name: string;
  mobile: string;
  email: string;
  location: string;
  budget: string;
  message: string;
  follow_up_date?: string | null;
  follow_up_note?: string;
  preferred_channel?: "CALL" | "WHATSAPP" | "EMAIL";
};

export type Lead = LeadPayload & {
  id: number;
  status: "NEW" | "CONTACTED" | "INTERESTED" | "CLOSED";
  created_at: string;
};

export type PaginatedLeads = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Lead[];
};

// ===============================
// GET ALL PROPERTIES
// ===============================

export async function getProperties(
  params?: {
    [key: string]: string | string[] | undefined;
  }
) {
  const query = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        query.append(
          key,
          Array.isArray(value) ? value[0] : value
        );
      }
    });
  }

  const response = await fetch(
    `${API_URL}/api/properties/?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {

    throw new Error("Failed to fetch properties");
  }

  return response.json();
}

// ===============================
// GET SINGLE PROPERTY
// ===============================

export async function getProperty(id: string) {
  const response = await fetch(
    `${API_URL}/api/properties/${id}/`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
}

// ===============================
// CREATE PROPERTY
// ===============================

export async function createProperty(data: PropertyPayload) {
  const response = await fetch(
    `${API_URL}/api/properties/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log("Create Property Error:", result);
    throw new Error("Failed to create property");
  }

  return result;
}

// ===============================
// UPDATE PROPERTY
// ===============================

export async function updateProperty(
  id: number,
  data: PropertyPayload
) {
  const response = await fetch(
    `${API_URL}/api/properties/${id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log("Update Property Error:", result);
    throw new Error("Failed to update property");
  }

  return result;
}

// ===============================
// DELETE PROPERTY
// ===============================

export async function deleteProperty(id: number) {
  const response = await fetch(
    `${API_URL}/api/properties/${id}/`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete property");
  }

  return true;
}

// ===============================
// CREATE LEAD
// ===============================

export async function createLead(data: LeadPayload) {
  const response = await fetch(
    `${API_URL}/api/leads/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log("Lead Error:", result);
    throw new Error("Failed to create lead");
  }

  return result;
}

// ===============================
// GET ALL LEADS
// ===============================

export async function getLeads(params: Record<string, string | number | undefined> = {}): Promise<PaginatedLeads> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const response = await fetch(
    `${API_URL}/api/leads/?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}

// ===============================
// UPDATE LEAD STATUS
// ===============================

export async function updateLeadStatus(
  id: number,
  status: string,
  followUp?: { follow_up_date?: string | null; follow_up_note?: string; preferred_channel?: string }
) {
  const response = await fetch(
    `${API_URL}/api/leads/${id}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        ...followUp,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update lead status");
  }

  return response.json();
}

// ===============================
// DASHBOARD STATS
// ===============================

export async function getDashboardStats() {
  const response = await fetch(
    `${API_URL}/api/dashboard/stats/`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return response.json();
}

export async function triggerLeadAutomation(id: number, channel: string) {
  const response = await fetch(`${API_URL}/api/leads/${id}/automate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channel }),
  });

  if (!response.ok) {
    throw new Error("Failed to trigger outreach");
  }

  return response.json();
}

export async function searchProperties(location: string, bhk: string) {
  return getProperties({ location, bhk });
}

export async function uploadPropertyImages(id: number, files: File[]) {
  if (!files.length) return [];

  const data = new FormData();
  files.forEach((file) => data.append("images", file));

  const response = await fetch(`${API_URL}/api/properties/${id}/images/`, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Failed to upload property images");
  }

  return response.json();
}

export async function deletePropertyImage(id:number){

 const response = await fetch(
 `${API_URL}/api/properties/images/${id}/delete/`,
 {
   method:"DELETE",
 }
 );

 if(!response.ok){
   throw new Error("Failed to delete image");
 }

 return true;
}

export async function setPropertyImageAsMain(id:number){
 const response = await fetch(
   `${API_URL}/api/properties/images/${id}/set-main/`,
   {
     method:"POST",
   }
 );

 if(!response.ok){
   throw new Error("Failed to set main image");
 }

 return response.json();
}

export async function login(username: string, password: string) {
  const response = await fetch("http://127.0.0.1:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return response.json();
}

export async function getRecommendations(
  location: string = "",
  bhk: string = "",
  budget: string = ""
) {
  const params = new URLSearchParams();

  if (location) {
    params.append("location", location);
  }

  if (bhk) {
    params.append("bhk", bhk);
  }

  if (budget) {
    params.append("budget", budget);
  }

  const response = await fetch(
    `${API_URL}/api/properties/recommendations/?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}