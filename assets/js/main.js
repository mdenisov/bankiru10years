
$(function() {

	var $window = $(window),
		$body = $("body");

	$body.queryLoader2({
		barColor: "#671e59",
		backgroundColor: "#FFFFFF",
		percentage: true,
		overlayId: 'qLoverlay',
		barHeight: 1,
		completeAnimation: "fade"
	});

	var s = skrollr.init({

		smoothScrolling: true,
		smoothScrollingDuration : 500,

		constants: {
			congratulations: '0',
			numerals: '85p',
			history: '200p',
			history1: '300p',
			history2: '400p',
			history3: '500p',
			history4: '700p',
			history5: '800p',
			history6: '900p',
			history7: '1000p',
			history8: '1100p',
			history9: '1200p',
			history10: '1300p',
			history11: '1400p',
			essays: '1500p',
			forum: '1600p',
			footer: '1700p'
		},

		edgeStrategy: 'set',

		easing: {
			WTF: Math.random,
			inverted: function(p) {
				return 1-p;
			}
		},

		render: function(o){
			for (var i=1; i<=11; i++) {
				var delta = i + 2;

				if (o.curTop >= $window.height() * delta) {
					$('#history-y' + i).addClass('active');
				} else {
					$('#history-y' + i).removeClass('active');
				}
			}
		}
	});

	function skrollrUpdate(videoHeight) {
		var screenHeight = $window.height();
		//$(".work-container").css('height', screenHeight);
		s.refresh();
	}

	function videoResize() {
		var videoWrapper = $('.videoWrapper');
		var headerHeight = $('.header-container').height();
		var screenHeight = $window.height();
		var screenWidth = $window.width();
		//if (screenWidth / screenHeight > 16 / 9) {
		//	videoWrapper.css('height', screenWidth * 9 / 16);
		//	videoWrapper.css('width', screenWidth);
		//	$('#worldImg').css('height', screenWidth * 9 / 16);
		//	$('#worldImg').css('width', screenWidth);
		//} else {
		//	videoWrapper.css('height', screenHeight);
		//	videoWrapper.css('width', screenHeight * 16 / 9);
		//	$('#worldImg').css('height', screenHeight);
		//	$('#worldImg').css('width', screenHeight * 16 / 9);
		//}
		//if (videoWrapper.hasClass('active')) {
		//	$(".video-container").height(videoWrapper.height());
		//	skrollrUpdate(videoWrapper.height());
		//}
		//videoWrapper.css('margin-left', -(videoWrapper.width() / 2));
		//$('#worldImg').css('margin-left', -(videoWrapper.width() / 2)).css('margin-top', -(videoWrapper.height() / 2));
		$(".video-container").css('height', screenHeight);
		//$("#intro01").css('height', screenHeight);
		//$(".work-container").css('height', screenHeight - 80);
		//$(".history").css('height', screenHeight - 80);
		//$(".history .wrapper").css('height', screenHeight - 80);
	}

	videoResize();

	$(window).resize(function() {
		videoResize();
	});

	// Slide navigation
	$body.on('click', '.timeline__link:not("#auto")', function(event) {
		event.preventDefault();

		var $item = $(this),
			hash = $item.attr('id'),
			delta = parseInt(hash.replace('history-y', ''), 10) + 2;

		$body.scrollTop($window.height() * delta);

		return false;
	});

	$('#auto').click(function(e) {
		var autoscroll;

		e.preventDefault();
		$(this).toggleClass('active');

		if ($(this).hasClass('active')) {
			autoscroll = setInterval(function() {
				var pos = $body.scrollTop();
				$body.scrollTop(pos + 30);

				if (pos === $body.scrollTop()) {
					clearInterval(autoscroll);
				}
			}, 50);
		} else {
			clearInterval(autoscroll);
		}
	});

	// Carousel
	$('.carousel').carousel({
		interval: false
	});

	// Masonry
	$('.forum').isotope({
		itemSelector: '.forum__item',
		layoutMode: 'masonry'
	});

	// Main menu
	$body.on('click', '.menu__trigger', function(event) {
		$body.toggleClass('menu--open');
	});
	$body.on('click', '.menu__item', function(event) {
		event.preventDefault();

		var $item = $(this),
			delta = $item.children().data('goto');

		$body.toggleClass('menu--open');
		//$.scrollTo( hash );

		$body.scrollTop($window.height() * delta);

		return false;
	});


	// Main Application
    var Router = Backbone.Router.extend({
        routes: {
            "": "home",
            "video": "showVideo",
            "essays/:id": "showEssays"
        }
    });

    var App = {
        Models: {},
        Collections: {},
        Views: {},

        start: function(data) {
            var BaseView = new this.Views.BaseView();

            this.router = new Router();
            this.router.on('route:home', function() {

            });

            this.router.on('route:showVideo', function() {
				modalView.setContent($('#video-modal-template').html());
				modalView.open();
            });

            this.router.on('route:showEssays', function(id) {
				modalView.setContent($('#essays-modal-template').html());
				modalView.open();
            });

			var modalView = new App.Views.ModalView();

			$('.app').html(modalView.render().el);

            //Backbone.history.start({pushState: true});
            Backbone.history.start();
        },

        navigate: function(route) {
            this.router.navigate(route, {
                trigger: true,
                replace: true
            });
        }
    };

    App.Views.BaseView = Backbone.View.extend({
        el: $('body'),

        events: {
            "click .video"   : "showVideoModal"
        },

        initialize: function() {

        },

        showVideoModal: function() {

        }
    });

	App.Views.ModalView = Backbone.View.extend({
		template: _.template($('#modal-template').html()),

		events: {
			"click .modal__close"   	: "close",
			"click .modal__wrapper"   	: "close"
		},

		initialize: function() {
			this.close();
		},

		render: function() {
			this.$el.html(this.template(this.options));
			return this;
		},

		setContent: function(content) {
			this.$('.modal__container').html(content);
			return this;
		},

		open: function() {
			this.$el.removeClass('hidden');
			this.$('.modal').addClass('modal--open');
		},

		close: function() {
			this.$el.addClass('hidden');
			this.$('.modal').removeClass('modal--open');

			this.afterClose();
		},

		afterClose: function() {
			App.navigate('/');
		}
	});

    App.start();

});