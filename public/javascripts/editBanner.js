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

      const p3 = document.createElement("div");
      p3.setAttribute("class", "p-3");
      cols.appendChild(p3);

      const modalTriger = document.createElement("div");
      modalTriger.setAttribute("data-bs-toggle", "modal");
      modalTriger.setAttribute("data-bs-target", `#modal-banner-edit`);
      modalTriger.setAttribute("idRecipient", `${banner.id}`);
      modalTriger.setAttribute("nameRecipient", `${banner.name}`);
      modalTriger.setAttribute("URLRecipient", `${banner.URL}`);
      modalTriger.setAttribute("imageRecipient", `${banner.file}`);
      p3.appendChild(modalTriger);

      const cardBannerCustom = document.createElement("div");
      cardBannerCustom.setAttribute("class", "card card-banner-custom p-2");
      modalTriger.appendChild(cardBannerCustom);

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
      h6Name.setAttribute("class", "card-title text-secondary-emphasis");
      banner.name
        ? (h6Name.innerHTML = banner.name)
        : (h6Name.innerHTML =
            "Sin nombre  <i class='fa-solid fa-triangle-exclamation' style='color: #822121;'>");
      cardBody.appendChild(h6Name);

      const h6URL = document.createElement("h6");
      h6URL.setAttribute("class", "card-title text-secondary-emphasis");
      banner.URL
        ? (h6URL.innerHTML = banner.URL)
        : (h6URL.innerHTML =
            "Sin URL  <i class='fa-solid fa-triangle-exclamation' style='color: #822121;'>");
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

          submitEditBanner.addEventListener("mouseup", async () => {

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

            if(result) {
                ShowBannerCards
            }
        });
        });
      }
      
      
        
        
        
       
    });
    } catch (error) {
        console.log(error);
    }
};
