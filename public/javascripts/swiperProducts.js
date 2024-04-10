var swiper = new Swiper(".productsSwiper",{
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: -6,
      stretch: -30,
      depth: 80,
      modifier: 2,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    loop:true,
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },});