/*!
* File name:   main.js
* Description: Sets main method used throughout the site
* Version:     1.0
*/


(function($) {

	// Define global ADT namespace
	window.ADT = window.ADT || {};

	window.ADT.app = (function (my, $) {

		my.production = false;	// switch for production and development variables

		pubsub = {
			form: {
				change: 'form.change', // Broadcasts a form change
				show: 'form.show', // Broadcasts a form show
				open: 'form.open', // Broadcasts a form open
				close: 'form.close' // // Broadcasts a form close
			},
			liveperson: {
				status: 'liveperson.status' // Broadcasts the liveperson status
			},
			expandable: {
				open: 'expandable.open', // Broadcasts when an expandable box is opened
				close: 'expandable.close', // Broadcasts when an expandable box is closed
				toggle: 'expandable.toggle'  // Broadcasts when an expandable box is closed
			}
		};

		// ### pubsub()
		// Public getter for pubsub
		my.pubsub = function () {
			return pubsub;
		};

		// ### liveperson()
		// Public method for liveperson integration
		my.liveperson = function(status) {
			$.publish("liveperson.status", status);

			$("#chatbutton").click(function () {
				$("#lpButtonSales").trigger("click");
			});

			return status;
		};

		// ### getQueryParameters()
		// Gets URL query parameters
		my.getQueryParameters = function (param) {
			var result = {};

			if (window.location.search){
				// split up the query string and store in an associative array
				var params = window.location.search.slice(1).split("&");
				for (var i = 0; i < params.length; i++){
					var tmp = params[i].split("=");
					result[tmp[0]] = unescape(tmp[1]);
				}
			}

			return result;
		};

		// ### setExternalLinks()
		// Sets external links to open in a new window. Currently only set for PDFs
		my.setExternalLinks = function () {
			$('a[href*=".pdf"]').attr('target', '_blank');
		};

		// ### init()
		// Initizlies generic site methods
		my.init = function () {
			my.setExternalLinks();
		};

		return my;

	} (window.ADT.app || {}, jQuery));
})();

jQuery(document).ready(function ($) {
	ADT.app.init();
});
