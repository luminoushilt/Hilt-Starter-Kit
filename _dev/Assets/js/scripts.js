jQuery.noConflict();
var newSite = (function($) {

	// Toggles Mobile Menu
	function mobileMenu() {
		var $menuToggle = $('.mobile-nav-toggle');
		var $menu = $('.navbar');
		var $site = $('#wrapper');

		$menuToggle.on('click', function() {
			$(this).toggleClass('is-open');
			$menu.toggleClass('nav-open');
			$site.toggleClass('menu-open');
		});
	}

	function backToTop() {
		var $page = $('html, body');
		var $back2top = $('.back-to-top');
		var duration = 300;​
		$back2top.click(function(jump) {
			$page.animate({
				scrollTop: 0
			}, duration);
			jump.preventDefault();
		});​
		$(window).scroll(function() {
			var $self = $(this),
				height = 0,
				top = $self.scrollTop();​
			if (top > height) {
				if (!$back2top.is(':visible')) {
					$back2top.fadeIn(duration);
				}
			} else {
				$back2top.hide();
			}​
		});
	}

	// Auto scrolling
	function smoothScroll() {
		var anchorTags = $('a[href*=#]:not([href=#])');
		var duration = 300;
		var menu = $('.navi');
		var hero = $('.hero-unit');

		anchorTags.on('click', function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				var page = $('html, body');

				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				hero.removeClass('is-open');
				menu.removeClass('is-open');
				if (target.length) {
					page.animate({
						scrollTop: target.offset().top
					}, duration);
					return false;
				}
			}
		});
	}

	function vidPlayer() {
		var $vidBtn = $('.vid-btn');
		var $vidImg = $('#video-play-image');
		var $vid = $('#player');
		var $cusMsg = $('#custom-message');
		var options = {
			id: 181705062,
			width: 640,
			autoplay: true
		};
		var vidEnd = function() {
			$vid.hide();
			$cusMsg.show();
		}

		$vidBtn.on('click', function(jump) {
			var player = new Vimeo.Player('player', options);

			$vidImg.hide();
			player.setVolume(1);
			player.on('play', function() {
				console.log('played the video!');
			});
			jump.preventDefault();
			player.on('ended', vidEnd);
		});
	}

	$(document).ready(function() {
		mobileMenu();
		backToTop();
		//vidPlayer();
		//smoothScroll();
	});

})(jQuery);