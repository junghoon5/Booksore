var slider_swiper = new Swiper(".sliderSwiper", {
    navigation: {
        nextEl: "#slider .swiper-button-next",
        prevEl: "#slider .swiper-button-prev",
    }, 
    pagination: {
        el: "#slider .swiper-pagination",
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// #new swiper
var new_swiper = new Swiper(".newSwiper", {
    slidesPerView: 5,
    spaceBetween: 15,
    pagination: {
        el: "#new .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: "#new .swiper-button-next",
        prevEl: "#new .swiper-button-prev",
    }, 
    pagination: {
        el: "#new .swiper-pagination",
    },
    slidesPerGroup: 3
});