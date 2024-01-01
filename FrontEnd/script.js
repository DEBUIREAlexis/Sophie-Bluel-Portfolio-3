//Base script for the main page of Sophie Bluel's Portfolio
import { showModal } from "./modal.js";
import { generateWorks, addListenerFilters } from "./gallery.js";

//Get Edit Token from local Storage
const token = window.localStorage.getItem("token");
console.log(token);
const editMenu = document.querySelector(".editon");
const loginLink = document.querySelector(".loginlink");
if (token === null) {
  editMenu.classList.add("hidden");
} else {
  editMenu.classList.remove("hidden");
  loginLink.innerText = "logout";
  showEditLink();
}

function showEditLink() {
  const fatherTag = document.querySelector("#portfolio");
  const beforeThis = document.querySelector(".gallery");
  const editLink = document.createElement("a");
  editLink.href = "#editModal";
  editLink.classList.add("editLink");
  editLink.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`;
  fatherTag.insertBefore(editLink, beforeThis);
}

function galleryIdividualWork(workSingle) {
  const gallery = document.querySelector(".galleryModif");
  const workBody = document.createElement("figure");
  workBody.dataset.categoryId = workSingle.category.id;
  workBody.innerHTML = `<img src="${workSingle.imageUrl}" alt="${workSingle.title}"/>
  <i class="fa-solid fa-trash-can"></i>`;
  gallery.appendChild(workBody);
}

// Main Script
// Get the works from the database
const worksList = await fetch("http://localhost:5678/api/works");
const worksListJson = await worksList.json();
window.localStorage.setItem("arrayWorks", JSON.stringify(worksListJson));
generateWorks(worksListJson);
if (token === null) {
  generateFilters(worksListJson);
} else {
  showModal(worksListJson);
}
addListenerFilters(worksListJson);

console.log(worksListJson);
