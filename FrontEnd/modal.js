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
}

function createModalAdd(worksListJson) {
  modalBaseBody();
  const modalBody = document.querySelector(".modal");
  modalBody.innerHTML = modalAddHtml();
  const closeCross = document.querySelector(".fa-xmark");
  closeCross.addEventListener("click", () => {
    modalBody.remove();
  });
  const returnArrow = document.querySelector(".fa-arrow-left");
  returnArrow.addEventListener("click", () => {
    modalBody.remove();
    createModalEdit(worksListJson);
  });
}

function modalBaseBody() {
  const beforeGallery = document.querySelector(".gallery");
  const sectionFather = document.querySelector("#portfolio");
  const modalBody = document.createElement("aside");
  sectionFather.insertBefore(modalBody, beforeGallery);
  modalBody.classList.add("modal");
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
      <div class="fileUploadWrapper">
        <i class="fa-regular fa-image"></i>
        <label for="imageUpload">+ Ajouter photo</label>
        <input type="file" name="imageUpload" id="imageUpload"/>
        <p>jpg, png : 4mo max</p>
      </div>
      <label for="titre">Titre</label>
      <input type="text" id="titre" name="titre" />
      <label for="categorie">Catégorie</label>
      <input type="text" id="categorie" name="categorie" />
      <div class="inputAddValidateWrapper">
        <input
          type="submit"
          value="Ajouter une photo"
          class="addNewWork"
        />
      </div>
    </div>
  </div>`;
  return HTMLcode;
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
  workBody.innerHTML = `<img src="${workSingle.imageUrl}" alt="${workSingle.title}"/><i class="fa-solid fa-trash-can"></i>`;
  galleryEdit.appendChild(workBody);
}
