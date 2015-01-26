define(['jquery', 'socialLikes'], function($, socialLikes) {
	'use strict';

	var banki = window.banki;

	return function(options) {

		if (typeof options === 'undefined') {
			if (banki.env.devMode) {
				console.error('social-likes-block: no options');
			}
		} else {

			var $container;

			if (options.container instanceof $) {
				$container = options.container;
			} else if (typeof options.container == 'string') {
				$container = $(options.container);
			}

//			$container.socialLikes({
////				url: 'https://github.com/sapegin/social-likes/',
////				title: 'Beautiful “like” buttons with counters for popular social networks',
//				counters: true,
//				singleTitle: 'Share it!'
//			});

		}

	};

});