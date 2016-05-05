/*
Theme Name: Nantria
Description: Multi-Purpose HTML Site Template
Author: Bluminethemes
Theme URI: http://bluminethemes.com/preview/themeforest/html/nantria/
Author URI: http://themeforest.net/user/Bluminethemes
Version: 1.1.2
*/

(function($) {
	"use strict";

	// Mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile');
	}

	function detectIE() {
		if (navigator.userAgent.indexOf('MSIE') != -1)
			var detectIEregexp = /MSIE (\d+\.\d+);/ // test for MSIE x.x
		else // if no "MSIE" string in userAgent
			var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ // test for rv:x.x or rv x.x where Trident string exists

		if (detectIEregexp.test(navigator.userAgent)){ // if some form of IE
			var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
			if (ieversion >= 9) {
				return true;
			}
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}
	
	jQuery.fn.setAllToMaxHeight = function(){
		return this.css({ 'height' : '' }).outerHeight( Math.max.apply(this, jQuery.map( this , function(e){ return jQuery(e).outerHeight() }) ) );
	};
	

	// Preloader
	function initPreloader() {
		var preloaderDelay = 350;
		var	preloaderFadeOutTime = 800;

		function hidePreloader() {
			var preloader = $('#preloader');
			
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}

		hidePreloader();
	}


	// Refresh Waypoints
	var refreshWaypoints_timeout;

	function refreshWaypoints() {
		clearTimeout(refreshWaypoints_timeout);
		refreshWaypoints_timeout = setTimeout(function() {
			Waypoint.refreshAll();
		}, 1000);
	}


	// Animations
	function initAnimations() {
		if( !$('body').hasClass('mobile') ) {

			$('.animated').appear();

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility':'visible'
				});
			} else {
				$('.animated').on('appear', function() {
					var elem = $(this);
					var animation = elem.data('animation');
					
					if(elem.parents('.swiper-slider') || elem.parents('.flexslider')){
						return true;
					}
					
					if ( !elem.hasClass('visible') ) {
						var animationDelay = elem.data('animation-delay');
						if ( animationDelay ) {
							setTimeout(function(){
								elem.addClass( animation + ' visible' );
							}, animationDelay);
						} else {
							elem.addClass( animation + ' visible' );
						}
					}
				});
				
				/* Starting Animation on Load */
				$(window).load(function() {
					$('.onstart').each( function() {
						var elem = $(this);
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay');
							var animation = elem.data('animation');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				});
			}
		}
	}


	// Fullscreen Elements
	function initFullscreenElements() {
		$('.fullscreen-element').each(function(){
			$(this).css('min-height', getWindowHeight());
		});
	}
	

	//	Backgrounds
	function initPageBackground() {

		$.stellar({ 
			horizontalScrolling: false,
			verticalOffset: 0,
			responsive: true,
			scrollProperty: 'scroll',
			positionProperty: 'transform'
		});
		
		$('.player').each(function() {
			$('.player').mb_YTPlayer();
		});
		
		if($('body').hasClass('mobile')) {
			$('.video-wrapper, .player').css('display', 'none');	
		}
		
	}


	// Navigation
	function initNavigation() {
		
		function initOverlayNav() {
			$(document).on('click', '.nav-overlay-toggle', function(e) {
				e.preventDefault();
				$(this).toggleClass('open');
				$('.overlay-nav').toggleClass('open');
			});
		}
		initOverlayNav();
		
		function navClearEvents() {
			$(document)
				.off('click', '.nav-toggle')
				.off('click', '.header-widget > a')
				.off('click', '.header-widget[data-trigger="click"] > a')
				.off('click', 'ul.menu li.bt-dropdown > a')
				.off('click', 'ul li.dropdown-submenu > a');

			var navHoverElems = [$('ul.menu li.bt-dropdown'), $('ul li.dropdown-submenu'), $('.header-widget[data-trigger="hover"]')];
			var navHoverResult = $();

			$.each(navHoverElems, function() {
				navHoverResult = navHoverResult.add(this);
			});
		
			navHoverResult.off('mouseover mouseleave');
			$('ul li.dropdown-submenu').off('mouseover mouseleave');
			
			if(!(991 >= getWindowWidth() || $('body').hasClass('mobile'))) {
				$('.nav-toggle, .header-widget, ul.menu li.bt-dropdown, ul li.dropdown-submenu').removeClass('open');
			};
		}
		
		function initMobileNav() {
			
			navClearEvents();
			if(!$('.nav-toggle').hasClass('open')) {
				$('.block-menu').hide();
			};
			
			$(document).on('click', '.nav-toggle', function(e) {
				e.preventDefault();
				$('.header-widget').removeClass('open');
				$(this).toggleClass('open');
				$('.block-menu').slideToggle(500);
			});
			
			$(document).on('click', '.header-widget > a', function(e) {
				e.preventDefault();
				if($(this).parent('.header-widget').hasClass('open')) {
					$('.header-widget').removeClass('open');
				} else {
					if($('.nav-toggle').hasClass('open')) {
						$('.nav-toggle').removeClass('open');
						$('.block-menu').slideUp(500);
					}
					$('.header-widget').removeClass('open');		
					$(this).parent('.header-widget').addClass('open');
				}
			});
			
			$(document).on('click', 'ul.menu li.bt-dropdown > a', function(e) {
				e.preventDefault();
				if( $(this).parent('li.bt-dropdown').hasClass('open')){
					$(this).parent('li.bt-dropdown').removeClass('open');
					return true;
				} 
				$(this).parent('li.bt-dropdown').addClass('open');
			});
			
			$(document).on('click', 'ul li.dropdown-submenu > a', function(e) {
				e.preventDefault();
				if( $(this).parent('li.dropdown-submenu').hasClass('open')){
					$(this).parent('li.dropdown-submenu').removeClass('open');
					return true;
				}
				$(this).parent('li.dropdown-submenu').addClass('open');
			});

		}

		function initDesktopNav() {
			
			navClearEvents();
			$('.block-menu').show();
			
			$(document).on('click', '.header-widget[data-trigger="click"] > a', function(e) {
				e.preventDefault();
				if($(this).parent('.header-widget').hasClass('open')) {
					$('.header-widget').removeClass('open');
				} else {
					$('.header-widget').removeClass('open');		
					$(this).parent('.header-widget').addClass('open');
				}
			});

			var navHoverElems = [$('ul.menu li.bt-dropdown'), $('ul li.dropdown-submenu'), $('.header-widget[data-trigger="hover"]')];
			var navHoverResult = $();

			$.each(navHoverElems, function() {
				navHoverResult = navHoverResult.add(this);
			});
		
			navHoverResult.on({
				mouseover: function (event) {
					if($(this).hasClass('open') && $(this).is(event.target)) {
						return true;
					}
					$('ul.menu li.bt-dropdown').removeClass('open');
					$('.header-widget').removeClass('open');		
					$(this).addClass('open');
				},
				mouseleave: function () {
					if(!$(this).hasClass('open')) {
						return true;
					}
					$(this).removeClass('open');
				}
			});
			
		}

		// Header Widget - Hidden
		$(document).on('click', function(e) {
			if($(e.target).closest('.main-header').length > 0)
				return;
			$('.header-widget').removeClass('open');
		});
		
		function wersenaNav() {
			if ( 991 >= getWindowWidth() || $('body').hasClass('mobile')) {
				initMobileNav();
			} else {
				initDesktopNav();
			}
		}
		wersenaNav();
		$(window).on('resize', function () {			
			wersenaNav();
		});
		

		var mainHeader = $('.main-header');
		if(!$('body').hasClass('mobile')) {
			$(window).scroll(function(){

				var scroll = $(this).scrollTop();
				var headerHeight = $('section').first().innerHeight();
				var windowWidth = getWindowWidth();
				if($('#portfolio').length > 0){
					var portfolioPosition = $('#portfolio').offset().top;
				}
				
				$(window).on('resize', function () {
					var scroll = $(this).scrollTop();
					var headerHeight = $('section').first().innerHeight();
					var windowWidth = getWindowWidth();
					if($('#portfolio').length > 0){
						var portfolioPosition = $('#portfolio').offset().top;
					}
				});
				
				if (!mainHeader.hasClass('header-static')) {
					if (windowWidth > 991) {
						if (scroll > 180) {
							mainHeader.addClass('scrolled');
						} else {
							mainHeader.removeClass('scrolled');
						}	
						if (scroll > headerHeight) {
							mainHeader.addClass('header-sticky');
						} else {
							mainHeader.removeClass('header-sticky');
						}
					}
				}
			});
		}
		
		var backToTop = $('.backToTop');
		if(!$('body').hasClass('mobile')) {
			$(window).scroll(function(){

				var scroll = $(this).scrollTop();
				var windowWidth = getWindowWidth();
				
				$(window).on('resize', function () {
					var scroll = $(this).scrollTop();
					var windowWidth = getWindowWidth();
				});				
				
				if (windowWidth > 991) {
					if (scroll > 370) {
						backToTop.addClass('fadein');
					} else {
						backToTop.removeClass('fadein');
					}
				}		
			});
		}
		
	}
	

	// Portfolio
	function initMasonryLayout() {
		if ($('.isotope-container').length > 0) {
			var $isotopeContainer = $('.isotope-container');
			var $columnWidth = $isotopeContainer.data('column-width');
			
			if($columnWidth == null){
				var $columnWidth = '.isotope-item';
			}
			
			$isotopeContainer.isotope({
				filter: '*',
				animationEngine: 'best-available',
				resizable: false,
				itemSelector : '.isotope-item',
				masonry: {
					columnWidth: $columnWidth
				},
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			}, refreshWaypoints());
		}

		$('nav.isotope-filter ul a').on('click', function() {
			var selector = $(this).attr('data-filter');
			$isotopeContainer.isotope({ filter: selector }, refreshWaypoints());
			$('nav.isotope-filter ul a').removeClass('active');
			$(this).addClass('active');
			return false;
		});

	}


	// magnificPopup
	function initMagnificPopup() {
		$('.mfp-image').magnificPopup({
			type:'image',
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
		$('.mfp-gallery').each(function() {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: {
					enabled: true
				},
				closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
				removalDelay: 300,
				mainClass: 'mfp-fade'
			});
		});
		
		$('.mfp-iframe').magnificPopup({
			type: 'iframe',
			iframe: {
				patterns: {
					youtube: {
						index: 'youtube.com/',
						id: 'v=',
						src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
					},
					vimeo: {
						index: 'vimeo.com/',
						id: '/',
						src: '//player.vimeo.com/video/%id%?autoplay=1'
					},
					gmaps: {
						index: '//maps.google.',
						src: '%id%&output=embed'
					}
				},
				srcAction: 'iframe_src'
			},
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
		$('.mfp-ajax').magnificPopup({
			type: 'ajax',
			ajax: {
				settings: null,
				cursor: 'mfp-ajax-cur',
				tError: '<a href="%url%">The content</a> could not be loaded.'
			},
			midClick: true,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			callbacks: {
				ajaxContentAdded: function(mfpResponse) {
					initFlexslider();
				}
			}
		});
		
		$('.open-popup-link').magnificPopup({
			type: 'inline',
			midClick: true,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
	}
	
	// Flexslider
	function initFlexslider() {
		
		if ($('.bt-flexcarousel').length > 0) {			
			
			$('.bt-flexcarousel').flexslider({
				selector: '.slides > div.flex-slide',
				animation: 'slide',
				slideshowSpeed: 2000,
				animationSpeed: 700,
				prevText: "<i class='fa fa-angle-left'></i>",
				nextText: "<i class='fa fa-angle-right'></i>",
				controlNav: false
			});
			
		}
				
		if ($('.bt-flexslider').length > 0) {			
			$('.bt-flexslider').each(function() {
				var $flexsSlider = $(this),
					fs_effect = $flexsSlider.data('effect'),
					fs_easing = $flexsSlider.data('easing'),
					fs_direction = $flexsSlider.data('direction'),
					fs_loop = $flexsSlider.data('loop'),
					fs_smoothHeight = $flexsSlider.data('smooth-height'),
					fs_startAt = $flexsSlider.data('startat'),
					fs_slideshowSpeed = $flexsSlider.data('slideshow-speed'),
					fs_animationSpeed = $flexsSlider.data('animation-speed'),
					fs_randomize = $flexsSlider.data('randomize'),
					fs_video = $flexsSlider.data('video'),
					fs_pagination = $flexsSlider.data('pagination'),
					fs_directionNav = $flexsSlider.data('directionnav'),
					fs_keyboard = $flexsSlider.data('keyboard'),
					fs_pausePlay = $flexsSlider.data('pause-play');
				
				if(fs_effect == null){ fs_effect = 'slide'; }
				if(fs_easing == null){ fs_easing = 'swing'; }
				if(fs_direction == null){ fs_direction = 'horizontal'; }
				if(fs_loop == null){ fs_loop = true; }
				if(fs_smoothHeight == null){ fs_smoothHeight = false; }
				if(fs_startAt == null){ fs_startAt = 0; }
				if(fs_slideshowSpeed == null){ fs_slideshowSpeed = 7000; }
				if(fs_animationSpeed == null){ fs_animationSpeed = 700; }
				if(fs_randomize == null){ fs_randomize = false; }	
				if(fs_video == null){ fs_video = false; }
				if(fs_pagination == null){ fs_pagination = true; }
				if(fs_directionNav == null){ fs_directionNav = true; }
				if(fs_keyboard == null){ fs_keyboard = false; }
				if(fs_pausePlay == null){ fs_pausePlay = false; }
				
				$flexsSlider.flexslider({
					selector: ".slides > div.flex-slide",
					animation: ''+ fs_effect +'',
					easing: ''+ fs_easing +'',
					direction: ''+ fs_direction +'',
					animationLoop: fs_loop,
					smoothHeight: fs_smoothHeight,
					startAt: fs_startAt,
					slideshow: true,
					slideshowSpeed: fs_slideshowSpeed,
					animationSpeed: fs_animationSpeed,
					randomize: fs_randomize,
					pauseOnAction: true,
					pauseOnHover: false,
					video: fs_video,
					controlNav: fs_pagination,
					directionNav: fs_directionNav,
					prevText: "<i class='fa fa-angle-left'></i>",
					nextText: "<i class='fa fa-angle-right'></i>",
					keyboard: fs_keyboard,
					pausePlay: fs_pausePlay,
					pauseText: 'Pause',
					playText: 'Play',
					start: function(){
						$flexsSlider.find('.flex-active-slide .animated').each(function() {
							var elem = $(this),
								animation = elem.data('animation'),
								animationDelay = elem.data('animation-delay');

							if(!elem.parents('.flex-slide').hasClass('flex-active-slide') && elem.hasClass('visible')) {				
								elem.removeClass(animation).removeClass('visible');
							}
								
							if(elem.parents('.flex-slide').hasClass('flex-active-slide') && !elem.hasClass('visible')) {			
								if ( animationDelay ) {
									setTimeout(function(){
										elem.addClass( animation + ' visible' );
									}, animationDelay);
								} else {
									elem.addClass( animation + ' visible' );
								}
							}
						});
					},
					after: function(){
						$flexsSlider.find('.animated').each(function() {
							var elem = $(this),
								animation = elem.data('animation'),
								animationDelay = elem.data('animation-delay');
							
							if(!elem.parents('.flex-slide').hasClass('sflex-active-slide') && elem.hasClass('visible')) {				
								elem.removeClass(animation).removeClass('visible');
							}
							
							if(elem.parents('.flex-slide').hasClass('flex-active-slide') && !elem.hasClass('visible')) {			
								if ( animationDelay ) {
									setTimeout(function(){
										elem.addClass( animation + ' visible' );
									}, animationDelay);
								} else {
									elem.addClass( animation + ' visible' );
								}
							}
						});
					}
				});
			});
		}
		
		if ($('.thumbs-gallery').length > 0) {			
			$('.thumbs-gallery').each(function() {
				var $flexsSlider = $(this),
					fs_effect = $flexsSlider.data('effect'),
					fs_easing = $flexsSlider.data('easing'),
					fs_loop = $flexsSlider.data('loop'),
					fs_slideshowSpeed = $flexsSlider.data('slideshow-speed'),
					fs_animationSpeed = $flexsSlider.data('animation-speed');
					
				if(fs_effect == null){ fs_effect = 'slide'; }
				if(fs_easing == null){ fs_easing = 'swing'; }
				if(fs_loop == null){ fs_loop = false; }
				if(fs_slideshowSpeed == null){ fs_slideshowSpeed = 7000; }
				if(fs_animationSpeed == null){ fs_animationSpeed = 700; }
				
				$flexsSlider.flexslider({
					selector: ".slides > div.flex-slide",
					animation: ''+ fs_effect +'',
					easing: ''+ fs_easing +'',
					animationLoop: fs_loop,
					slideshowSpeed: fs_slideshowSpeed,
					animationSpeed: fs_animationSpeed,
					controlNav: 'thumbnails',
					directionNav: false,
					keyboard: false,
					smoothHeight: true
				});
			});
		}
		
	}
	
	function initPlugins() {

		// Smooth Scroll
		$('a.scrollto').off('click');
		$('a.scrollto').on('click', function() {
			var sScroll = $(this),
				sScroll_offset = sScroll.data('offset'),
				sScroll_easing = sScroll.data('easing'),
				sScroll_speed = sScroll.data('speed'),
				sScroll_target = sScroll.attr('href');
				
			if(sScroll_offset == null){ sScroll_offset = 0; }
			if(sScroll_easing == null){ sScroll_easing = 'swing'; }
			if(sScroll_speed == null){ sScroll_speed = 800; }
			if(sScroll_target == null){ sScroll_target = '#'; }
			
			$.smoothScroll({
				offset: sScroll_offset,
				easing: ''+ sScroll_easing +'',
				speed: sScroll_speed,
				scrollTarget: sScroll_target
			});
			return false;
		});
	
		// Responsive Video - FitVids
		$('.video-container').fitVids();
		
		// OwlCarousel
		if ($('.bt-owl-carousel').length > 0) {			
			$('.bt-owl-carousel').each(function() {
				var $owlCarousel = $(this),
					owl_items = $owlCarousel.data('items'),
					owl_itemsLg = $owlCarousel.data('items-lg'),
					owl_itemsMd = $owlCarousel.data('items-md'),
					owl_itemsSm = $owlCarousel.data('items-sm'),
					owl_itemsXs = $owlCarousel.data('items-xs'),
					owl_itemsXxs = $owlCarousel.data('items-xxs'),
					owl_slidespeed = $owlCarousel.data('slidespeed'),
					owl_paginationspeed = $owlCarousel.data('paginationspeed'),
					owl_rewindspeed = $owlCarousel.data('rewindspeed'),
					owl_autoplay = $owlCarousel.data('autoplay'),
					owl_stoponhover = $owlCarousel.data('stoponhover'),
					owl_navigation = $owlCarousel.data('navigation'),
					owl_rewindnav = $owlCarousel.data('rewindnav'),
					owl_scrollperpage = $owlCarousel.data('scrollperpage'),
					owl_pagination = $owlCarousel.data('pagination'),
					owl_paginationnumbers = $owlCarousel.data('paginationnumbers'),
					owl_colmargin = $owlCarousel.data('colmargin');
				
				if(owl_items == null ) { owl_items = 4; }
				if(owl_itemsLg == null ) { owl_itemsLg = Number( owl_items); }
				if(owl_itemsMd == null ) { owl_itemsMd = Number( owl_itemsLg); }
				if(owl_itemsSm == null ) { owl_itemsSm = Number( owl_itemsMd); }
				if(owl_itemsXs == null ) { owl_itemsXs = Number( owl_itemsSm); }
				if(owl_itemsXxs == null ) { owl_itemsXxs = Number( owl_itemsXs); }
				if(owl_slidespeed == null){ owl_slidespeed = 700; }
				if(owl_paginationspeed == null){ owl_paginationspeed = 700; }
				if(owl_rewindspeed == null){ owl_rewindspeed = 700; }
				if(owl_autoplay == null){ owl_autoplay = false; }
				if(owl_stoponhover == null){ owl_stoponhover = false; }				
				if(owl_navigation == null){ owl_navigation = true; }
				if(owl_rewindnav == null){ owl_rewindnav = true; }
				if(owl_scrollperpage == null){ owl_scrollperpage = 1; }			
				if(owl_pagination == null){ owl_pagination = true; }
				if(owl_paginationnumbers == null){ owl_paginationnumbers = false; }	
				
				if(owl_colmargin == null){
					$owlCarousel.find('.carousel-item').css({
						'padding-left': 0,
						'padding-right': 0
					});
				} else {
					$owlCarousel.css({
						'margin-left': -owl_colmargin,
						'margin-right': -owl_colmargin
					});
					$owlCarousel.find('.carousel-item').css({
						'padding-left': owl_colmargin,
						'padding-right': owl_colmargin
					});
				}
				
				$owlCarousel.owlCarousel({
					itemsCustom : [
						[0, owl_itemsXxs],
						[480, owl_itemsXs],
						[768, owl_itemsSm],
						[992, owl_itemsMd],
						[1200, owl_itemsLg]
					],
					slideSpeed : owl_slidespeed,
					paginationSpeed : owl_paginationspeed,
					rewindSpeed : owl_rewindspeed,					
					autoPlay : owl_autoplay,
					stopOnHover : owl_stoponhover,
					navigation : owl_navigation,
					navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
					rewindNav : owl_rewindnav,
					scrollPerPage : owl_scrollperpage,
					pagination : owl_pagination,
					paginationNumbers: owl_paginationnumbers,
					mouseDrag: false
				});
			});
		}
		
		// Swiper Slider
		if ($('.swiper-slider .swiper-container').length > 0) {	
			$('.swiper-slider .swiper-container').each(function() {
				var swiperSlider = $(this),
					swiper_speed = swiperSlider.data('speed'),
					swiper_autoHeight = swiperSlider.data('autoheight'),
					swiper_autoplay = swiperSlider.data('autoplay'),
					swiper_autoplayStopOnLast = swiperSlider.data('autoplaystoponlast'),
					swiper_autoplayDisableOnInteraction = swiperSlider.data('autoplaydisableoninteraction'),
					swiper_freeMode = swiperSlider.data('freemode'),
					swiper_effect = swiperSlider.data('effect'),
					swiper_parallax = swiperSlider.data('parallax'),
					swiper_spaceBetween = swiperSlider.data('spacebetween'),
					swiper_slidesPerView = swiperSlider.data('slidesperview'),
					swiper_centeredSlides = swiperSlider.data('centeredslides'),
					swiper_slidesOffsetBefore = swiperSlider.data('slidesoffsetbefore'),
					swiper_slidesOffsetAfter = swiperSlider.data('slidesoffsetafter'),				
					swiper_paginationType = swiperSlider.data('paginationtype'),
					swiper_paginationHide = swiperSlider.data('paginationhide'),
					swiper_keyboardControl = swiperSlider.data('keyboardcontrol'),
					swiper_loop = swiperSlider.data('loop'),
					swiper_loopedSlides = swiperSlider.data('loopedslides');
					
				if(swiper_speed == null){ swiper_speed = 700; }
				if(swiper_autoHeight == null){ swiper_autoHeight = false; }
				if(swiper_autoplay == null){ swiper_autoplay = null; }
				if(swiper_autoplayStopOnLast == null){ swiper_autoplayStopOnLast = false; }
				if(swiper_autoplayDisableOnInteraction == null){ swiper_autoplayDisableOnInteraction = true; }
				if(swiper_freeMode == null){ swiper_freeMode = false; }
				if(swiper_effect == null){ swiper_effect = 'slide'; }
				if(swiper_parallax == null){ swiper_parallax = false; }
				if(swiper_spaceBetween == null){ swiper_spaceBetween = 0; }
				if(swiper_slidesPerView == null){ swiper_slidesPerView = 'auto'; }
				if(swiper_centeredSlides == null){ swiper_centeredSlides = false; }
				if(swiper_slidesOffsetBefore == null){ swiper_slidesOffsetBefore = 0; }
				if(swiper_slidesOffsetAfter == null){ swiper_slidesOffsetAfter = 0; }
				if(swiper_paginationType == null){ swiper_paginationType = 'bullets'; }
				if(swiper_paginationHide == null){ swiper_paginationHide = true; }
				if(swiper_keyboardControl == null){ swiper_keyboardControl = false; }
				if(swiper_loop == null){ swiper_loop = true; }
				
				if( swiperSlider.find('.swiper-pagination').length > 0 && swiper_paginationType == 'bullets' ) {
					var swiper_pagination = '.swiper-pagination',
						swiper_paginationClickable = true;
				} else if( swiperSlider.find('.swiper-pagination').length > 0 && swiper_paginationType !== 'bullets' ) {
					var swiper_pagination = '.swiper-pagination',
						swiper_paginationClickable = false;
				} else {
					var swiper_pagination = '',
						swiper_paginationClickable = false;
				}
				
				if( swiper_slidesPerView == 'auto' &&  swiper_loop == true ) {
					var swiper_loopedSlides = swiperSlider.find('.swiper-slide').length;
				} else {
					var swiper_loopedSlides = 0;
				}
				
				var mySwiper = new Swiper(swiperSlider, {
					speed: swiper_speed,
					autoHeight: swiper_autoHeight,
					autoplay: swiper_autoplay,
					autoplayStopOnLast: swiper_autoplayStopOnLast,
					autoplayDisableOnInteraction: swiper_autoplayDisableOnInteraction,
					freeMode: swiper_freeMode,
					effect: swiper_effect,
					parallax: swiper_parallax,
					spaceBetween: swiper_spaceBetween,
					slidesPerView: swiper_slidesPerView,
					centeredSlides: swiper_centeredSlides,
					slidesOffsetBefore: swiper_slidesOffsetBefore,
					slidesOffsetAfter: swiper_slidesOffsetAfter,
					grabCursor: false,
					simulateTouch: false,
					pagination: swiper_pagination,
					paginationType: swiper_paginationType,
					paginationClickable: swiper_paginationClickable,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					keyboardControl: swiper_keyboardControl,
					loop: swiper_loop,
					loopedSlides: swiper_loopedSlides,
					onInit: function(swiper){
						swiperSlider.find('.swiper-slide-active .animated').each(function() {
							var elem = $(this),
								animation = elem.data('animation'),
								animationDelay = elem.data('animation-delay');

							if(!elem.parents('.swiper-slide').hasClass('swiper-slide-active') && elem.hasClass('visible')) {				
								elem.removeClass(animation).removeClass('visible');
							}
								
							if(elem.parents('.swiper-slide').hasClass('swiper-slide-active') && !elem.hasClass('visible')) {			
								if ( animationDelay ) {
									setTimeout(function(){
										elem.addClass( animation + ' visible' );
									}, animationDelay);
								} else {
									elem.addClass( animation + ' visible' );
								}
							}
						});
					},
					onSlideChangeEnd: function(swiper){
						swiperSlider.find('.animated').each(function() {
							var elem = $(this),
								animation = elem.data('animation'),
								animationDelay = elem.data('animation-delay');
							
							if(!elem.parents('.swiper-slide').hasClass('swiper-slide-active') && elem.hasClass('visible')) {				
								elem.removeClass(animation).removeClass('visible');
							}
							
							if(elem.parents('.swiper-slide').hasClass('swiper-slide-active') && !elem.hasClass('visible')) {			
								if ( animationDelay ) {
									setTimeout(function(){
										elem.addClass( animation + ' visible' );
									}, animationDelay);
								} else {
									elem.addClass( animation + ' visible' );
								}
							}
						});
					}
				});
			});
		}
		
		if ($('.swiper-gallery').length > 0) {
			$('.swiper-gallery').each(function() {
				
				var swiperGallery = $(this),
					swiperGalleryTop = swiperGallery.find('.gallery-top'),
					swiperGalleryTbumbs = swiperGallery.find('.gallery-thumbs'),
					swiperGallery_speed = swiperGalleryTop.data('speed'),
					swiperGalleryTop_spaceBetween = swiperGalleryTop.data('spacebetween'),
					swiperGalleryTbumbs_spaceBetween = swiperGalleryTbumbs.data('spacebetween');
				
				if(swiperGallery_speed == null){ swiperGalleryTop_speed = 700; }
				if(swiperGalleryTop_spaceBetween == null){ swiperGalleryTop_spaceBetween = 0; }
				if(swiperGalleryTbumbs_spaceBetween == null){ swiperGalleryTbumbs_spaceBetween = 0; }
				
				var galleryTop = new Swiper(swiperGalleryTop, {
					speed: swiperGallery_speed,
					spaceBetween: swiperGalleryTop_spaceBetween,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev'
				});

				var galleryThumbs = new Swiper(swiperGalleryTbumbs, {
					speed: swiperGallery_speed,
					spaceBetween: swiperGalleryTbumbs_spaceBetween,
					centeredSlides: true,
					slidesPerView: 'auto',
					touchRatio: 0.2,
					slideToClickedSlide: true
				});

				galleryTop.params.control = galleryThumbs;
				galleryThumbs.params.control = galleryTop;
				
			});
		}

		// Countdown
		if ($('.countdown[data-countdown]').length > 0) {			
			$('.countdown[data-countdown]').each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div><div class="counter-box"><div class="number">%H</div><span>Hours</span></div><div class="counter-box"><div class="number">%M</div><span>Minutes</span></div><div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}

		// Count To		
		if( $('.count-block').is(':appeared') ){
			$('.count-to').countTo();
		} else {
			$('.count-to').countTo();
		}

		// Placeholder
		$('input, textarea').placeholder();
		
		// Select2
		$(".js-selectbox").select2({
			minimumResultsForSearch: Infinity
		});
		
		$(".js-selectbox-search").select2();
		
		$(".js-selectbox-multiple").select2();
		
		// Tooltip
		$('[data-toggle="tooltip"]').tooltip();
		
		// Popover
		$('[data-toggle="popover"]').popover();
		
		// Morphext
		$('.text-rotate').Morphext({
			animation: 'fadeIn',
			separator: '|',
			speed: 3000
		});
	
	}
	

	// Mailchimp
	function initMailchimp() {
		$('.mailchimp-form').ajaxChimp({
			callback: mailchimpCallback,
			url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);		
			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}  
		}

		$('#email').focus(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$('#email').on('keydown', function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$("#email").on('click', function() {
			$("#email").val('');
		});
	}


	// Contact Form
	function initContactForm() {

		var scrollElement = $('html,body');
		var	contactForm = $('.contactform');
		var	form_msg_timeout;

		contactForm.on( 'submit', function() {

			var requiredFields = $(this).find('.required');
			var	formFields = $(this).find('input, textarea');
			var	formData = contactForm.serialize();
			var	formAction = $(this).attr('action');
			var	formSubmitMessage = $('.response-message');

			requiredFields.each(function() {

				if( $(this).val() === '' ) {
					$(this).addClass('input-error');
				} else {
					$(this).removeClass('input-error');
				}

			});

			function validateEmail(email) { 
				var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return exp.test(email);
			}

			var emailField = $('.contactform :input[type="email"]');

			if( !validateEmail(emailField.val()) ) {
				emailField.addClass('input-error');
			}

			if ($('.contactform :input').hasClass('input-error')) {
				return false;
			} else {
			
				clearTimeout(form_msg_timeout);
				
				$.post(formAction, formData, function(data) {
					var formSubmitMessageData = data;
					formSubmitMessage.html(formSubmitMessageData);

					formFields.val('');

					form_msg_timeout = setTimeout(function() {
						formSubmitMessage.slideUp();
					}, 5000);
				});

			}

			return false;

		});

	}
	
	
	// Quick Contact Form
	function initOuickContactForm() {

		var scrollElement = $('html,body');
		var	contactForm = $('.quick-contactform');
		var	form_msg_timeout;

		contactForm.on( 'submit', function() {

			var requiredFields = $(this).find('.required');
			var	formFields = $(this).find('input, textarea');
			var	formData = contactForm.serialize();
			var	formAction = $(this).attr('action');
			var	formSubmitMessage = $('.response-message');

			requiredFields.each(function() {

				if( $(this).val() === '' ) {
					$(this).addClass('input-error');
				} else {
					$(this).removeClass('input-error');
				}

			});

			function validateEmail(email) { 
				var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return exp.test(email);
			}

			var emailField = $('.quick-contactform :input[type="email"]');

			if( !validateEmail(emailField.val()) ) {
				emailField.addClass('input-error');
			}

			if ($('.quick-contactform :input').hasClass('input-error')) {
				return false;
			} else {
			
				clearTimeout(form_msg_timeout);
				
				$.post(formAction, formData, function(data) {
					var formSubmitMessageData = data;
					formSubmitMessage.html(formSubmitMessageData);

					formFields.val('');

					form_msg_timeout = setTimeout(function() {
						formSubmitMessage.slideUp();
					}, 5000);
				});

			}

			return false;

		});

	}
	

	// Map
	function intMaps() {
		if ($('.gmap').length > 0) {
			$('.gmap').each(function() {
				var adress = $(this).data('adress');
				var zoom = $(this).data('zoom');
				var map_height = $(this).data('height');
				
				if (map_height){
					$('.gmap').css('height',map_height);
				}
			});
		}
	}
	
	// Custom OnLoad Functions
	function initOnLoadFunctions() {
		
		$('.feature-box-container').each(function(){
			$(this).find('.feature-box').setAllToMaxHeight();
		});
		
		$('.equal-section').each(function(){
			$(this).find('.equal-col').setAllToMaxHeight();
		});
		
		jQuery(window).resize(function(){
			$('.feature-box-container').each(function(){
				$(this).find('.feature-box').setAllToMaxHeight();
			});
			$('.equal-section').each(function(){
				$(this).find('.equal-col').setAllToMaxHeight();
			});
		});
		
	}
	

	// WINDOW.LOAD FUNCTION
	$(window).load(function() {
		initPreloader();
		initMasonryLayout();
		initOnLoadFunctions();
	});
	
	// DOCUMENT.READY FUNCTION
	jQuery(document).ready(function($) {
		initAnimations();
		initFullscreenElements();
		initPageBackground();
		initNavigation();
		initMagnificPopup();
		initFlexslider();
		initPlugins();
		initMailchimp();
		initContactForm();
		initOuickContactForm();
		intMaps();
	});
	
	// WINDOW.RESIZE FUNCTION
	$(window).on('resize', function () {
		initFullscreenElements();
		initMasonryLayout();
	});

})(jQuery);