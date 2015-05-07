'use strict';

var expect = require('expect');
var sinon = require('sinon');

var unfurl = require('../src/unfurler');

var a = sinon.spy();
var b = sinon.spy();

describe('unfurling an array', function() {
	beforeEach(function() {
		a.reset();
		b.reset();
	});

	describe('when given an array', function() {
		it('should return a function that calls all the things', function() {
			var unfurled = unfurl.array([a, b]);
			unfurled();

			expect(a.called).toBe(true);
			expect(b.called).toBe(true);
		});

		it('should pass all arguments through', function () {
			var unfurled = unfurl.array([a, b]);
			unfurled(1, 2, 3);

			expect(a.firstCall.args).toEqual([1, 2, 3]);
			expect(b.firstCall.args).toEqual([1, 2, 3]);
		});
	});

	describe('when given a function', function() {
		it('should return the function', function() {
			var unfurled = unfurl.array(a);
			unfurled();

			expect(a.called).toBe(true);
			expect(b.called).toBe(false);
		});

		it('should pass all arguments through', function () {
			var unfurled = unfurl.array(a);
			unfurled(1, 2);

			expect(a.firstCall.args).toEqual([1, 2]);
		});
	});

	describe('with a guarentee', function() {
		it('should return an empty function when nothing is given', function() {
			var unfurled = unfurl.arrayWithGuarantee();
			unfurled();

			expect(a.called).toBe(false);
			expect(b.called).toBe(false);
		});
	});

	describe('without a guarentee', function() {
		it('should return what it was given', function() {
			var unfurled = unfurl.array();
			expect(unfurled).toBe(undefined);

			expect(a.called).toBe(false);
			expect(b.called).toBe(false);
		});
	});
});