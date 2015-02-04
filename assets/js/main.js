
$(function() {

	var $window = $(window),
		$body = $("body");

	grunticon(["dist/icons/icons.data.svg.css", "dist/icons/icons.data.png.css", "dist/icons/icons.fallback.css"]);

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
			numerals: '120p',
			history:  '200p',
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
			footer: '1800p'
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

	function skrollrUpdate() {
		var realHeight = $window.height(),
			forumHeight = $('.forum-container-wrapper .section__wrap').outerHeight();

		$(".forum-container-wrapper")
			.css('height', forumHeight)
			.attr('data-_forum-'+ (forumHeight), 'top: -' + (forumHeight - realHeight) + 'px');

		$(".balloon")
			.attr('data-_forum-'+ (forumHeight), 'margin-top: -300px');

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
	distributionBalloon();

	$(window).resize(function() {
		videoResize();
        skrollrUpdate();
	});

	function distributionBalloon() {
		var $container = $('#forum-container'),
			$wrapper = $(".forum-container-wrapper"),
			numBalloon = 10,
			balloon = '<div class="balloon balloon--{color}" data-_forum="margin-top:0px;"><img src="assets/img/balloon-{color}.png" alt=""/></div>',
			balloons = [
				'red',
				'green',
				'blue',
				'orange',
				'pink',
				'lightblue'
			];

		var ww = $wrapper.width();
		var wh = $wrapper.height() + 2000;

		for (var x=1; x<=numBalloon; x++) {
			var posx = Math.round(Math.random() * ww)-100;
			var posy = Math.round(Math.random() * wh);

			$container.prepend($(balloon.replace(/\{color\}/g, balloons[Math.floor(Math.random()*balloons.length)])).css("top", posy + "px").css("left", posx + "px"));
		}
	}


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

				if ($body.scrollTop() >= $window.height() * 14) {
					clearInterval(autoscroll);
				}
			}, 50);
		} else {
			clearInterval(autoscroll);
		}
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

		$body.scrollTop($window.height() * delta);

		return false;
	});

	$('.numerals__carousel').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		slide: '.item',
		prevArrow: '<span class="slick-prev-icon icon icon-left-orange"></span>',
		nextArrow: '<span class="slick-next-icon icon icon-right-orange"></span>'
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		animateCouner();
	});

	var animateCouner = function() {
		var options = {
			useEasing : true,
			useGrouping : true,
			separator : ' ',
			decimal : '.',
			prefix : '',
			suffix : ''
		};

		$('.numerals__digit').each(function() {
			var $target = $(this),
				start = $target.data('counter-start') || 0,
				end = $target.data('counter-end') || 0,
				duration = $target.data('counter-duration') || 2.5,
				counter = new countUp(this, start, end, 0, duration, options);

			counter.start();
		});
	};

	animateCouner();

	var essays = [
		{
			id: 1,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. �? не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 2,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. �? не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 3,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. �? не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 4,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. �? не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 5,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. �? не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 6,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. �? не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 7,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. �? не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 8,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. �? не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		}
	];

	var congratulations = [
		{
			id: 1,
			photo: 'assets/img/person-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			video: '',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 2,
			photo: 'assets/img/person-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			video: '',
			text: 'Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 3,
			photo: 'assets/img/person-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			video: '',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 4,
			photo: 'assets/img/person-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			video: '',
			text: 'Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		}
	];

	var forum = [
		{
			id: 1,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 2,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег.'
		},
		{
			id: 3,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 4,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 5,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег.'
		},
		{
			id: 6,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег.'
		},
		{
			id: 7,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 8,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 9,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: '�?зменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег.'
		}
	];

	// Main Application
    var Router = Backbone.Router.extend({
        routes: {
            "": "home",
            "video": "showVideo",
            "greeting/team/:id": "showEssays",
            "greeting/executive/:id": "showCongratulations"
        },

		current: function() {
			var Router = this,
				fragment = Backbone.history.fragment,
				routes = _.pairs(Router.routes),
				route = null, params = null, matched;

			matched = _.find(routes, function(handler) {
				route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
				return route.test(fragment);
			});

			if(matched) {
				// NEW: Extracts the params using the internal
				// function _extractParameters
				params = Router._extractParameters(route, fragment);
				route = matched[1];
			}

			return {
				route : route,
				fragment : fragment,
				params : params
			};
		}
    });

    var App = {
        Models: {},
        Collections: {},
        Views: {},

		Events: _.extend(Backbone.Events, {}),

        start: function(data) {
			this.router = new Router();
            var BaseView = new this.Views.BaseView();

            //Backbone.history.start({pushState: true});
            Backbone.history.start();
        },

        navigate: function(route) {
            this.router.navigate(route, {
                trigger: true
            });
        }
    };

    App.Views.BaseView = Backbone.View.extend({
        el: $('body'),

        events: {
            "click .video"   : "showVideoModal"
        },

        initialize: function() {

			this.modal = new App.Views.ModalView();
            this.video = null;

			$('.app').html(this.modal.render().el);

			videojs("home-video", {
				controlBar: {
					fullscreenToggle: false,
					muteToggle: false,
					currentTimeDisplay: false,
					timeDivider: false,
					durationDisplay: false,
					remainingTimeDisplay: false,
					volumeControl: {
						volumeBar: false
					},
					volumeLevel: {
						volumeHandle: false
					}
				}
			}, function() {

			});

			App.router.on('route:home', _.bind(function() {

			}, this));

			App.router.on('route:showVideo', _.bind(function() {
                if (this.video) {
                    this.video.dispose();
                    this.video = null;
                }

				this.modal.setContent($('#video-modal-template').html());
				this.modal.open();

                this.video = videojs("video", {
					controlBar: {
						fullscreenToggle: false,
						muteToggle: false,
						currentTimeDisplay: false,
						timeDivider: false,
						durationDisplay: false,
						remainingTimeDisplay: false,
						volumeControl: {
							volumeBar: false
						},
						volumeLevel: {
							volumeHandle: false
						}
					}
				}, function() {

                });
			}, this));

			App.router.on('route:showEssays', _.bind(function(id) {
				this.modal.wait(true);

				if (this.essays.length) {
					this.modal.setContent(this.getEssaysHtmlById(id));
					this.modal.wait(false);
				} else {
					this.on('essaysReady', function() {
						this.modal.setContent(this.getEssaysHtmlById(id));
						this.modal.wait(false);
					});
				}

				this.modal.open(true);
			}, this));

			App.router.on('route:showCongratulations', _.bind(function(id) {
				this.modal.wait(true);

				if (this.congratulations.length) {
					this.modal.setContent(this.getCongratulationsHtmlById(id));
					this.modal.wait(false);
				} else {
					this.on('essaysReady', function() {
						this.modal.setContent(this.getCongratulationsHtmlById(id));
						this.modal.wait(false);
					});
				}

				this.modal.open(true);
			}, this));

			App.Events.on('modal:navigate', _.bind(function(direction) {
				var curRoute = App.router.current();

				if (curRoute.route === 'showCongratulations') {

					var id = curRoute.params[0],
						index = this.congratulations.indexOf(this.congratulations.get(id)),
						size = this.congratulations.size() - 1;

					if (direction === 'left') {
						if ((index - 1) >= 0) {
							index = index-1;
						} else {
							index = size;
						}
					} else {
						if ((index + 1) <= size) {
							index = index+1;
						} else {
							index = 0;
						}
					}
					App.navigate('/greeting/executive/' + this.congratulations.at(index).get('id'));

				} else if (curRoute.route === 'showEssays') {

					var id = curRoute.params[0],
						index = this.essays.indexOf(this.essays.get(id)),
						size = this.essays.size() - 1;

					if (direction === 'left') {
						if ((index - 1) >= 0) {
							index = index-1;
						} else {
							index = size;
						}
					} else {
						if ((index + 1) <= size) {
							index = index+1;
						} else {
							index = 0;
						}
					}

					App.navigate('/greeting/team/' + this.essays.at(index).get('id'));
				}
			}, this));

			// Essays
			this.$essays = this.$('.employee__carousel');

			this.essays = new App.Collections.Essays();
			this.essaysTpl = _.template($('#essays-template').html());
			this.essaysItemTpl = _.template($('#essays-item-template').html());

			this.listenTo(this.essays, 'reset', this.addEssays);

			this.essays.reset(essays);

			// Congratulations
			this.$congratulations = this.$('.person__carousel');
			this.$video = this.$('.video__carousel');
			this.congratulations = new App.Collections.Congratulations();
			this.congratulationsItemTpl = _.template($('#congratulations-item-template').html());
			this.congratulationsVideoItemTpl = _.template($('#video-item-template').html());

			this.listenTo(this.congratulations, 'reset', this.addCongratulations);

			this.congratulations.reset(congratulations);

			// Forum
			this.$forum = this.$('#forum-container .forum');
			this.forum = new App.Collections.Forum();
			this.forumItemTpl = _.template($('#forum-item-template').html());

			this.listenTo(this.forum, 'reset', this.addForum);

			this.forum.reset(forum);
        },

		addEssays: function() {
			var html = '';

			this.$essays
				.addClass('wait')
				.empty();

			this.essays.each(function(item, index) {
				html += this.essaysItemTpl(item.toJSON());
				if ((index + 1) % 4 === 0) {
					this.$essays.append(this.essaysTpl({item: html}));
					html = '';
				}
			}, this);

			if (html) {
				this.$essays.append(this.essaysTpl({item: html}));
				html = '';
			}

			this.$essays.removeClass('wait');
			this.$essays.slick({
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				slide: '.item',
				prevArrow: '<span class="slick-prev-icon icon icon-left-orange"></span>',
				nextArrow: '<span class="slick-next-icon icon icon-right-orange"></span>'
			});

			this.trigger('essaysReady');
		},

		addCongratulations: function() {
			this.$congratulations
				.addClass('wait')
				.empty();

			this.$video
				.addClass('wait')
				.empty();

			this.congratulations.each(function(item, index) {
				this.$congratulations.append(this.congratulationsItemTpl(item.toJSON()));
				this.$video.append(this.congratulationsVideoItemTpl(item.toJSON()));
			}, this);

			this.trigger('congratulationsReady');

			this.$congratulations.removeClass('wait');
			this.$congratulations.slick({
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				slide: '.item',
				prevArrow: '<span class="slick-prev-icon icon icon-left-orange"></span>',
				nextArrow: '<span class="slick-next-icon icon icon-right-orange"></span>'
			});

			this.$video.removeClass('wait');
			this.$video.slick({
				centerMode: true,
				centerPadding: '60px',
				slidesToShow: 3,
				slidesToScroll: 1,
				slide: '.item',
				prevArrow: '<span class="slick-prev-icon icon icon-left-orange"></span>',
				nextArrow: '<span class="slick-next-icon icon icon-right-orange"></span>'
			});

		},

		addForum: function() {
			this.$forum.empty();
			this.forum.each(function(item, index) {

				//items.push(this.forumItemTpl(item.toJSON()));
				this.$forum.append(this.forumItemTpl(item.toJSON()));

			}, this);

			this.$forum.isotope({
				itemSelector: '.forum__item',
				layoutMode: 'masonry'
			});

			skrollrUpdate();

			//forumPane
			//	.isotope()
			//	.append( items )
			//	.isotope( 'appended', items )
			//	.isotope('layout');
		},

		getEssaysHtmlById: function(id) {
			var model = this.essays.get(id),
				template = _.template($('#essays-modal-template').html());

			return template(model.toJSON());
		},

		getCongratulationsHtmlById: function(id) {
			var model = this.congratulations.get(id),
				template = _.template($('#congratulations-modal-template').html());

			return template(model.toJSON());
		}
    });

	App.Views.ModalView = Backbone.View.extend({
		template: _.template($('#modal-template').html()),

		events: {
			"click .modal__close"   	: "close",
			"click .modal__nav"   		: "navigate"
		},

		initialize: function() {
			this.close();
		},

		render: function() {
			this.$el.html(this.template(this.options));
			return this;
		},

		wait: function(state) {
			if (state) {
				this.$el.addClass('modal--wait');
			} else {
				this.$el.removeClass('modal--wait');
			}
		},

		setContent: function(content) {
			this.$('.modal__container').html(content);
			return this;
		},

		open: function(withNav) {
			this.$el.removeClass('hidden');
			this.$('.modal').addClass('modal--open');

			if (withNav) {
				this.$('.modal').addClass('modal--with-nav');
			}

			$('.social-likes').socialLikes({
				url: location.href,
				title: 'Beautiful “like” buttons with counters for popular social networks'
			});
		},

		close: function() {
			this.$el.addClass('hidden');
			this.$('.modal')
				.removeClass('modal--open')
				.removeClass('modal--with-nav');

			this.afterClose();
		},

		navigate: function(event) {
			var $target = $(event.currentTarget);

			App.Events.trigger('modal:navigate', $target.data('direction'));
		},

		afterClose: function() {
			App.navigate('/');
		}
	});

	App.Models.Employee = Backbone.Model.extend({

	});

	App.Collections.Essays = Backbone.Collection.extend({
		model: App.Models.Employee
	});

	App.Collections.Congratulations = Backbone.Collection.extend({
		model: App.Models.Employee
	});

	App.Collections.Forum = Backbone.Collection.extend({
		model: App.Models.Employee
	});

    App.start();

});