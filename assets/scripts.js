// Global Variables
var isMobile = false;
var devicesWithPointer = false;

mediaMobile();
mediaTouchDevices();

// if (devicesWithPointer) {}
// if (isMobile) {}

if ($(window).scrollTop() > 0) {
    $('body').addClass('is-scrolling');
    $('.site-header').addClass('site-header--sticked');
} else {
    $('body').removeClass('is-scrolling');
    $('.site-header').removeClass('site-header--sticked');
}

$('.cart-sidebar__toggler').on('click', function (e) {
    e.preventDefault();
    $('.cart-sidebar').toggleClass('show');
    $('.cart-sidebar__overlay').fadeToggle();
});

$('.cart-sidebar__overlay').on('click', function (e) {
    e.preventDefault();
    $('.cart-sidebar').toggleClass('show');
    $(this).fadeToggle();
});

$(window).on(
    'scroll',
    function () {
        if ($(window).scrollTop() > 0) {
            $('body').addClass('is-scrolling');
            $('.site-header').addClass('site-header--sticked');
        } else {
            $('body').removeClass('is-scrolling');
            $('.site-header').removeClass('site-header--sticked');
        }
    }
);

// $(document).on(
//     'click',
//     function (event) {
//         var target = $(event.target);
//         var _mobileMenuOpen = $(".navbar-collapse").hasClass("show");
//         if (_mobileMenuOpen === true && !target.hasClass("navbar-toggler")) {
//             $('#siteNavigation').collapse('hide');
//         }
//     }
// );

// Site Navigation Overflow Stopped on Navbar Toggle
$('#siteNavigation').on('show.bs.collapse', function () {
    $('body').addClass('overflow-stopped');

}).on('hide.bs.collapse', function () {
    $('body').removeClass('overflow-stopped');
})

// Anchor Smooth Scroll
$('a[smooth-scroll]').on('click', function (event) {
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 140
    }, 500);
    event.preventDefault();
});

// data-flickity='{ "cellAlign": "left", "": true, "": false }'

var $megaMenuCarousel = $('.site-header .dropdown-menu .carousel-init');
$megaMenuCarousel.flickity({
    cellAlign: "left",
    wrapAround: true,
    pageDots: false,
    watchCSS: true
});


// Header Dropdown on hover
$('.site-header .site-navigation li.dropdown').on('mouseenter', function () {
    if (devicesWithPointer)
        $(this).find('.dropdown-toggle').dropdown('show');
}).on('mouseleave', function () {
    if (devicesWithPointer)
        $(this).find('.dropdown-toggle').dropdown('hide').attr('aria-expanded', false);
});

$('.dropdown-menu-toggler').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.dropdown').find('.dropdown-toggle').dropdown('hide').attr('aria-expanded', false)
});

$('.site-header .site-navigation .dropdown').on('shown.bs.dropdown', function () {
    $(this).find('.flickity-enabled').flickity('resize');
})

$('.site-header .site-navigation .dropdown .dropdown-menu').on('click', function (e) {
    e.stopPropagation();
});


// Featured Collection Carousel
var __showCaseCarousels = $('.featured-collections__showcase .product-blocks--carousel-sm');

$.each(__showCaseCarousels, function (indexInArray, valueOfElement) {
    var carouselMobileOnly = true;

    if ($(this).is('.carousel-init')) {
        carouselMobileOnly = false
    }

    $(this).flickity({
        cellAlign: "center",
        wrapAround: true,
        pageDots: false,
        prevNextButtons: false,
        initialIndex: 3,
        watchCSS: carouselMobileOnly
    });
});

$('.featured-collections__showcase a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var $target = $(e.target).attr('href');

    $($target).find('.flickity-enabled').flickity('resize');
});

// Product Quantity
$('.btn-number').on('click', function (e) {
    e.preventDefault();
    var qty_btn = $(this);
    updateInput(qty_btn);
});

function updateInput(qty_btn) {
    fieldName = qty_btn.attr('data-field');
    type = qty_btn.attr('data-type');
    var input = qty_btn.siblings("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {
            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                qty_btn.attr('disabled', true);
            }
        } else if (type == 'plus') {
            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                qty_btn.attr('disabled', true);
            }
        }
    } else {
        input.val(0);
    }
}
$('.input-number').on('focusin', function () {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').on('change', function () {
    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr(
            'disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
});
$(".input-number").on('keydown', function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode >
            105)) {
        e.preventDefault();
    }
});

// Text Marquee
// const textTopMarquee = new Flickity('.text-marquee .text-top', {
//   accessibility: true,
//   resize: true,
//   wrapAround: true,
//   prevNextButtons: false,
//   pageDots: false,
//   percentPosition: true,
//   setGallerySize: true,
//   draggable: false,
// });

// const textBottomMarquee = new Flickity('.text-marquee .text-bottom', {
//   accessibility: true,
//   resize: true,
//   wrapAround: true,
//   prevNextButtons: false,
//   pageDots: false,
//   percentPosition: true,
//   setGallerySize: true,
//   draggable: false,
// });

// textTopMarquee.x = 0;
// textBottomMarquee.x = 0;

// textTopMarqueePlay();
// textBottomMarqueePlay();

// function textTopMarqueePlay() {
//   textTopMarquee.x -= 2;

//   textTopMarquee.settle(textTopMarquee.x);

//   requestId = window.requestAnimationFrame(textTopMarqueePlay);
// }

// function textBottomMarqueePlay() {
//   textBottomMarquee.x -= 1.2;

//   textBottomMarquee.settle(textBottomMarquee.x);

//   requestId = window.requestAnimationFrame(textBottomMarqueePlay);
// }


const pressLogosMarquee = new Flickity('.press-bar .carousel-init', {
    accessibility: true,
    resize: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    percentPosition: true,
    setGallerySize: true,
    draggable: false,
});

pressLogosMarquee.x = 0;

pressLogosMarqueePlay();


function pressLogosMarqueePlay() {
    pressLogosMarquee.x -= 1.2;

    pressLogosMarquee.settle(pressLogosMarquee.x);

    requestId = window.requestAnimationFrame(pressLogosMarqueePlay);
}



var $testimonyCarousel = $('.testimony .testimony__carousel');
$testimonyCarousel.flickity({
    cellAlign: "left",
    wrapAround: true,
    adaptiveHeight: true,
    pageDots: false,
    watchCSS: true
});

var $testimonialsCarousel = $('.testimonials__carousel');
$testimonialsCarousel.flickity({
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    imagesLoaded: true,
    autoPlay: 3000,
    pauseAutoPlayOnHover: false,
    pageDots: false,
    prevNextButtons: false,
    adaptiveHeight: true
});


var $bundleProducts = $('.bundle-products .carousel-init');
$bundleProducts.flickity({
    contain: true,
    cellAlign: "left",
    wrapAround: false,
    pageDots: false,
    prevNextButtons: false,
});

var $instaFeed = $('.insta-feed .carousel-init');
$instaFeed.flickity({
    contain: true,
    cellAlign: "left",
    wrapAround: false,
    pageDots: false,
    prevNextButtons: false,
});

var $productDetailsCarouselMain = $('.product-details__showcase .carousel-main');
$productDetailsCarouselMain.flickity({
    cellAlign: "center",
    wrapAround: true,
});

var $productDetailsCarouselNav = $('.product-details__showcase .carousel-nav');
$productDetailsCarouselNav.flickity({
    cellAlign: "left",
    wrapAround: true,
    pageDots: false,
    prevNextButtons: false,
    asNavFor: '.product-details__showcase .carousel-main',
});

$productDetailsCarouselNav.on('change.flickity', function (event, index) {
    $productDetailsCarouselMain.flickity('select', index);
});

var $ingredientsCarousel = $('.card-body__ingredients .carouselInit');
$ingredientsCarousel.flickity({
    contain: true,
    cellAlign: "left",
    wrapAround: true,
    prevNextButtons: false,
});

var $joinCommunityCarousel = $('.join-our-community .carouselInit');
$joinCommunityCarousel.flickity({
    contain: true,
    cellAlign: "left",
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    imagesLoaded: true,
    autoPlay: 3000,
    pauseAutoPlayOnHover: false,
});

// select-picker
$('.select-wrapper').each(function () {
    var btnClass = $(this).data('button-style');
    $(this).find('.select-picker').selectpicker({
        style: '',
        styleBase: btnClass,
        width: false
    });
});

$('#salePopUp').on('shown.bs.modal', function () {
    $("#DateCountdown").TimeCircles({
        start: true,
        animation: "smooth",
        count_past_zero: true,
        circle_bg_color: "#fff",
        use_background: true,
        fg_width: 0.05,
        bg_width: 1,
        text_size: 0.07,
        total_duration: "Auto",
        direction: "Clockwise",
        use_top_frame: false,
        start_angle: 0,
        time: {
            Days: {
                show: false,
                text: "Days",
                color: "#E56A54"
            },
            Hours: {
                show: true,
                text: "Hours",
                color: "#E56A54"
            },
            Minutes: {
                show: true,
                text: "Minutes",
                color: "#E56A54"
            },
            Seconds: {
                show: true,
                text: "Seconds",
                color: "#E56A54"
            }
        }
    });
});

// setTimeout(() => {
//     $('#salePopUp').modal('show');
// }, 10000);


$('.accordions-wrapper .collapse').on('shown.bs.collapse', function (e) {
    $('.accordions-wrapper .flickity-enabled').flickity('resize');
})

$(window).on(
    'load',
    function () {
        $('.flickity-enabled:not(.text-top):not(.text-bottom):not(.press-bar__row)').flickity('resize');
    }
);

$(window).on('resize', function () {
    mediaMobile();
    mediaTouchDevices();
});

// Global Functions
// Media Query for mobile this will return true or false
function mediaMobile() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        isMobile = true;
    } else {
        isMobile = false;
    }
}

// Media Query for Touch Devices this will return true or false
function mediaTouchDevices() {
    if (window.matchMedia('(any-hover: none)').matches) {
        devicesWithPointer = false;
    } else {
        devicesWithPointer = true;
    }
}