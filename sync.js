import {deleteUser} from "./async.js"
import {updateStatus} from "./async.js"
import {editUser} from "./async.js";
import {showInfo} from "./async.js";
import {addUser} from "./async.js";
import {filterBy} from "./async.js";
import {searchByName} from "./async.js";

let box = document.querySelector(".box");
let Modal = document.querySelector(".dialog");
let form = document.querySelector(".form");
let close = document.querySelector(".Cancel");
let addNew = document.querySelector(".addNew");
let filter = document.querySelector("#filter");
let formSearch = document.querySelector(".search");

formSearch.onsubmit = (event)=>{
    event.preventDefault();
    let searchValue = formSearch["name"].value;
    searchByName(searchValue)
}

filter.onclick = function (){
    let value = filter.value;
    filterBy(value)
}

addNew.onclick = () => {
    Modal.showModal();
    form.onsubmit = (event) => {
        event.preventDefault();
        let newUser = {
            avatar: form["avatar"].value,
            name: form["name"].value,
            status: form["status"].value
        }
        addUser(newUser)
    }
    close.onclick = () => {
        Modal.close();
    }
}

function openModal (e){
    Modal.showModal();
    form["avatar"].value = e.avatar;
    form["name"].value = e.name;
    form["status"].value = e.status;
    form.onsubmit = (event) => {
        event.preventDefault();
        let New = {
            avatar: form["avatar"].value,
            name: form["name"].value,
            status: form["status"].value
        }
        editUser(e,New)
    }
    close.onclick = () => {
        Modal.close();
    }
}

function getData (data) {
    box.innerHTML = "";
    data.forEach((e)=>{
        let div = document.createElement("div");
        div.classList.add("user");
        let avatar = document.createElement("img");
        avatar.classList.add("avatar");
        avatar.src = e.avatar;
        let text = document.createElement("div")
        let name = document.createElement("h3");
        name.innerHTML = e.name;
        let status = document.createElement("p");
        status.innerHTML = e.status? "Active" : "Inactive";
        let btn = document.createElement("div");
        btn.classList.add("btn");
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Delete";
        btnDelete.onclick = ()=>{
            deleteUser(e);
        }
        let btnEdit = document.createElement("button");
        btnEdit.innerHTML = "Edit";
        btnEdit.onclick = ()=>{
            openModal(e);
        }
        let Done = document.createElement("input")
        Done.type = "checkbox";
        Done.checked = e.status ;
        Done.onclick = ()=>{
            updateStatus(e)
        }
        let info = document.createElement("button");
        info.innerHTML = "Info";
        info.onclick = ()=>{
            showInfo(e);
        }

        btn.append(btnDelete, btnEdit,info,Done);
        text.append(name, status)
        div.append(avatar, text,btn);
        box.appendChild(div);
    })
    
}

export default getData;