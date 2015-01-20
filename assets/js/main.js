
$(function() {

	$("body").queryLoader2({
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

//			console.log(o);

			//if (o.curTop > 13700 && o.curTop < 13950) {
			//	$('.counter').text(o.curTop - 13700);
				$('.counter').text(o.curTop - 13700);
			//}

			if (o.curTop >= '300p') {

				$('#history-y1').addClass('active');

			} else {

				$('#history-y1').removeClass('active');

			}

		//	if (o.curTop >= 22400) {
		//
		//		$('#marriage').addClass('active');
		//
		//	} else {
		//
		//		$('#marriage').removeClass('active');
		//
		//	}
		//
		//	if (o.curTop >= 45400) {
		//
		//		$('#bitcoins-industry').addClass('active');
		//
		//	} else {
		//
		//		$('#bitcoins-industry').removeClass('active');
		//
		//	}
		//
		//	if (o.curTop >= 63800) {
		//
		//		$('#more').addClass('active');
		//
		//	} else {
		//
		//		$('#more').removeClass('active');
		//
		//	}
		//
		}
	});

	function skrollrUpdate(videoHeight) {
		var screenHeight = $(window).height();
		//$(".work-container").css('height', screenHeight);
		s.refresh();
	}

	function videoResize() {
		var videoWrapper = $('.videoWrapper');
		var headerHeight = $('.header-container').height();
		var screenHeight = $(window).height();
		var screenWidth = $(window).width();
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

	//$("#labour").click(function(e) {
	//	e.preventDefault();
	//	$('body,html').stop().animate({
	//		scrollTop: 3500
	//	}, 2000);
	//});
	//$("#marriage").click(function(e) {
	//	e.preventDefault();
	//	$('body,html').stop().animate({
	//		scrollTop: 22600
	//	}, 2000);
	//});
	//$("#bitcoins-industry").click(function(e) {
	//	e.preventDefault();
	//	$('body,html').stop().animate({
	//		scrollTop: 45600
	//	}, 2000);
	//});
	//$("#more").click(function(e) {
	//	e.preventDefault();
	//	$('body,html').stop().animate({
	//		scrollTop: 64000
	//	}, 2000);
	//});
	$('#auto').click(function(e) {
		var div = $('body'),
			autoscroll;
		e.preventDefault();
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			autoscroll = setInterval(function() {
				var pos = div.scrollTop();
				div.scrollTop(pos + 30);
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

	// Main Application
    var Router = Backbone.Router.extend({
        routes: {
            "": "home",
            "video": "showVideo",
            "message/:id": "showMessage"
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
                var modalView = new App.Views.VideoModal();
                $('.app').html(modalView.render().el);
            });

            this.router.on('route:showMessage', function(id) {
                var contactsView = new ContactManager.Views.Contacts({
                    collection: contacts
                });

                $('.main-container').html(contactsView.render().$el);
            });

//            Backbone.history.start({pushState: true});
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

    App.Views.VideoModal = Backbone.Modal.extend({
        template: _.template($('#modal-template').html()),
        cancelEl: '.bbm-button',

        cancel: function() {
            App.navigate('/');
        }
    });

    App.start();

});