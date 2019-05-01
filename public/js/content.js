// var $ = require('jquery');//,
	// faker = require('faker/locale/en_US');

// var unique = require("unique-selector").default;
// Vue.config.devtools = false;
//
// var App = new Vue({
//
// 	data: {
// 		steps: [],
// 		recording: false
// 	},
//
// 	created: function () {
// 		var self = this;
//
// 		chrome.storage.local.get(null, function (items) {
// 			self.recording = items.recording || false;
//
// 			if (items.steps) {
// 				self.steps = items.steps;
// 			}
// 			self.initializeEvents();
// 		});
// 	},
//
// 	methods: {
// 		initializeEvents: function () {
// 			var self = this;
//
// 			if (self.recording === true) {
// 				if (this.steps.length === 0 || this.steps[this.steps.length - 1].method !== 'click') {
// 					this.steps.push({
// 						'method': 'amOnPage',
// 						'args': [window.location.pathname]
// 					});
// 				}
// 			}
//
// 			$(document).on('blur', 'textarea, input[type!="checkbox"][type!="file"][type!="submit"]', function () {
// 				if (self.recording === true) {
// 					var clickedEl = $(this).get(0);
// 					var options = {
// 						// Array of selector types based on which the unique selector will generate
// 						selectorTypes: ["ID", "Class"]
// 					};
// 					console.log(unique);
// 					var name = unique(clickedEl, options);
// 					var value = $(this).val();
// 					self.steps.push({
// 						'method': 'fillField',
// 						'args': [name, value]
// 					});
// 				}
// 			});
//
// 			$(document).on('change', 'input[type="file"]', function () {
// 				if (self.recording === true) {
// 					var name = $(this).attr("name"),
// 						value = 'absolutePathToFile';
// 					self.steps.push({
// 						'method': 'attachFile',
// 						'args': [name, value]
// 					});
// 				}
// 			});
//
// 			$(document).on('change', 'input[type="checkbox"]', function () {
// 				if (self.recording === true) {
// 					var name = $(this).attr("name");
// 					self.steps.push({
// 						'method': 'checkOption',
// 						'args': [name]
// 					});
// 				}
// 			});
//
// 			$(document).on('click', 'input[type="submit"],button,a', function () {
// 				var clickedEl = $(this).get(0);
// 				var options = {
// 					// Array of selector types based on which the unique selector will generate
// 					selectorTypes: ["ID", "Class"]
// 				};
// 				console.log(unique);
// 				var name = unique(clickedEl, options);
// 				if (self.recording === true) {
// 					if (name === '') {
// 						name = $(this).val();
// 					}
// 					self.steps.push({
// 						'method': 'click',
// 						'args': [name]
// 					});
// 				}
// 			});
//
//
// 			$(document).on('change', 'select', function () {
// 				if (self.recording === true) {
// 					var name = $(this).attr("name"),
// 						value = $(this).val();
// 					self.steps.push({
// 						'method': 'selectOption',
// 						'args': [name, value]
// 					});
// 				}
// 			});
// 		}
// 	},
//
// 	watch: {
// 		'steps': function (val) {
// 			var self = this;
// 			chrome.storage.local.set({'steps': val, 'preserveSteps': self.preserveSteps});
// 			chrome.extension.sendMessage({
// 				'steps': val
// 			});
// 		}
// 	},
//
// });
//
//
// var clickedEl = null;

document.addEventListener("mousedown", function (event) {
	if (event.button === 2) {
		clickedEl = event.target;
	}
}, true);

chrome.extension.onRequest.addListener(function (request) {

	var method = request.method || false;
	if (method === "see") {
		App.steps.push({
			'method': 'see',
			'args': [request.text]
		});
	}
	if (method === "click") {
		var options = {
			// Array of selector types based on which the unique selector will generate
			selectorTypes: ["ID", "Class"]
		};
		var uni = unique(clickedEl, options);
		//
		// console.warn(uni, "00000", sim);
		var name = $(clickedEl).attr("name") || $(clickedEl).text().trim();
		if (name === '') {
			name = $(clickedEl).val();
		}
		App.steps.push({
			'method': 'click',
			'args': [name]
		});
	}
	if (method === "amOnPage") {
		App.steps.push({
			'method': 'amOnPage',
			'args': [window.location.pathname]
		});
	}
	if (method === "seeCurrentUrlEquals") {
		App.steps.push({
			'method': 'seeCurrentUrlEquals',
			'args': [window.location.pathname]
		});
	}
	if (method === "recording") {
		App.recording = request.value;
		chrome.storage.local.set({'steps': App.steps, 'recording': App.recording});
		if (App.recording === true && App.steps.length === 0) {
			App.steps.push({
				'method': 'resizeWindow',
				'args': [window.outerWidth, window.outerHeight]
			});
			App.steps.push({
				'method': 'amOnPage',
				'args': [window.location.pathname]
			});
		}
	}
	if (method === "clear") {
		App.recording = request.value;
		App.steps = [];
	}
	if (method === "undo") {
		App.steps.pop();
	}

	if (method === "fake") {
		var fakeData = "";

		switch (request.type) {
			case "email":
				fakeData = faker.internet.email();
				break;
			case "name":
				fakeData = faker.name.findName();
				break;
			case "firstname":
				fakeData = faker.name.firstName();
				break;
			case "lastname":
				fakeData = faker.name.lastName();
				break;
			case "word":
				fakeData = faker.lorem.words();
				break;
			case "url":
				fakeData = faker.internet.url();
				break;
		}
		$(clickedEl).val(fakeData);

		App.steps.push({
			'method': 'type',
			'faker': true,
			'args': [$(clickedEl).attr("name"), '$this->faker->' + request.type]
		});
	}

	if (method === "getSteps") {
		chrome.extension.sendMessage({
			'steps': App.steps
		});
	}
});
