jQuery(document).ready(function($) {

  // main slider
  $(".bslider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    // fade: true,
    // autoplay: true,
    // autoplaySpeed: 5000,
    // speed: 1000,
    pauseOnFocus: false,
    pauseOnHover: false,
    mobileFirst: true,
    // variableHeight: true,
    asNavFor: ".mslider"
  });

  // nav for main slider
  $(".mslider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    vertical: true,
    focusOnSelect: true,
    verticalSwiping: true,
    asNavFor: ".bslider"
  });

  // news slider
  $(".news_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
  });

});
