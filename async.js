import getData from "./sync.js";

let API = "http://localhost:3000/data";

async function addUser (newUser){
    try {
        let {data} = await axios.post(API,newUser);
        get();
    } catch (error) {
        
    }
}

async function showInfo (e){
    try {
        let {data} = await axios.get(`${API}/${e.id}`);
        alert(data.name + "  " +  data.status);
    } catch (error) {
        
    }
}

async function editUser(e, New) {
  try {
    let { data } = await axios.put(`${API}/${e.id}`, New);
    get();
  } catch (error) {
    console.log(error);
  }
}

async function updateStatus(e) {
  try {
    let { data } = await axios.put(`${API}/${e.id}`, {
      ...e,
      status: !e.status,
    });
    get();
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(e) {
  try {
    let { data } = await axios.delete(`${API}/${e.id}`);
    get();
  } catch (error) {
    console.log(error);
  }
}

async function get() {
  try {
    let { data } = await axios.get(API);
    getData(data);
  } catch (error) {
    console.log(error);
  }
}

async function filterBy(value) {
    if (value=="ALL") {
        get();
    }
    else if (value=="true"){
        try {
            let {data} = await axios.get(`${API}?status=${"true"}`);
            getData(data);
        } catch (error) {
            console.log(error);
        }
    }
    else if (value=="false"){
        try {
            let {data} = await axios.get(`${API}?status=${"false"}`);
            getData(data);
        } catch (error) {
            console.log(error);
        }
    }
}

async function searchByName(name) {
    try {
        let {data} = await axios.get(`${API}?name=${name}`);
        getData(data);
    } catch (error) {
        console.log(error); 
    }
}


export {searchByName}
export {filterBy}
export {addUser}
export {showInfo}
export { editUser };
export { updateStatus };
export { deleteUser };
export default get;
