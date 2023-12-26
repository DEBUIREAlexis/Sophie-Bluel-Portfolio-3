//Base script for the main page of Sophie Bluel's Portfolio
//import {  } from "./.js";

//Get Edit Token from local Storage
const token = window.localStorage.getItem("token");
console.log(token);
const editMenu = document.querySelector(".editon");
const loginLink = document.querySelector(".loginlink");
if (token === null) {
  editMenu.classList.add("hidden");
} else {
  editMenu.classList.remove("hidden");
  loginLink.innerText = "Logout";
}
//Function that generate the HTML code for the works
async function generateWorks(worksListJson) {
  // Loop to create HTML code for all works
  for (let i = 0; i < worksListJson.length; i++) {
    singleWork(worksListJson[i]);
  }
}

// Recover all categories to use them as filter
function generateFilters(worksListJson) {
  //Memorise the categories of all works, manually adding filter :"Tous"
  const categorysOfWorks = new Set();
  categorysOfWorks.add("Tous");
  const listOfCategoryObject = [{ id: 0, name: "Tous" }];
  // This Set recover every category then we add the category in an Array of object
  for (let i = 0; i < worksListJson.length; i++) {
    if (!categorysOfWorks.has(worksListJson[i].category.name)) {
      categorysOfWorks.add(worksListJson[i].category.name);
      listOfCategoryObject.push(worksListJson[i].category);
    }
  }

  createFilters(listOfCategoryObject);
}

//Function that create Tags for 1 single work
async function singleWork(workSingle) {
  const gallery = document.querySelector(".gallery");
  const workBody = document.createElement("figure");
  workBody.dataset.categoryId = workSingle.category.id;
  workBody.innerHTML = `<img src="${workSingle.imageUrl}" alt="${workSingle.title}"/>
  <figcaption>${workSingle.title}</figcaption>`;
  gallery.appendChild(workBody);
}

// Function to create Tag for the Filters
function createFilters(categorysOfWorks) {
  const filtersDiv = document.createElement("div");
  filtersDiv.classList = "filters";
  const portfolioBody = document.querySelector("#portfolio");
  const galleryWorks = document.querySelector(".gallery");

  for (let categorySingle of categorysOfWorks) {
    const filterSingle = document.createElement("button");
    filterSingle.classList = "filterSingle";
    filterSingle.innerText = categorySingle.name;
    filterSingle.dataset.id = categorySingle.id;
    filtersDiv.appendChild(filterSingle);
  }

  portfolioBody.insertBefore(filtersDiv, galleryWorks);
  // Adding class selected to the defautlt filter
  const listFilters = document.querySelectorAll(".filterSingle");
  listFilters[0].classList.add("selected");
}
//Create Listener for the filters, then display accodringly
function addListenerFilters(worksListJson) {
  const filters = document.querySelectorAll(".filterSingle");
  for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener("click", async function (event) {
      const idCategory = event.target.dataset.id;
      const allFilter = document.querySelectorAll(".filterSingle");
      for (let i = 0; i < allFilter.length; i++) {
        allFilter[i].classList.remove("selected");
      }
      event.target.classList.add("selected");
      /*const awnser = await fetch("http://localhost:5678/api/works");
      const workByCategory = await awnser.json();*/
      const workByCategory = Array.from(worksListJson);
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      if (parseInt(idCategory) !== 0) {
        for (let i = workByCategory.length - 1; i >= 0; i--) {
          if (workByCategory[i].category.id !== parseInt(idCategory)) {
            workByCategory.splice(i, 1);
          }
        }
      }

      generateWorks(workByCategory);
    });
  }
}

//Function Modal
function showModal() {
  const modalBody = document.querySelector(".modal");
  const modifOpener = document.querySelector(".editLink");
  modifOpener.addEventListener("click", function (event) {
    event.preventDefault();
    modalBody.classList.remove("hidden");
  });
}

// Main Script
// Get the works from the database
const worksList = await fetch("http://localhost:5678/api/works");
const worksListJson = await worksList.json();
generateWorks(worksListJson);
if (token === null) {
  generateFilters(worksListJson);
}
addListenerFilters(worksListJson);
showModal();
