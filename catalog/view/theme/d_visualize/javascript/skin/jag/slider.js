// const swiper = require('swiper');
// $('#featured').swiper({
//     mode: 'horizontal',
//     slidesPerView: 6,
//     pagination: '.featured',
//     paginationClickable: true,
//     spaceBetween: 0,
//     autoplayDisableOnInteraction: true,
//     loop: true,
//     mousewheel: true,
//     breakpoints: {
//         991: {
//             slidesPerView: 2
//         },
//         640: {
//             slidesPerView: 1
//         }
//     }
// });

$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('#featured', {
        mode: 'horizontal',
        slidesPerView: 3,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        autoplayDisableOnInteraction: true,
        loop: true,
        mousewheel: true,
        breakpoints: {
            991: {
                slidesPerView: 2
            },
            640: {
                slidesPerView: 1
            }
        }
    });
    console.log('123');
});