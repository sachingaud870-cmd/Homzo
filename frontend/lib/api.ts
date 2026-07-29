const API_URL = "http://127.0.0.1:8000";


// ===============================
// GET ALL PROPERTIES
// ===============================

export async function getProperties(
  params?: {
    [key:string]: string | string[] | undefined
  }
) {

  const query = new URLSearchParams();


  if(params){

    Object.entries(params).forEach(([key,value])=>{

      if(value){

        query.append(
          key,
          Array.isArray(value)
            ? value[0]
            : value
        );

      }

    });

  }



  const response = await fetch(
    `${API_URL}/api/properties/?${query.toString()}`,
    {
      cache:"no-store",
    }
  );


  if(!response.ok){

    throw new Error(
      "Failed to fetch properties"
    );

  }


  return response.json();

}




// ===============================
// GET SINGLE PROPERTY
// ===============================

export async function getProperty(
  id:string
){

  const response = await fetch(
    `${API_URL}/api/properties/${id}/`,
    {
      cache:"no-store",
    }
  );


  if(!response.ok){

    throw new Error(
      "Failed to fetch property"
    );

  }


  return response.json();

}




// ===============================
// CREATE LEAD
// ===============================

export async function createLead(
  data:any
){

  const response = await fetch(
    `${API_URL}/api/leads/`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(data),

    }
  );


  const result = await response.json();



  if(!response.ok){

    console.log(
      "Django Error:",
      result
    );


    throw new Error(
      "Failed to create lead"
    );

  }


  return result;

}




// ===============================
// GET ALL LEADS
// ===============================

export async function getLeads(){

  const response = await fetch(
    `${API_URL}/api/leads/`,
    {
      cache:"no-store",
    }
  );


  if(!response.ok){

    throw new Error(
      "Failed to fetch leads"
    );

  }


  return response.json();

}




// ===============================
// UPDATE LEAD STATUS
// ===============================

export async function updateLeadStatus(
  id:number,
  status:string
){

  const response = await fetch(
    `${API_URL}/api/leads/${id}/`,
    {
      method:"PATCH",

      headers:{
        "Content-Type":"application/json",
      },


      body:JSON.stringify({

        status:status

      }),

    }
  );


  if(!response.ok){

    throw new Error(
      "Failed to update lead status"
    );

  }


  return response.json();

}




// ===============================
// DASHBOARD STATS
// ===============================

export async function getDashboardStats(){

  const response = await fetch(
    `${API_URL}/api/dashboard/stats/`,
    {
      cache:"no-store",
    }
  );


  if(!response.ok){

    throw new Error(
      "Failed to fetch dashboard stats"
    );

  }


  return response.json();

}