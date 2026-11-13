; (function ($) {
    'use strict';

    /*=================================
     JS Index Here
    ==================================*/
    /*
      00. Popup Sidemenu
      01. Service Slider
      02. FAQ 
    */
    /*=================================
        JS Index End
    ==================================*/

    $(window).on('elementor/frontend/init', function () {


        /*----------  Global Js ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope, $) {

            $.fn.vsTab = function (options) {
                var opt = $.extend(
                    {
                        sliderTab: false,
                        tabButton: "button",
                        indicator: false,
                    },
                    options
                );

                $(this).each(function () {
                    var $menu = $(this);
                    var $button = $menu.find(opt.tabButton);
                    var slider;

                    // On Click Button Class Remove and indicator position set
                    $button.on("click", function (e) {
                        e.preventDefault();
                        var cBtn = $(this);
                        cBtn.addClass("active").siblings().removeClass("active");
                        if (opt.sliderTab && slider) {
                            $(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
                        }
                    });

                    // Work With slider
                    if (opt.sliderTab) {
                        slider = $menu.data("asnavfor"); // select slider

                        // Select All button and set attribute
                        var i = 0;
                        $button.each(function () {
                            var slideBtn = $(this);
                            slideBtn.attr("data-slide-go-to", i);
                            i++;

                            // Active Slide On load > Actived Button
                            if (slideBtn.hasClass("active")) {
                                $(slider).slick("slickGoTo", slideBtn.data("slide-go-to"));
                            }
                        });

                        // Change Indicator On slide Change
                        $(slider).on(
                            "beforeChange",
                            function (event, slick, currentSlide, nextSlide) {
                                $menu
                                    .find(opt.tabButton + '[data-slide-go-to="' + nextSlide + '"]')
                                    .addClass("active")
                                    .siblings()
                                    .removeClass("active");
                            }
                        );
                    }
                });
            };

            /*---------- Set Background Image ----------*/
            $("[data-bg-src]").each(function () {
                var src = $(this).attr("data-bg-src");
                $(this).css("background-image", "url(" + src + ")");
                $(this).removeAttr("data-bg-src").addClass("background-image");
            });

            const items = document.querySelectorAll(".item");
            if (items.length) {
                items.forEach((item) => {
                    item.addEventListener("mouseover", function () {
                        // Remove 'hovered' class from all items
                        items.forEach((otheritem) => {
                            otheritem.classList.remove("hovered");
                        });

                        // Add 'hovered' class to the current item
                        item.classList.add("hovered");
                    });
                });
            }
            if ($scope.find('.reveal1')) {
                function reveal1() {
                    var reveals = document.querySelectorAll(".reveal1");

                    for (var i = 0; i < reveals.length; i++) {
                        var windowHeight = window.innerHeight;
                        var elementTop = reveals[i].getBoundingClientRect().top;
                        var elementVisible = 150;
                        if (elementTop < windowHeight - elementVisible) {
                            reveals[i].classList.add("active");
                        } else {
                            reveals[i].classList.remove("active");
                        }
                    }
                }
                window.addEventListener("scroll", reveal1);
            }
            /*----------- 11. Select Box Active ----------*/
            if ($("select").length > 0) {
                $("select").niceSelect();
            }
        });



        elementorFrontend.hooks.addAction('frontend/element_ready/sidemenu-wrapper.default', function ($scope) {
            function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
                // Sidebar Popup
                $($sideMunuOpen).on("click", function (e) {
                    e.preventDefault();
                    $($sideMenu).addClass($toggleCls);
                });
                $($sideMenu).on("click", function (e) {
                    e.stopPropagation();
                    $($sideMenu).removeClass($toggleCls);
                });
                var sideMenuChild = $sideMenu + " > div";
                $(sideMenuChild).on("click", function (e) {
                    e.stopPropagation();
                    $($sideMenu).addClass($toggleCls);
                });
                $($sideMenuCls).on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $($sideMenu).removeClass($toggleCls);
                });
            }
            popupSideMenu(
                ".sidemenu-wrapper",
                ".sideMenuToggler",
                ".sideMenuCls",
                "show"
            );
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/horsenocounterbox.default', function ($scope) {
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

        });

        // gallery
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenogallery.default', function ($scope) {
            // Function to animate the counters

            let $horsenogallery = $scope.find('.gallery-slide1');
            $horsenogallery.not('.slick-initialized').slick({
                loop: true,
                dots: $horsenogallery.data('slick-dot'),
                infinite: true,
                arrows: false,
                autoplay: $horsenogallery.data('slick-autoplay'),
                autoplaySpeed: 7000,
                centerMode: $horsenogallery.data('center-mode'),
                slidesToShow: $horsenogallery.data('slide-to-show'),
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        dots: false,
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 2,
                        dots: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
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

        });

        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoprojectfilter.default', function ($scope) {
            /*----------- 13. Filter ----------*/
            $(".filter-active, .filter-active2").imagesLoaded(function () {
                var $filter = ".filter-active",
                    $filter2 = ".filter-active2",
                    $filterItem = ".filter-item",
                    $filterMenu = ".filter-menu-active";

                if ($($filter).length > 0) {
                    var $grid = $($filter).isotope({
                        itemSelector: $filterItem,
                        filter: "*",
                        masonry: {
                            columnWidth: 1,
                            gutter: 30,
                        },
                    });
                }

                if ($($filter2).length > 0) {
                    var $grid = $($filter2).isotope({
                        itemSelector: $filterItem,
                        filter: "*",
                        masonry: {
                            // use outer width of grid-sizer for columnWidth
                            columnWidth: $filterItem,
                        },
                    });
                }

                // Menu Active Class
                $($filterMenu).on("click", "button", function (event) {
                    event.preventDefault();
                    var filterValue = $(this).attr("data-filter");
                    $grid.isotope({
                        filter: filterValue,
                    });
                    $(this).addClass("active");
                    $(this).siblings(".active").removeClass("active");
                });
            });
        });
        /*---------- MagnificPopup video view  ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenovideobox.default', function ($scope) {
            $(".popup-video").magnificPopup({
                type: "iframe",
            });
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/horsenohorsenotab.default', function ($scope) {
            $(".comparison-active").twentytwenty({
                //  How much of the before image is visible when the page loads
                default_offset_pct: 0.5,

                // or vertical
                orientation: "horizontal",

                // label text
                before_label: "Before",
                after_label: "After",

                // enable/disable overlay
                no_overlay: true,

                // move with handle
                move_with_handle_only: true,

                // click to move
                click_to_move: false,
            });
        });



        /*---------- Hero One  ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenohero.default', function ($scope) {
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
        });

        /*---------- Project   ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoprojects.default', function ($scope) {
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

            let $project_carousel = $scope.find('.project-carousel');
            $project_carousel.not('.slick-initialized').slick({
                loop: true,
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: $project_carousel.data('slick-autoplay'),
                fade: false,
                slidesToShow: 2,
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

            let $project_carousel2 = $scope.find('.project-slider');
            $project_carousel2.not('.slick-initialized').slick({
                loop: true,
                dots: $project_carousel2.data('slick-dots'),
                infinite: true,
                arrows: $project_carousel2.data('slick-arrow'),
                autoplay: $project_carousel2.data('slick-autoplay'),
                fade: false,
                slidesToShow: 5,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
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
        });

        /*---------- Location Tooltip   ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenolocation.default', function ($scope) {
            // Enable Bootstrap tooltips
            var tooltipTriggerList = [].slice.call(
                document.querySelectorAll('[data-bs-toggle="tooltip"]')
            );
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });


        /*---------- Service   ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoservicebox.default', function ($scope) {
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

            

        });

        /*---------- Service   ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoteammember.default', function ($scope) {
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

        });


        /*---------- Service   ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenobrandlogoliders.default', function ($scope) {
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

            let $brnadslider = $scope.find('.brand-carousel');
            $brnadslider.not('.slick-initialized').slick({
                loop: true,
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: $brnadslider.data('slick-autoplay'),
                fade: false,
                slidesToShow: $brnadslider.data('slide-to-show'),
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: $brnadslider.data('slide-to-show'),
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
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
        });


        /*----------- Blog Slider ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoblogpost.default', function ($scope) {

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

        });
        /*----------- Blog Slider ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoblogslider.default', function ($scope) {

            let $blogcarousel = $scope.find('.blog-carousel');
            $blogcarousel.not('.slick-initialized').slick({
                dots: $blogcarousel.data('slide-dots'),
                infinite: true,
                arrows: $blogcarousel.data('slick-arrows'),
                nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-caret-right"></i></button>',
                prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-caret-left"></i></button>',
                autoplay: $blogcarousel.data('slick-autoplay'),
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: $blogcarousel.data('slide-to-show'),
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
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
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                ]
            });
            let $blogcarousel2 = $scope.find('.blog-carousel2');
            $blogcarousel2.not('.slick-initialized').slick({
                dots: $blogcarousel2.data('slick-dots'),
                infinite: true,
                arrows: $blogcarousel2.data('slick-arrows'),
                nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-caret-right"></i></button>',
                prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-caret-left"></i></button>',
                autoplay: $blogcarousel2.data('slick-autoplay'),
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: $blogcarousel2.data('slide-to-show'),
                slidesToScroll: 1,
            });

        });
        /*----------- Blog Slider ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoblogpostvideo.default', function ($scope) {
            let $blogcarouselvideo = $scope.find('.blog-carousel-video');
            $blogcarouselvideo.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: true,
                nextArrow: '<button type="button" class="slick-nexts"><i class="fa-solid fa-arrow-right"></i></button>',
                prevArrow: '<button type="button" class="slick-prevs"><i class="fa-solid fa-arrow-left"></i></button>',
                appendArrows: '.slick-arrow-wrapper',
                autoplay: true,
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 991,
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
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                ]
            });
        });
        /*----------- Blog Slider ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoblogcategory.default', function ($scope) {

            let $catcarousel1 = $scope.find('.cat-carousel1');
            $catcarousel1.not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                arrows: $catcarousel1.data('slick-arrows'),
                nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-caret-right"></i></button>',
                prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-caret-left"></i></button>',
                autoplay: $catcarousel1.data('slick-autoplay'),
                autoplaySpeed: 6000,
                fade: false,
                speed: 1000,
                slidesToShow: $catcarousel1.data('slide-to-show'),
                slidesToScroll: 1,
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
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                ]
            });

        });



        /*---------- Testimonial   ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenotestimonialsliders.default', function ($scope) {

            if ($(".vs-slider-tab").length) {
                $(".vs-slider-tab").vsTab({
                    sliderTab: true,
                    tabButton: ".tab-btn",
                });
            }


            let $testimonial = $scope.find('.testi-carousel');
            $testimonial.not('.slick-initialized').slick({
                loop: true,
                dots: false,
                infinite: true,
                arrows: $testimonial.data('slick-arrow'),
                prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
                autoplay: $testimonial.data('slick-autoplay'),
                fade: false,
                slidesToShow: $testimonial.data('slide-to-show'),
                autoplaySpeed: 6000,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: $testimonial.data('slide-to-show'),
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


            let $testimonialtwo = $scope.find('.client-active-small');
            $testimonialtwo.not('.slick-initialized').slick({
                dots: $testimonialtwo.data('slick-dots'),
                infinite: true,
                arrows: false,
                autoplay: $testimonialtwo.data('slick-autoplay'),
                slidesToShow: $testimonialtwo.data('slide-to-show'),
                autoplaySpeed: 6000,
                focusOnSelect: true,
                asNavFor: '.client-active-big',
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
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1,
                        dots: false,
                    }
                }
                ]
            });
            let $testimonialtwo_2 = $scope.find('.client-active-big');
            $testimonialtwo_2.not('.slick-initialized').slick({
                loop: false,
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: true,
                fade: true,
                slidesToShow: 1,
                autoplaySpeed: 6000,
                asNavFor: '.client-active-small',
            });

            let $testimonialthree = $scope.find('.testimonila-sliders-three');
            $testimonialthree.not('.slick-initialized').slick({
                dots: $testimonialthree.data('slick-dots'),
                infinite: true,
                arrows: false,
                autoplay: $testimonialthree.data('slick-autoplay'),
                slidesToShow: $testimonialthree.data('slide-to-show'),
                autoplaySpeed: 6000,
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
                        slidesToShow: 2,
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
        });
        /*---------- Service Details   ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoservicedetails.default', function ($scope) {


            let $serivcedetails = $scope.find('.service-big-img');
            $serivcedetails.not('.slick-initialized').slick({
                dots: $serivcedetails.data('slick-dots'),
                infinite: true,
                arrows: false,
                autoplay: false,
                fade: true,
                autoplaySpeed: 6000,
                asNavFor: '.service-thumb-slide',
                slidesToShow: 1,
            });
            let $serivcedetails_2 = $scope.find('.service-thumb-slide');
            $serivcedetails_2.not('.slick-initialized').slick({
                loop: false,
                dots: false,
                infinite: true,
                arrows: false,
                autoplay: false,
                autoplaySpeed: 6000,
                asNavFor: '.service-big-img',
                focusOnSelect: true,
                slidesToShow: 4,
            });
        });


        /*----------  Form Tab Section  ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoformtab.default', function ($scope, $) {
            function updateButtonBackground() {
                var activeButton = $(".vs-tab__button.active");
                if (activeButton.length) {
                    var position = activeButton.position();
                    var width = activeButton.outerWidth();
                    $(".move").css({
                        transform: "translateX(" + position.left + "px)",
                        width: width,
                    });
                }
            }

            $(".vs-tab__button").on("click", function () {
                $(".vs-tab__button").removeClass("active");
                $(this).addClass("active");
                updateButtonBackground();
            });

            // Update on window resize
            $(window).on("resize", function () {
                updateButtonBackground();
            });

            // Set initial state
            updateButtonBackground();

        });

        /*----------  Form Tab Section  ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoaboutimagebox.default', function ($scope) {
            /*----------- 13. Progress Bar ----------*/
            if ($scope.find(".progress-box").length) {

                const progressBoxes = document.querySelectorAll(".progress-box");

                const options = {
                    root: null,
                    rootMargin: "0px",
                    threshold: 0.5, // Intersection observer threshold
                };

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animateProgressBar(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                }, options);

                progressBoxes.forEach((progressBox) => {
                    observer.observe(progressBox);
                });

                function animateProgressBar(progressBox) {
                    const progressBar = progressBox.querySelector(".progress-box__bar");
                    const progressNumber = progressBox.querySelector(".progress-box__number");
                    const targetWidth = parseInt(progressBar.style.width, 10); // Explicit radix 10
                    let width = 0;

                    const countInterval = setInterval(() => {
                        width++;
                        progressBar.style.width = width + "%";
                        progressNumber.textContent = width + "%";
                        if (width >= targetWidth) {
                            clearInterval(countInterval);
                        }
                    }, 20);
                }
            }
        });
        /*----------  Form Tab Section  ----------*/
        elementorFrontend.hooks.addAction('frontend/element_ready/horsenoteammemberdetails.default', function ($scope) {
            /*----------- 13. Progress Bar ----------*/
            if ($scope.find(".progress-box").length) {

                const progressBoxes = document.querySelectorAll(".progress-box");

                const options = {
                    root: null,
                    rootMargin: "0px",
                    threshold: 0.5, // Intersection observer threshold
                };

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animateProgressBar(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                }, options);

                progressBoxes.forEach((progressBox) => {
                    observer.observe(progressBox);
                });

                function animateProgressBar(progressBox) {
                    const progressBar = progressBox.querySelector(".progress-box__bar");
                    const progressNumber = progressBox.querySelector(".progress-box__number");
                    const targetWidth = parseInt(progressBar.style.width, 10); // Explicit radix 10
                    let width = 0;

                    const countInterval = setInterval(() => {
                        width++;
                        progressBar.style.width = width + "%";
                        progressNumber.textContent = width + "%";
                        if (width >= targetWidth) {
                            clearInterval(countInterval);
                        }
                    }, 20);
                }
            }
        });

    });

    // login
    $("#boskery-login").submit(function (event) {
        event.preventDefault();

        var login = "action=signup_paragon&param=login&" + $(this).serialize();
        $.ajax({
            type: "POST",
            url: boskery_login_object.ajaxurl,
            data: login,
            beforeSend: function () {
                // setting a timeout
                $(".login-result").addClass("loading");
            },
            success: function (data) {
                $(".login-result").removeClass("loading");
                if (data.status == 2) {
                    $(".login-result").removeClass("alert alert-warning");
                    $(".login-result").html(data.message).addClass("alert alert-success");
                    window.location.href = boskery_login_object.login_redirect_url;
                } else if (data.status == 1) {
                    $(".login-result").html(data.message).addClass("alert alert-warning");
                } else {
                    $(".login-result")
                        .html(boskery_login_object.message)
                        .addClass("alert alert-warning");
                }
            }
        });
    }); //end login

    // register
    $("#boskery-registration").submit(function (event) {
        event.preventDefault();

        var signupForm =
            "action=signup_paragon&param=register&" + $(this).serialize();
        $.ajax({
            type: "POST",
            url: boskery_login_object.ajaxurl,
            data: signupForm,
            beforeSend: function () {
                // setting a timeout
                $(".registration-result").addClass("loading");
            },
            success: function (data) {
                $(".registration-result").removeClass("loading");
                if (data.status == 2) {
                    $(".registration-result").removeClass("alert alert-warning");
                    $(".registration-result")
                        .html(data.message)
                        .addClass("alert alert-success");
                    window.location.href = boskery_login_object.registration_redirect_url;
                } else {
                    $(".registration-result")
                        .html(data.message)
                        .addClass("alert alert-warning");
                }
            }
        });
    }); //end register
}(jQuery));