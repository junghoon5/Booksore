var slider_swiper = new Swiper(".sliderSwiper", {
    loop: true,
    navigation: {
        nextEl: "#slider .swiper-button-next",
        prevEl: "#slider .swiper-button-prev",
    }, 
    pagination: {
        el: "#slider .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<img class="'+ className +'" src="">';
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// #new swiper
var new_swiper = new Swiper(".newSwiper", {
    slidesPerView: 5,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    pagination: {
        el: "#new .fraction",
        type: "fraction",
        clickable: true,
    },
    navigation: {
        nextEl: "#btn-next",
        prevEl: "#btn-prev",
    }, 
    
    
});