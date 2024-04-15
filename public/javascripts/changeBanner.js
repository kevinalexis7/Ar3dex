//Popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

//Add-Banner
const inputChangeImage = document.getElementById("bannerImage");
const inputName = document.getElementById("name");
const inputLink = document.getElementById("link");
const submitAddBanner = document.getElementById('submit-add-banner')
const imgBannerPreview = document.getElementById("img-banner-preview")
const modalBannerAdd = new bootstrap.Modal(document.getElementById('modal-banner-add'))



submitAddBanner.addEventListener("click", async (e) => {
  const data = new FormData();
  data.append("file", inputChangeImage.files[0]);
  data.append("URL", inputLink.value);
  data.append("name", inputName.value);
  
  console.log(data)
  const response = await fetch("/apis/banners", {
    
    method: "POST",
    body: data,
  });
  const result = await response.json()
  
  location.reload()
});


function previewImage (event, elementId) {
  const input = event.target;
  
  imgpreview = document.getElementById(elementId);
  
  if(!input.files.length) return
  
  file = input.files[0]
  
  objectURL = URL.createObjectURL(file);
  
  imgpreview.src = objectURL;
}

