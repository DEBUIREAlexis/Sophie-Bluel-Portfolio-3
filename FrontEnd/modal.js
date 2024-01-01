import { generateWorks, addListenerFilters } from "./gallery.js";

//Function Modal
export function showModal() {
  const linkModal = document.querySelector(".editLink");
  linkModal.addEventListener("click", (event) => {
    event.preventDefault();
    const arrayWorks = JSON.parse(window.localStorage.getItem("arrayWorks"));
    createModalEdit(arrayWorks);
  });
}

function createModalEdit(worksListJson) {
  modalBaseBody();
  const modalBody = document.querySelector(".modal");
  modalBody.innerHTML = modalEditHtml();
  preventClosing();
  const closeCross = document.querySelector(".fa-xmark");
  closeCross.addEventListener("click", () => {
    modalBody.remove();
  });
  const addProject = document.querySelector(".addNewWork");
  addProject.addEventListener("click", (event) => {
    event.preventDefault();
    modalBody.remove();
    createModalAdd(worksListJson);
  });
  galleryModal(worksListJson);
  deleteWork();
}

function createModalAdd(worksListJson) {
  modalBaseBody();
  const modalBody = document.querySelector(".modal");
  modalBody.innerHTML = modalAddHtml();
  preventClosing();
  const closeCross = document.querySelector(".fa-xmark");
  closeCross.addEventListener("click", () => {
    modalBody.remove();
  });
  const returnArrow = document.querySelector(".fa-arrow-left");
  returnArrow.addEventListener("click", () => {
    modalBody.remove();
    createModalEdit(worksListJson);
  });
  addANewWork();
}

function modalBaseBody() {
  const beforeGallery = document.querySelector(".gallery");
  const sectionFather = document.querySelector("#portfolio");
  const modalBody = document.createElement("aside");
  sectionFather.insertBefore(modalBody, beforeGallery);
  modalBody.classList.add("modal");
  modalBody.addEventListener("click", () => {
    modalBody.remove();
  });
}

function modalEditHtml() {
  const HTMLcode = `
  <div class="modalBody">
  <div class="iconesModal"><p></p><i class="fa-solid fa-xmark"></i></div>
    
  <div class="modal-wrapper">
      <h3 id="editModalTitle">Galerie photo</h3>
      <div class="galleryModif"></div>
      <div class="inputAddWrapper">
        <input
          type="submit"
          value="Ajouter une photo"
          class="addNewWork"
        />
      </div>
    </div>
  <div>`;
  return HTMLcode;
}

function modalAddHtml() {
  const HTMLcode = `
  <div class="modalBody">
    <div class="iconesModal">
      <i class="fa-solid fa-arrow-left"></i>
      <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="modal-wrapper">
  
      <h3 id="addModalTitle">Ajout Photo</h3>
    <form method="post" enctype="multipart/form-data" name="imageForm" class="formWrapper">
      <div class="addWorkWrapper">
        <div class="fileUploadWrapper">
          <i class="fa-regular fa-image"></i>
          
          <input type="file" name="imageUpload" id="imageUpload" accept="image/png"/>
          <label for="imageUpload" id="imageUploadLabel">+ Ajouter photo</label>
          <p>jpg, png : 4mo max</p>
        </div>
        <div class="titleAndCategory">
          <label for="titre">Titre</label>
          <input type="text" id="titre" name="titre" />
          <label for="category">Catégorie</label>
          <select id="category" name="category">
            <option disabled selected value></option>
            <option value="1">Objets</option>
            <option value="2">Appartements</option>
            <option value="3">Hotels & restaurants</option>
          </select>
        </div>
      </div>
      <div class="inputAddValidateWrapper">
        <input
          type="submit"
          value="Valider"
          class="addNewWork disabled"
          disabled=true
        />
      </div>
      </form>
    </div>
  </div>`;
  return HTMLcode;
}

function preventClosing() {
  const bodyBackgroundWhite = document.querySelector(".modalBody");
  bodyBackgroundWhite.addEventListener("click", (e) => {
    //e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  });
}

//Modal Galery
function galleryModal(worksListJson) {
  for (let i = 0; i < worksListJson.length; i++) {
    galleryIdividualWork(worksListJson[i]);
  }
}

function galleryIdividualWork(workSingle) {
  const galleryEdit = document.querySelector(".galleryModif");
  const workBody = document.createElement("figure");
  workBody.dataset.categoryId = workSingle.category.id;
  workBody.innerHTML = `<img src="${workSingle.imageUrl}" alt="${workSingle.title}"/><i class="fa-solid fa-trash-can" data-id="${workSingle.id}"></i>`;
  galleryEdit.appendChild(workBody);
}

function deleteWork() {
  const allTrashCans = document.querySelectorAll(".fa-trash-can");
  for (let i = 0; i < allTrashCans.length; i++) {
    allTrashCans[i].addEventListener("click", async (event) => {
      console.log(allTrashCans[i].dataset.id);
      const idDelete = allTrashCans[i].dataset.id;
      const deleteWorkById = await fetch(
        `http://localhost:5678/api/works/${allTrashCans[i].dataset.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            accept: "*/*",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      if (deleteWorkById.status === 204) {
        deleteFromModif(event, idDelete);
        deleteFromGalery(idDelete);
      }
      console.log(deleteWorkById);
    });
  }
}

//Delete from modif List
function deleteFromModif(event, idDelete) {
  const newArrayOfWork = JSON.parse(window.localStorage.getItem("arrayWorks"));
  console.log(newArrayOfWork);
  for (let i = newArrayOfWork.length - 1; i >= 0; i--) {
    if (newArrayOfWork[i].id == idDelete) {
      newArrayOfWork.splice([i], 1);
      const figureToDelete = event.target.parentElement;
      console.log(event.target.parentElement);
      figureToDelete.remove();
      console.log("Ok");
    }
  }
  window.localStorage.setItem("arrayWorks", JSON.stringify(newArrayOfWork));
}

//Delete form the main gallery
function deleteFromGalery(idDelete) {
  const listWorks = document.querySelectorAll(".gallery figure");
  for (let i = listWorks.length - 1; i > 0; i--) {
    console.log(listWorks[i].dataset.workId);
    if (listWorks[i].dataset.workId == idDelete) {
      listWorks[i].remove();
      console.log("hello");
    }
  }
}

//Function to add a new work
function addANewWork() {
  const imageShow = document.querySelector("#imageUpload");
  imageShow.addEventListener("change", () => {
    const fileWrapper = document.querySelector(".fileUploadWrapper");
    const imageURL = imageShow.files[0];
    console.log(imageURL);
    const iRemove = document.querySelector(".fa-image");
    iRemove.remove();
    const labelRemove = document.querySelector("#imageUploadLabel");
    labelRemove.remove();
    const pRemove = document.querySelector(".fileUploadWrapper p");
    pRemove.remove();
    const imageDisplay = document.createElement("img");
    imageDisplay.src = URL.createObjectURL(imageURL);
    fileWrapper.appendChild(imageDisplay);
    checkIfValueAdded();
  });
  const titleChange = document.querySelector("#titre");
  titleChange.addEventListener("change", () => {
    checkIfValueAdded();
  });
  const categoryChange = document.querySelector("#category");
  categoryChange.addEventListener("change", () => {
    checkIfValueAdded();
  });
}

function checkIfValueAdded() {
  const imgExist = document.querySelector(".fileUploadWrapper img");
  const titleExist = document.querySelector("#titre").value;
  const categoryExist = document.querySelector("#category").value;
  const submitButton = document.querySelector(".addNewWork");
  if (imgExist !== null && titleExist !== "" && categoryExist !== "") {
    submitButton.classList.remove("disabled");
    submitButton.disabled = false;
    submitNewWork();
  } else {
    submitButton.classList.add("disabled");
    submitButton.disabled = true;
  }
}

function submitNewWork() {
  const form = document.forms.namedItem("imageForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.querySelector("#titre");
    const category = document.querySelector("#category");
    const file = document.querySelector("#imageUpload");
    const formData = new FormData();
    formData.append("image", file.files[0]);
    formData.append("title", title.value);
    formData.append("category", category.value);
    const sendWork = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: formData,
    });
    console.log(sendWork);
    if (sendWork.status === 201) {
      addingNoReload();
    }
  });
}

//Adding new works without reload
// It has to make a call to the Api, it provide the id of the new work
async function addingNoReload() {
  const worksList = await fetch("http://localhost:5678/api/works");
  const worksListJson = await worksList.json();
  const token = window.localStorage.getItem("token");
  generateWorks(worksListJson);
  window.localStorage.setItem("arrayWorks", JSON.stringify(worksListJson));
}
