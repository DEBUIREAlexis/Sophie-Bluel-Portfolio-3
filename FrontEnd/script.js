//Base script for the main page of Sophie Bluel's Portfolio

//Function that generate the HTML code for the works
async function generateWorks() {
  // Get the works from the database
  const worksList = await fetch("http://localhost:5678/api/works");
  const worksListJson = await worksList.json();
  console.log(worksListJson);
  //
  for (let i = 0; i < worksListJson.length; i++) {
    singleWork(worksListJson[i]);
    console.log(worksListJson[i]);
  }
}

async function singleWork(workSingle) {
  const gallery = document.querySelector(".gallery");
  const workBody = document.createElement("figure");

  workBody.innerHTML = `<img src="${workSingle.imageUrl}" alt="${workSingle.title}"/>
  <figcaption>${workSingle.title}</figcaption>`;
  gallery.appendChild(workBody);
}
generateWorks();
