//Base script for the main page of Sophie Bluel's Portfolio

//Function that generate the HTML code for the works
async function generateWorks() {
  // Get the works from the database
  const worksList = await fetch("http://localhost:5678/api/works");
  const worksListJson = await worksList.json();
  //Memorise the categories of all works, manually adding filter :"Tous"
  const categorysOfWorks = new Set();
  categorysOfWorks.add("Tous");

  // Loop to create HTML code for all works
  for (let i = 0; i < worksListJson.length; i++) {
    singleWork(worksListJson[i]);
    // This Set recover every category
    categorysOfWorks.add(worksListJson[i].category.name);
  }
  createFilters(categorysOfWorks);
}

//Function that create Tags for 1 single work
async function singleWork(workSingle) {
  const gallery = document.querySelector(".gallery");
  const workBody = document.createElement("figure");

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
  console.log(categorysOfWorks);
  for (let categorySingle of categorysOfWorks) {
    const filterSingle = document.createElement("h3");
    filterSingle.innerText = categorySingle;
    filtersDiv.appendChild(filterSingle);
    console.log(categorySingle);
  }
  //portfolioBody.appendChild(filtersDiv);
  portfolioBody.insertBefore(filtersDiv, galleryWorks);
}

// Main Script
generateWorks();
