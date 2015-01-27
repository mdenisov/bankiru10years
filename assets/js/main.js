
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
		//s.constants('section1', 700);
		console.log(($body.height() - $(".forum-container").outerHeight()) / $(".forum-container").offset().top);

		console.log(($body.height()) / $(".forum-container").offset().top);

		//s.get().setConstants({
		//	footer: ($body.height() / $(".forum-container").offset().top) * 100 + 'p'
		//});

		var realHeight = $window.height(),
			forumHeight = $('.forum-container-wrapper .section__wrap').outerHeight();

		$(".forum-container-wrapper")
			.css('height', forumHeight)
			.attr('data-_forum-'+ (forumHeight), 'top: -' + (forumHeight - realHeight) + 'px');

		//console.log($(".footer-container").offset().top);
		//
		//$(".footer-container")
		//	.attr('data-'+ (($body.height() / $(".footer-container").offset().top) * 100) + 'p', 'top: 0');

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

	var essays = [
		{
			id: 1,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. И не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 2,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. И не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 3,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. И не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 4,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. И не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 5,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. И не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 6,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. И не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 7,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. И не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		},
		{
			id: 8,
			photo: 'assets/img/employee-photo.png',
			name: 'Наталья Романова',
			subname: 'главный редактор портала Банки.ру',
			text: 'Мне всегда везло с работой. За все свои уже почти 16 лет в профессии я могу сказать, что мне нигде не было плохо. Поэтому, когда в марте 2009 года Филипп предложил мне перейти в Банки.ру, я знала, что это будет хорошим местом для меня. Я ошибалась – это стало лучшим моим местом работы. Здесь не просто дружелюбная и очень человечная атмосфера в коллективе. Здесь семья. Работая на Банки.ру каждый из нас, будь то самый что ни на есть «топ-топ» или вчерашний студент только-только пришедший в компанию, знает: что бы в жизни не случилось, тебя не бросят, не выбросят на помойку как отработанный материал, тебе всегда помогут. И не потому что ты в будущем можешь принести много денег компании или сделал это раньше, а просто потому что ты – Человек.'
		}
	];

	var congratulations = [
		{
			id: 1,
			photo: 'assets/img/person-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: 'Изменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 2,
			photo: 'assets/img/person-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: 'Изменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		}
	];

	var forum = [
		{
			id: 1,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: 'Изменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 2,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: 'Изменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег.'
		},
		{
			id: 3,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: 'Изменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 4,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: 'Изменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег. Выставка, пренебрегая деталями, отталкивает медиаплан, оптимизируя бюджеты. Размещение интуитивно отталкивает рыночный традиционный канал, расширяя долю рынка. Коммуникация развивает медиавес, невзирая на действия конкурентов. В общем, продукт ускоряет медиавес.'
		},
		{
			id: 5,
			photo: 'assets/img/forum-photo.png',
			name: 'Олег Тиньков',
			subname: 'глава банка «Тинькофф. Кредитные Системы»',
			text: 'Изменение глобальной стратегии отражает принцип восприятия, опираясь на опыт западных коллег.'
		}
	];


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
			this.router = new Router();
            var BaseView = new this.Views.BaseView();

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

			this.modal = new App.Views.ModalView();

			$('.app').html(this.modal.render().el);

			App.router.on('route:home', _.bind(function() {

			}, this));

			App.router.on('route:showVideo', _.bind(function() {
				this.modal.setContent($('#video-modal-template').html());
				this.modal.open();
			}, this));

			App.router.on('route:showEssays', _.bind(function(id) {
				var model = this.essays.get(id),
					template = _.template($('#essays-modal-template').html());

				this.modal.setContent(template(model.toJSON()));
				this.modal.open();
			}, this));

			this.$essays = this.$('#essays-carousel .carousel-inner');
			this.$congratulations = this.$('#congratulations-carousel .carousel-inner');
			this.$forum = this.$('#forum-container .forum');

			this.essays = new App.Collections.Essays(essays);
			this.essaysTpl = _.template($('#essays-template').html());
			this.essaysItemTpl = _.template($('#essays-item-template').html());

			this.listenTo(this.essays, 'reset', this.addEssays);

			this.congratulations = new App.Collections.Congratulations(congratulations);
			this.congratulationsItemTpl = _.template($('#congratulations-item-template').html());

			this.listenTo(this.congratulations, 'reset', this.addCongratulations);

			this.forum = new App.Collections.Forum(forum);
			this.forumItemTpl = _.template($('#forum-item-template').html());

			this.listenTo(this.forum, 'reset', this.addForum);

			this.addEssays();
			this.addCongratulations();
			this.addForum();

        },

		addEssays: function() {
			var html = '';

			this.$essays.empty();
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

			this.$essays
				.children()
				.eq(0)
				.addClass('active');
		},

		addCongratulations: function() {
			this.$congratulations.empty();
			this.congratulations.each(function(item, index) {

				this.$congratulations.append(this.congratulationsItemTpl(item.toJSON()));

			}, this);

			this.$congratulations
				.children()
				.eq(0)
				.addClass('active');
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
		}


    });

	App.Views.ModalView = Backbone.View.extend({
		template: _.template($('#modal-template').html()),

		events: {
			"click .modal__close"   	: "close",
			//"click .modal__wrapper"   	: "close"
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

			$('.social-likes').socialLikes();

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