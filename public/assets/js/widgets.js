// Widget behaviour from the Horseno theme (horseno-core/assets/js/horseno-frontend.js), run on
// page load instead of through Elementor's frontend hooks. Requires jQuery and slick.
;(function ($) {
  'use strict';
  $(function () {
    var $scope = $(document);

    // Stats band: count up when scrolled into view
    (function () {
        // Function to animate the counters
        var a = 0;
        $(window).scroll(function () {
            var mediaCounter = $(".media-counter");
            if (mediaCounter.length > 0) {
                var oTop = mediaCounter.offset().top - window.innerHeight;
    
                if (a == 0 && $(window).scrollTop() > oTop) {
                    $(".counter-number").each(function () {
                        var $this = $(this),
                            countTo = $this.attr("data-count");
                        $({ countNum: $this.text() }).animate(
                            {
                                countNum: countTo,
                            },
                            {
                                duration: 4000,
                                easing: "swing",
                                step: function () {
                                    $this.text(Math.floor(this.countNum));
                                },
                                complete: function () {
                                    $this.text(this.countNum);
                                    //alert('finished');
                                },
                            }
                        );
                    });
                    a = 1;
                }
            }
        });
    
        let $counterSlider = $scope.find('.counter-carousel');
        $counterSlider.not('.slick-initialized').slick({
            loop: false,
            dots: $counterSlider.data('slick-dot'),
            infinite: false,
            arrows: $counterSlider.data('slick-arrow'),
            autoplay: $counterSlider.data('slick-autoplay'),
            autoplaySpeed: 7000,
            centerMode: $counterSlider.data('center-mode'),
            slidesToShow: $counterSlider.data('slide-to-show'),
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                }
            },
            {
                breakpoint: 470,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                }
            }
            ]
        });
    
    
    })();

    // Service cards carousel
    (function () {
        let $serviceslider = $scope.find('.service-carousel');
        $serviceslider.not('.slick-initialized').slick({
            loop: true,
            dots: $serviceslider.data('slick-dots'),
            infinite: true,
            arrows: $serviceslider.data('slick-arrow'),
            prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
            autoplay: $serviceslider.data('slick-autoplay'),
            fade: false,
            slidesToShow: $serviceslider.data('slide-to-show'),
            autoplaySpeed: 6000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: $serviceslider.data('slide-to-show'),
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 470,
                settings: {
                    slidesToShow: 1,
                }
            }
            ]
        });
    
        // Function For Custom Arrow Btn
        $("[data-slick-next]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-next")).slick("slickNext");
            });
        });
    
        $("[data-slick-prev]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-prev")).slick("slickPrev");
            });
        });
    
        let $serviceslider2 = $scope.find('.service-carousel22');
        $serviceslider2.not('.slick-initialized').slick({
            loop: true,
            dots: $serviceslider2.data('slick-dots'),
            infinite: true,
            arrows: $serviceslider2.data('slick-arrow'),
            autoplay: $serviceslider2.data('slick-autoplay'),
            fade: false,
            vertical: true,
            verticalSwiping: true,
            slidesToShow: $serviceslider2.data('slide-to-show'),
            autoplaySpeed: 6000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        vertical: false,
                        verticalSwiping: false,
                    }
                }
            ]
        });
    
        
    
    
    })();

    // Team carousel
    (function () {
        let $teamslider = $scope.find('.team-carousel');
        $teamslider.not('.slick-initialized').slick({
            loop: true,
            dots: false,
            infinite: true,
            arrows: $teamslider.data('slick-arrow'),
            prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
            autoplay: $teamslider.data('slick-autoplay'),
            fade: false,
            slidesToShow: $teamslider.data('slide-to-show'),
            autoplaySpeed: 6000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
            ]
        });
    
        $(document).on('click', function () {
            $('.social-style1').removeClass('active');
        });
    
        $('.social-style1').on('click', function (e) {
            e.stopPropagation();
    
            const $this = $(this);
            const isActive = $this.hasClass('active');
    
            $('.social-style1').removeClass('active');
    
            if (!isActive) {
                $this.addClass('active');
            }
        });
    
    
    })();

    // About page hero sliders
    (function () {
        // Function For Custom Arrow Btn
        $("[data-slick-next]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-next")).slick("slickNext");
            });
        });
    
        $("[data-slick-prev]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-prev")).slick("slickPrev");
            });
        });
    
        let $heroslide = $scope.find('.vsslider1');
        $heroslide.not('.slick-initialized').slick({
            loop: true,
            dots: $heroslide.data('slick-dot'),
            infinite: true,
            arrows: false,
            autoplay: $heroslide.data('slick-autoplay'),
            autoplaySpeed: 6000,
            fade: true,
            asNavFor: '.vsslider2',
            slidesToShow: 1,
        });
    
        let $heroslide2 = $scope.find('.vsslider2');
        $heroslide2.not('.slick-initialized').slick({
            loop: false,
            dots: false,
            infinite: true,
            arrows: false,
            autoplay: true,
            fade: true,
            slidesToShow: 1,
            autoplaySpeed: 6000,
            asNavFor: '.vsslider1',
        });
    
    })();

    // Homepage Resources carousel
    (function () {
        let $blogcarousel = $scope.find('.blog-carousel');
        $blogcarousel.not('.slick-initialized').slick({
            dots: false,
            infinite: true,
            arrows: false,
            autoplay: $blogcarousel.data('slick-autoplay'),
            autoplaySpeed: 6000,
            fade: false,
            speed: 1000,
            slidesToShow: $blogcarousel.data('slide-to-show'),
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 470,
                settings: {
                    slidesToShow: 1,
                }
            }
            ]
        });
    
    
    })();
  });
})(jQuery);
