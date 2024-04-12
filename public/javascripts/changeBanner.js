//Popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const inputChangeBanner = document.getElementById("bannerImage");
const inputName = document.getElementById("name");
const inputLink = document.getElementById("link");
const imgBanner = document.getElementById("bannerImage-file");
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))

inputChangeBanner.addEventListener("change", async (e) => {
  const data = new FormData();
  data.append("name", inputChangeBanner.value);
  data.append("file", inputChangeBanner.files[0]);
  data.append("URL", inputChangeBanner.value);

  const response = await fetch("/apis/banners", {

    method: "POST",
    body: data,
  });
  const result = await response.json()

  console.log(result)

  if(result) imgBanner.src = "/images/banners/" + result.file

  myModal.hide()

});
