window.onload = async () => {
  const bannerConteiner = document.getElementById("banners-card-root");

  function previewImage(event, elementId) {
    const input = event.target;

    imgpreview = document.getElementById(elementId);

    if (!input.files.length) return;

    file = input.files[0];

    objectURL = URL.createObjectURL(file);

    imgpreview.src = objectURL;
  }

  try {
    const response = await fetch("http://localhost:3000/apis/banners");
    const result = await response.json();
    const { meta, data } = result;

    const ShowBannerCards = data.forEach((banner) => {
      const cols = document.createElement("div");
      cols.setAttribute("class", "col-12 col-sm-6 col-lg-3");
      bannerConteiner.appendChild(cols);

      const p4 = document.createElement("div");
      p4.setAttribute("class", "p-4 py-5 position-relative");
      cols.appendChild(p4);
      
      const modalDeleteTriger = document.createElement("div");
      modalDeleteTriger.setAttribute("data-bs-toggle", "modal");
      modalDeleteTriger.setAttribute("data-bs-target", `#modal-banner-delete`);
      modalDeleteTriger.setAttribute("deleteIdRecipient", `${banner.id}`);
      modalDeleteTriger.setAttribute("nameRecipient", `${banner.name}`);
      p4.appendChild(modalDeleteTriger);
      
      const modalEditTriger = document.createElement("div");
      modalEditTriger.setAttribute("data-bs-toggle", "modal");
      modalEditTriger.setAttribute("data-bs-target", `#modal-banner-edit`);
      modalEditTriger.setAttribute("idRecipient", `${banner.id}`);
      modalEditTriger.setAttribute("nameRecipient", `${banner.name}`);
      modalEditTriger.setAttribute("URLRecipient", `${banner.URL}`);
      modalEditTriger.setAttribute("imageRecipient", `${banner.file}`);
      p4.appendChild(modalEditTriger);
      

      const cardBannerCustom = document.createElement("div");
      cardBannerCustom.setAttribute("class", "card card-banner-custom p-2");
      modalEditTriger.appendChild(cardBannerCustom);

      const crossSpan = document.createElement("span");
      modalDeleteTriger.setAttribute(
        "class",
        "fa-solid fa-circle-xmark fs-3 delete-button"
      );
      modalDeleteTriger.setAttribute("style", "color:#bd2e2e");
      modalDeleteTriger.appendChild(crossSpan);

      const imgBannerBox = document.createElement("div");
      imgBannerBox.setAttribute("class", "img-banner-box");
      cardBannerCustom.appendChild(imgBannerBox);

      const cardImgTop = document.createElement("img");
      cardImgTop.setAttribute("src", `/images/banners/${banner.file}`);
      cardImgTop.setAttribute("class", `card-img-top`);
      cardImgTop.setAttribute("alt", `${banner.name}`);
      cardImgTop.setAttribute("id", `cardImgTop`);
      cardImgTop.setAttribute("onchange", `previewImage(event, cardImgTop)`);
      imgBannerBox.appendChild(cardImgTop);

      const cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body");
      cardBannerCustom.appendChild(cardBody);

      const h6Name = document.createElement("h6");
      h6Name.setAttribute("class", "card-title text-truncate");
      if (banner.name) {
        h6Name.innerHTML = banner.name;
      } else {
        h6Name.setAttribute("class", "card-title text-secondary-emphasis");
        h6Name.innerHTML =
          "Sin nombre  <i class='fa-solid fa-triangle-exclamation' style='color: #822121;'>";
      }
      cardBody.appendChild(h6Name);

      const h6URL = document.createElement("h6");
      h6URL.setAttribute("class", "card-title text-truncate");
      if (banner.URL) {
        h6URL.innerHTML = banner.URL;
      } else {
        h6URL.setAttribute(
          "class",
          "card-title text-truncate text-secondary-emphasis"
        );
        h6URL.innerHTML =
          "Sin URL  <i class='fa-solid fa-triangle-exclamation' style='color: #822121;'>";
      }
      cardBody.appendChild(h6URL);

      const submitEditBanner = document.getElementById("submit-edit-banner");
      const inputImageEdit = document.getElementById("edit-bannerImage");
      const inputURLEdit = document.getElementById("linkEdit");
      const inputNameEdit = document.getElementById("nameEdit");
      const modalImgPreview = document.getElementById("img-banner-edit-preview");

      const modalBannerEdit = document.getElementById("modal-banner-edit");
      if (modalBannerEdit) {
        modalBannerEdit.addEventListener("show.bs.modal", (event) => {
          const button = event.relatedTarget;

          const name = button.getAttribute("nameRecipient");
          const URL = button.getAttribute("URLRecipient");
          const image = button.getAttribute("imageRecipient");

          inputNameEdit && (inputNameEdit.value = name);
          inputURLEdit && (inputURLEdit.value = URL);
          modalImgPreview.src = "images/banners/" + image;

          submitEditBanner.addEventListener("mousedown", async () => {
            const id = button.getAttribute("idRecipient");

            const data = new FormData();
            if (inputImageEdit) {
              data.append("file", inputImageEdit.files[0]);
            }
            data.append("id", id);
            data.append("URL", inputURLEdit.value);
            data.append("name", inputNameEdit.value);

            const response = await fetch("/apis/banners", {
              method: "PUT",
              body: data,
            });
            const result = await response.json();

            console.log(result)
            if (result) {
              const modalBannerEdit = new bootstrap.Modal(
                document.getElementById("modal-banner-edit")
              );
              modalBannerEdit.hide();
              location.reload();
            }
          });
        });
      }
      
      
      const submitDeleteBanner = document.getElementById("submit-delete-banner");

      const itemBannerDeleted = document.getElementById("item-banner-deleted")
      
      const modalBannerDelete = document.getElementById("modal-banner-delete");
      if (modalBannerDelete) {
        modalBannerDelete.addEventListener("show.bs.modal", (event) => {
          const button = event.relatedTarget;
          
          const name = button.getAttribute("nameRecipient");
          
          itemBannerDeleted.innerHTML = '"' + name + '"'
      
          submitDeleteBanner.addEventListener("mousedown", async () => {
        const idDelete = button.getAttribute("deleteIdRecipient");
        
        const dataIdDelete = new FormData();
        dataIdDelete.append("id", idDelete);
        dataIdDelete.append("name", name);
        console.log(dataIdDelete)
        const response = await fetch("/apis/bannersDelete", {
          method: "DELETE",
          body: dataIdDelete,
        });
        const result = await response.json();
        console.log(dataIdDelete)
        console.log(result)
      });
  });
}
});
} catch (error) {
console.log(error);
}
};