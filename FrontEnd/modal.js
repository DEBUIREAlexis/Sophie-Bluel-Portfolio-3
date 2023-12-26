//Function Modal
export function showModal(worksListJson) {
  const beforeGallery = document.querySelector(".gallery");
  const sectionFather = document.querySelector("#portfolio");
  const linkModal = document.querySelector(".editLink");
  linkModal.addEventListener("click", (event) => {
    event.preventDefault();
    const modalBody = document.createElement("aside");
    sectionFather.insertBefore(modalBody, beforeGallery);
    modalBody.classList.add("modal");
    modalBody.innerHTML = modalEditHtml();
  });
}

function modalEditHtml() {
  const HTMLcode = `
    <div class="modal-wrapper">
      <div class="iconesModal"><i class="fa-solid fa-xmark"></i></div>

      <h3 id="editModalTitle">Galerie photo</h3>
      <div class="galleryModif"></div>
      <div class="inputAddWrapper">
        <input
          type="submit"
          value="Ajouter une photo"
          class="addNewWork"
        />
      </div>
    </div>`;
  return HTMLcode;
}

function modalAddHtml() {
  const HTMLcode = `<aside
    id="addModal"
    class="modal hidden add"
    aria-hidden="true"
    role="dialog"
    aria-modal="false"
    aria-labelledby="addModalTitle"
  >
    <div class="modal-wrapper">
      <div class="iconesModal">
        <i class="fa-solid fa-arrow-left"></i>
        <i class="fa-solid fa-xmark"></i>
      </div>

      <h3 id="addModalTitle">Ajout Photo</h3>
      <input type="file" />
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
  </aside>`;
  return HTMLcode;
}
/*
export function showModal(worksListJson) {
  const modalBody = document.querySelector(".edit");
  const modifOpener = document.querySelector(".editLink");
  const modalAdd = document.querySelector(".add");
  modifOpener.addEventListener("click", function (event) {
    event.preventDefault();
    modalBody.classList.remove("hidden");
  });
  const closeCross = document.querySelector("#editModal .fa-xmark");
  closeCross.addEventListener("click", () => {
    modalBody.classList.add("hidden");
  });
  galleryModal(worksListJson);
  const addNew = document.querySelector(".addNewWork");
  addNew.addEventListener("click", () => {
    modalBody.classList.add("hidden");
    modalAdd.classList.remove("hidden");
  });
  const closeCrossAdd = document.querySelector("#addModal .fa-xmark");
  closeCrossAdd.addEventListener("click", () => {
    modalAdd.classList.add("hidden");
  });
  const returnArrow = document.querySelector("#addModal .fa-arrow-left");
  returnArrow.addEventListener("click", () => {
    modalAdd.classList.add("hidden");
    modalBody.classList.remove("hidden");
  });
}

//Modal Galery
function galleryModal(worksListJson) {
  for (let i = 0; i < worksListJson.length; i++) {
    galleryIdividualWork(worksListJson[i]);
  }
}
<aside
          id="editModal"
          class="modal hidden edit"
          aria-hidden="true"
          role="dialog"
          aria-modal="false"
          aria-labelledby="editModalTitle"
        >
          <div class="modal-wrapper">
            <div class="iconesModal"><i class="fa-solid fa-xmark"></i></div>

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
        </aside>
        <aside
          id="addModal"
          class="modal hidden add"
          aria-hidden="true"
          role="dialog"
          aria-modal="false"
          aria-labelledby="addModalTitle"
        >
          <div class="modal-wrapper">
            <div class="iconesModal">
              <i class="fa-solid fa-arrow-left"></i>
              <i class="fa-solid fa-xmark"></i>
            </div>

            <h3 id="addModalTitle">Ajout Photo</h3>
            <input type="file" />
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
        </aside>*/
