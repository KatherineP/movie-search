var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    speed: 1000,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        437: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        888: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
        },
      }
  })