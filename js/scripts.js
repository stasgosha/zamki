document.addEventListener('DOMContentLoaded', function(){

	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущие"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M207.1 30.19L176.9 0l-128 128 128 128 30.2-30.19L109.27 128z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующие"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306 306"><path d="M94.35 0l-35.7 35.7L175.95 153 58.65 270.3l35.7 35.7 153-153z"/></svg></button>'
	}

	$('.big-slider').on('init', function(){
		$('.big-slider-previews [data-slide="0"]').addClass('current');
	})

	$('.big-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 450,
		arrows: false,
		dots: false,
		infinite: true,
		swipe: false,
		waitForAnimate: true,
		accessibility: false
	});

	$('.big-slider').on('beforeChange', function(e, s, c, n){
		$('.big-slider-previews [data-slide]').removeClass('current');
		$('.big-slider-previews [data-slide="'+n+'"]').addClass('current');
	})

	equalSlideHeight('.big-slider');

	$('.big-slider-previews [data-slide]').click(function(e){
		e.preventDefault();

		let slideIndex = +$(this).data('slide');

		$('.big-slider').slick('slickGoTo', slideIndex);
	});

	$('.gallery-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		speed: 600,
		arrows: true,
		...arrowsButtons,
		dots: false,
		infinite: true,
		appendArrows: $('.gallery-slider-arrows'),
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

	equalSlideHeight('.gallery-slider');


	if ($(window).width() > 575) {
		$('.awards-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			speed: 600,
			arrows: true,
			...arrowsButtons,
			dots: false,
			infinite: true,
			appendArrows: $('.awards-slider-arrows'),
			responsive: [
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2
					}
				}
			]
		});

		equalSlideHeight('.awards-slider');
	}

	$('.news-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 600,
		arrows: true,
		...arrowsButtons,
		dots: false,
		infinite: true,
		appendArrows: $('.news-slider-arrows'),
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

	equalSlideHeight('.news-slider');

	// Schema section
	$('.legend-switch input').on('change', function(e){
		let selector = $(this).data('toggle');

		if ($(this).is(':checked')) {
			$('.tab.visible ' + selector).addClass('visible');
		} else{
			$('.tab.visible ' + selector).removeClass('visible');
		}
	})

	$('.complex .house').hover(function(){
		let $descriptionEl = $( $(this).data('description') );

		$descriptionEl.addClass('visible');
	}, function(){
		let $descriptionEl = $( $(this).data('description') );

		$descriptionEl.removeClass('visible');
	});

	// Top Nav
	$('.top-nav .menu-item-has-children > a').click(function(e){
		e.preventDefault();
	});

	// Mobile Nav
	$('.mobile-top-nav .current-menu-parent').addClass('opened');

	$('.mobile-top-nav .menu-item-has-children > a').click(function(e){
		e.preventDefault();
	});

	$('.mobile-top-nav .menu-item-has-children li a').click(function(e){
		e.stopPropagation();
	});

	$('.mobile-top-nav .menu-item-has-children').click(function(){
		$(this).toggleClass('opened').find('.sub-menu').stop().slideToggle(300);
	});

	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.header').toggleClass('nav-opened');
		$('.mobile-top-nav').toggleClass('opened');

		$(this).toggleClass('active');
	});


	$('.show-phones').click(function(e){
		e.preventDefault();

		$('.mobile-phones').toggleClass('opened');

		$(this).toggleClass('active');
	});


	// Tabs
	$("[data-tab]").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var dest = $(this).data('tab');

		$(dest).stop().fadeIn(300).addClass('visible')
			.siblings().hide(0).removeClass('visible');

		$(this).addClass('current').siblings().removeClass('current');
	});

	$("[data-tab]:first-child").trigger('click');
	$("[data-tab].preselected").trigger('click');


	// Fancybox
	$(".fancybox").fancybox({
		titlePosition: 'inside'
	});

	// Sticky Header
	window.addEventListener('scroll', function(){
		let header = document.querySelector('.header');

		let offset = 60;

		let windowWidth = $(window).width();

		if (!!header) {
			window.scrollY > offset
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 80
		}, 500);
	});

	// Mobile nav
	// $('.menu-opener').bigSlide({
	// 	side: 'right',
	// 	easyClose: true,
	// 	menuWidth: '260px'
	// });

	$('.panel-nav .menu-item-has-children').click(function(){
		$(this).toggleClass('opened').find('.sub-menu').stop().slideToggle(300);
	});

	$('.panel-nav a').click(function(e){
		e.stopPropagation();
	})

	// Accordions
	$('.accordion .ac-header').click(function(){
		$(this).closest('.accordion').toggleClass('opened')
			.find('.ac-content').stop().slideToggle(300);
	});

	// Contacts Map
	function insertMap(selector){
		$(selector).html('<iframe src="https://yandex.ua/map-widget/v1/?um=constructor%3A776d1ad55f9d9a7efbc1ed7df08e9073bc9764066b0a34efcb7959aac20bb277&amp;source=constructor" width="100%" style="height: 100%" frameborder="0"></iframe>');
	}
	$('#contacts-map').each(function(i, el){
		if($(el).hasClass('load-on-start')){
			insertMap('#contacts-map');
		} else{
			setTimeout(function(){
				insertMap('#contacts-map');
			}, 2000);
		}
	});
	setTimeout(function(){
		
	}, 2000);

	// Modals
	$('.modal').css('display','block');

	function getScrollWidth(){
		// create element with scroll
		let div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';

		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();

		return scrollWidth;
	}

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
	});

	$('.modal-close, .modal-close-btn').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		showModal( $(this).data('modal') );
	});

	$('.modal-btn').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);
	});

	let bodyScrolled = 0;
	function showModal(modal){
		$(modal).addClass('visible');
		bodyScrolled = $(window).scrollTop();
		$('body').addClass('modal-visible')
				 .scrollTop(bodyScrolled)
				 .css('padding-right', getScrollWidth());

		$('header').css('padding-right', getScrollWidth());


		$('[data-src]').each( (i, el) => {
			$(el).attr('src', $(el).data('src'));
			el.removeAttribute('data-scr');
		} );
	}

	function hideModal(modal){
		$(modal).removeClass('visible');
		bodyScrolled = $(window).scrollTop();
		$('body').removeClass('modal-visible')
				 .scrollTop(bodyScrolled)
				 .css('padding-right', 0)
	}

	// Animations
	if ($(window).width() >= 992) {
		new WOW().init();
	}

	// Video
	// $('.video-block').on('click', function () {
	// 	$(this).addClass('playing');

	// 	var $videoId = $(this).find('.play-btn').data('video-id');
	// 	$(this).append('<div class="video-iframe" id="'+$videoId+'"></div>');
	// 	$(this).closest('.first-screen-video-section').addClass('playing');
	// 	createVideo($videoId);
	// })

	// var player;
	// function createVideo(videoId) {
	// 	player = new YT.Player(videoId, {
	// 		videoId: videoId,
	// 		playerVars: {
	// 			'autohide': 1,
	// 			'showinfo' : 0,
	// 			'rel': 0,
	// 			'loop': 1
	// 		},
	// 		events: {
	// 			'onReady': function (e) {
	// 				// e.target.mute();
	// 				e.target.playVideo();
	// 			}
	// 		}
	// 	});
	// }

	// Animate On Scroll (js-aos)
	// function getCoords(elem) {
	// 	var box = elem.getBoundingClientRect();

	// 	return {
	// 		top: box.top + pageYOffset,
	// 		left: box.left + pageXOffset
	// 	};

	// }

	// function setItemPosition(item, direction, shift){
	// 	if (direction === 'vertical') {
	// 		item.css({ 'transform': `translateY(${shift}px)` });
	// 	} else if(direction === 'horizontal'){
	// 		item.css({ 'transform': `translateX(${shift}px)` });
	// 	}
	// }

	// setTimeout(function(){
	// 	if ($(window).width() >= 992) {
	// 		function jsAOS(){
	// 			var scrollPosition = window.scrollY;
	// 			var screenCenter = scrollPosition + document.documentElement.clientHeight / 2;

	// 			$('.js-aos').each(function(){
	// 				var isDisposable = $(this).data('disposable') && $(this).hasClass('animated');
	// 				var moveDirection = !!$(this).data('direction') ? $(this).data('direction') : 'vertical';
	// 				var moveSpeed = !!$(this).data('speed') ? $(this).data('speed') * 1 : 0.33;

	// 				if ( !isDisposable ) {
	// 					var elemPos = getCoords(this);

	// 					var offset = $(this).data('offset') * 1;

	// 					if (!offset) {
	// 						offset = -150;
	// 					}

	// 					var scrollDiff = elemPos.top - (screenCenter + offset);
	// 					var moveShift = scrollDiff * moveSpeed;

	// 					if ($(this).data('fix') == true) {
	// 						if (
	// 							(moveShift > 0 && moveSpeed < 0) 
	// 							||
	// 							(moveShift < 0 && moveSpeed > 0)
	// 						) {
	// 							moveShift = 0;
	// 						}
	// 					}

	// 					/*if(scrollDiff <= 0){
	// 						$(this).addClass('animated');
	// 					}*/

	// 					setItemPosition($(this), moveDirection, moveShift);
	// 				} else{
	// 					setItemPosition($(this), moveDirection, 0);
	// 				}
	// 			});
	// 		}

	// 		jsAOS();

	// 		$(window).scroll(function(){
	// 			jsAOS();
	// 		});
	// 	}
	// }, 600);

});

// Object Fit Polyfill
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="bfred-it:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

objectFitImages('.object-fit-cover');
objectFitImages('.object-fit-contain');
objectFitImages('.image-block img');
objectFitImages('.team-card img');
objectFitImages('.master-photo img');
objectFitImages('.page-404-section img');
objectFitImages('.big-slider img');
objectFitImages('.big-slider-previews img');
objectFitImages('.about-section .section-image img');


// Lazy Load
/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function(q,m){"function"===typeof define&&define.amd?define(m):"object"===typeof exports?module.exports=m():q.Blazy=m()})(this,function(){function q(b){var c=b._util;c.elements=E(b.options);c.count=c.elements.length;c.destroyed&&(c.destroyed=!1,b.options.container&&l(b.options.container,function(a){n(a,"scroll",c.validateT)}),n(window,"resize",c.saveViewportOffsetT),n(window,"resize",c.validateT),n(window,"scroll",c.validateT));m(b)}function m(b){for(var c=b._util,a=0;a<c.count;a++){var d=c.elements[a],e;a:{var g=d;e=b.options;var p=g.getBoundingClientRect();if(e.container&&y&&(g=g.closest(e.containerClass))){g=g.getBoundingClientRect();e=r(g,f)?r(p,{top:g.top-e.offset,right:g.right+e.offset,bottom:g.bottom+e.offset,left:g.left-e.offset}):!1;break a}e=r(p,f)}if(e||t(d,b.options.successClass))b.load(d),c.elements.splice(a,1),c.count--,a--}0===c.count&&b.destroy()}function r(b,c){return b.right>=c.left&&b.bottom>=c.top&&b.left<=c.right&&b.top<=c.bottom}function z(b,c,a){if(!t(b,a.successClass)&&(c||a.loadInvisible||0<b.offsetWidth&&0<b.offsetHeight))if(c=b.getAttribute(u)||b.getAttribute(a.src)){c=c.split(a.separator);var d=c[A&&1<c.length?1:0],e=b.getAttribute(a.srcset),g="img"===b.nodeName.toLowerCase(),p=(c=b.parentNode)&&"picture"===c.nodeName.toLowerCase();if(g||void 0===b.src){var h=new Image,w=function(){a.error&&a.error(b,"invalid");v(b,a.errorClass);k(h,"error",w);k(h,"load",f)},f=function(){g?p||B(b,d,e):b.style.backgroundImage='url("'+d+'")';x(b,a);k(h,"load",f);k(h,"error",w)};p&&(h=b,l(c.getElementsByTagName("source"),function(b){var c=a.srcset,e=b.getAttribute(c);e&&(b.setAttribute("srcset",e),b.removeAttribute(c))}));n(h,"error",w);n(h,"load",f);B(h,d,e)}else b.src=d,x(b,a)}else"video"===b.nodeName.toLowerCase()?(l(b.getElementsByTagName("source"),function(b){var c=a.src,e=b.getAttribute(c);e&&(b.setAttribute("src",e),b.removeAttribute(c))}),b.load(),x(b,a)):(a.error&&a.error(b,"missing"),v(b,a.errorClass))}function x(b,c){v(b,c.successClass);c.success&&c.success(b);b.removeAttribute(c.src);b.removeAttribute(c.srcset);l(c.breakpoints,function(a){b.removeAttribute(a.src)})}function B(b,c,a){a&&b.setAttribute("srcset",a);b.src=c}function t(b,c){return-1!==(" "+b.className+" ").indexOf(" "+c+" ")}function v(b,c){t(b,c)||(b.className+=" "+c)}function E(b){var c=[];b=b.root.querySelectorAll(b.selector);for(var a=b.length;a--;c.unshift(b[a]));return c}function C(b){f.bottom=(window.innerHeight||document.documentElement.clientHeight)+b;f.right=(window.innerWidth||document.documentElement.clientWidth)+b}function n(b,c,a){b.attachEvent?b.attachEvent&&b.attachEvent("on"+c,a):b.addEventListener(c,a,{capture:!1,passive:!0})}function k(b,c,a){b.detachEvent?b.detachEvent&&b.detachEvent("on"+c,a):b.removeEventListener(c,a,{capture:!1,passive:!0})}function l(b,c){if(b&&c)for(var a=b.length,d=0;d<a&&!1!==c(b[d],d);d++);}function D(b,c,a){var d=0;return function(){var e=+new Date;e-d<c||(d=e,b.apply(a,arguments))}}var u,f,A,y;return function(b){if(!document.querySelectorAll){var c=document.createStyleSheet();document.querySelectorAll=function(a,b,d,h,f){f=document.all;b=[];a=a.replace(/\[for\b/gi,"[htmlFor").split(",");for(d=a.length;d--;){c.addRule(a[d],"k:v");for(h=f.length;h--;)f[h].currentStyle.k&&b.push(f[h]);c.removeRule(0)}return b}}var a=this,d=a._util={};d.elements=[];d.destroyed=!0;a.options=b||{};a.options.error=a.options.error||!1;a.options.offset=a.options.offset||100;a.options.root=a.options.root||document;a.options.success=a.options.success||!1;a.options.selector=a.options.selector||".b-lazy";a.options.separator=a.options.separator||"|";a.options.containerClass=a.options.container;a.options.container=a.options.containerClass?document.querySelectorAll(a.options.containerClass):!1;a.options.errorClass=a.options.errorClass||"b-error";a.options.breakpoints=a.options.breakpoints||!1;a.options.loadInvisible=a.options.loadInvisible||!1;a.options.successClass=a.options.successClass||"b-loaded";a.options.validateDelay=a.options.validateDelay||25;a.options.saveViewportOffsetDelay=a.options.saveViewportOffsetDelay||50;a.options.srcset=a.options.srcset||"data-srcset";a.options.src=u=a.options.src||"data-src";y=Element.prototype.closest;A=1<window.devicePixelRatio;f={};f.top=0-a.options.offset;f.left=0-a.options.offset;a.revalidate=function(){q(a)};a.load=function(a,b){var c=this.options;void 0===a.length?z(a,b,c):l(a,function(a){z(a,b,c)})};a.destroy=function(){var a=this._util;this.options.container&&l(this.options.container,function(b){k(b,"scroll",a.validateT)});k(window,"scroll",a.validateT);k(window,"resize",a.validateT);k(window,"resize",a.saveViewportOffsetT);a.count=0;a.elements.length=0;a.destroyed=!0};d.validateT=D(function(){m(a)},a.options.validateDelay,a);d.saveViewportOffsetT=D(function(){C(a.options.offset)},a.options.saveViewportOffsetDelay,a);C(a.options.offset);l(a.options.breakpoints,function(a){if(a.width>=window.screen.width)return u=a.src,!1});setTimeout(function(){q(a)})}});

var bLazy = new Blazy({
	success: function(element){
		setTimeout(function(){
		let parent = element.parentNode;
			parent.className = parent.className.replace(/\bloading\b/,'');
		}, 200);
	}
});

// SVG use polyfill
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});


svg4everybody();

// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .panel-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});