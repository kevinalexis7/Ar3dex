//Popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const inputChangeImage = document.getElementById("bannerImage");
const inputName = document.getElementById("name");
const inputLink = document.getElementById("link");
const submitAddBanner = document.getElementById('submit-add-banner')
const imgBanner = document.getElementById("bannerImage-file");
const imgBannerPreview = document.getElementById("img-banner-preview")
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))

submitAddBanner.addEventListener("click", async (e) => {
  const data = new FormData();
  data.append("file", inputChangeImage.files[0]);
  data.append("URL", inputLink.value);
  data.append("name", inputName.value);


  const response = await fetch("/apis/banners", {

    method: "POST",
    body: data,
  });
  const result = await response.json()

  myModal.hide()
});

function previewImage (event, elementId) {
  const input = event.target;

  imgpreview = document.getElementById('img-banner-preview');

  if(!input.files.length) return

  file = input.files[0]

  objectURL = URL.createObjectURL(file);

  imgpreview.src = objectURL;
}

