//Function Modal
export function showModal(worksListJson) {
  const linkModal = document.querySelector(".editLink");
  linkModal.addEventListener("click", (event) => {
    event.preventDefault();
    createModalEdit(worksListJson);
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
          class="addNewWork"
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
    allTrashCans[i].addEventListener("click", async () => {
      console.log(allTrashCans[i].dataset.id);
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
      console.log(deleteWorkById);
    });
  }
}

//Function to add a new work
function addANewWork() {
  const form = document.forms.namedItem("imageForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#titre");
    const category = document.querySelector("#category");
    const file = document.querySelector("#imageUpload");
    console.log(file.files[0]);
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
  });
}
