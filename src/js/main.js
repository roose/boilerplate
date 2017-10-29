jQuery(document).ready(function($) {

  // menu button
  // $(".header_hamburger").click(function(){
  //   $("body").toggleClass("mm_open");
  // })

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

  // $('.slider_nav').on('mouseenter', '.slick-slide', function (e) {
  // var $currTarget = $(e.currentTarget),
  //     index = $currTarget.data('slick-index'),
  //     slickObj = $('.slider_main').slick('getSlick');

  // slickObj.slickGoTo(index);

  // });

  // news slider
  $(".news_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
  });

  // interviews slider
  $(".interview_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
  });

  // video slider
  $(".video_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
  });

  // photo slider
  $(".photo_slider").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
    dots: true,
    vertical: true,
    verticalSwiping: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
  });

  // gossip slider
  $(".gossip_slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    dots: true,
    vertical: true,
    verticalSwiping: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
  });

  // trends slider
  $(".trends_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
  });

  // main socials tab
  $(".socials_tab").click(function(){
    $(".socials_tab").removeClass("current_tab");
    $(".socials_content").removeClass("current_content");
    $(this).addClass("current_tab");
    $(".socials_content").eq($(this).index()).addClass("current_content");
  })

  // cat tournament table tab
  $(".table_tab").click(function(){
    $(".table_tab").removeClass("current_tab");
    $(".table_content").removeClass("current_content");
    $(this).addClass("current_tab");
    $(".table_content").eq($(this).index()).addClass("current_content");
  })

  // login popup
  $(".auth_login button").click(function(){
    $(".auth_login").toggleClass('auth_open');
  })

  // related slider
  $(".related_slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
  });

  // gallery slider
  $(".gallery_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    dots: false,
    // fade: true,
    // autoplay: true,
    // autoplaySpeed: 5000,
    // speed: 1000,
    pauseOnFocus: false,
    pauseOnHover: false,
    mobileFirst: true,
    variableHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_lea"><use xlink:href="img/icons.svg#icon_lea"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_rea"><use xlink:href="img/icons.svg#icon_rea"></use></svg></button>',
    asNavFor: ".gallery_nav"
  });

  // nav for gallery slider
  $(".gallery_nav").slick({
    slidesToShow: 7,
    infinite: false,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    asNavFor: ".gallery_slider"
  });

  // photo slider
  // $("#photo_slider").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: false,
  //   dots: false,
  //   mobileFirst: true,
  //   prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_prevround"><use xlink:href="img/icons.svg#icon_prevround"></use></svg></button>',
  //   nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_nextround"><use xlink:href="img/icons.svg#icon_nextround"></use></svg></button>'
  // });
  // photo slider nav
  // $("#photo_nav").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: false,
  //   dots: false,
  //   mobileFirst: true,
  //   prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_prevround"><use xlink:href="img/icons.svg#icon_prevround"></use></svg></button>',
  //   nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_next"><use xlink:href="img/icons.svg#icon_next"></use></svg></button>'
  // });
  // photo slider nav next button
  // $('#photo_nav').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  //   $('#photo_slider').slick('slickNext');
  // });

  // top slider
  // $(".main_top .items").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: false,
  //   dots: false,
  //   arrows: false,
  //   mobileFirst: true,
  //   centerMode: true,
  //   responsive: [
  //     {
  //       breakpoint: 700,
  //       settings: "unslick"
  //     }
  //   ]
  // });

  // poster slider
  // $(".main_poster .poster_items").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: false,
  //   dots: false,
  //   mobileFirst: true,
  //   prevArrow: '<button type="button" class="slick-prev"><svg class="icon_svg icon_prevround"><use xlink:href="img/icons.svg#icon_prevround"></use></svg></button>',
  //   nextArrow: '<button type="button" class="slick-next"><svg class="icon_svg icon_nextround"><use xlink:href="img/icons.svg#icon_nextround"></use></svg></button>'
  // });

  // $(".main_menu > li > a").on('touchstart', function(e){
  //   var idx = $(this).parent().index();
  //   if ($('body').hasClass('mm_open') && !$(this).parent().hasClass('is_selected')) {
  //     $('.main_menu > li').removeClass('is_selected');
  //     $(this).parent().addClass('is_selected');
  //     e.preventDefault();
  //   }
  // })
  // var menu_idx = 0;
  // $(".main_menu > li").hover(function(){
  //   menu_idx = $('.main_menu > li.is_selected').index();
  //   if (!$(this).hasClass('is_selected')) {
  //     $('.main_menu > li').removeClass('is_selected');
  //     $(this).addClass('is_selected');
  //   }
  // }, function(){
  //   $(this).removeClass('is_selected');
  //   if (menu_idx >= 0) {
  //     $('.main_menu > li').eq(menu_idx).addClass('is_selected');
  //   }
  // })

  // login links
  // $('.top_user_in').click(function(){
  //   $('#popup_sign').addClass('is_visible');
  // })
  // popup close
  // $('.popup .close_button').click(function(){
  //   $('.popup').removeClass('is_visible');
  // })

  // related slider
  // $(".page_related .items").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: false,
  //   dots: false,
  //   arrows: false,
  //   mobileFirst: true,
  //   centerMode: true,
  //   responsive: [
  //     {
  //       breakpoint: 700,
  //       settings: "unslick"
  //     }
  //   ]
  // });

  // $("[data-fancybox]").fancybox({
  //   caption : function( instance, item ) {
  //     var caption = $(this).data('caption') || '';
  //     return '<a class="default_button" href="' + item.src + '">Скачать фото</a>' + '(<span data-fancybox-index></span>&nbsp;из&nbsp;<span data-fancybox-count></span>)' + ( caption.length ? ' ' + caption : '' );
  //   }
  // });

  // profile menu
  // $(".user_profile_top").click(function(){
  //   $(this).parent().toggleClass('menu_opened')
  // })

  // comment form textarea height on enter
  // $('#comment_form textarea').focusin(function(){
  //   $(this).addClass('is_focused');
  // })
  // $('#comment_form textarea').focusout(function(){
  //   $(this).removeClass('is_focused');
  // })

});
