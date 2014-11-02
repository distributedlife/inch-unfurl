var expect = require('expect');
var sinon = require('sinon');
var assert = require('assert');

var unfurl = require('../unfurl');

var a = sinon.spy();
var b = sinon.spy();

describe("unfurling an array", function() {
	beforeEach(function() {
		a.reset();
		b.reset();
	});

	describe("when given an array", function() {
		it("should return a function that calls all the things", function() {
			var unfurled = unfurl.array([a, b]);
			unfurled();

			assert(a.called);
			assert(b.called);
		});
	});
	
	describe("when given a function", function() {
		it("should return the function", function() {
			var unfurled = unfurl.array(a);
			unfurled();

			assert(a.called);
			assert(!b.called);
		});
	})
	

	describe("with a guarentee", function() {
		it("should return an empty function when nothing is given", function() {
			var unfurled = unfurl.arrayWithGuarantee();
			unfurled();

			assert(!a.called);
			assert(!b.called);
		});
	});

	describe("without a guarentee", function() {
		it("should return what it was given", function() {
			var unfurled = unfurl.array();
			expect(unfurled).toBe(undefined);

			assert(!a.called);
			assert(!b.called);
		});
	});
});