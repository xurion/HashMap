/*globals document, expect, describe, it, HashMap*/

describe('HashMap', function () {

    'use strict';

    describe('parse()', function () {
        it('should return an Object of key/value pairs based on the given hash argument', function () {
            expect(HashMap.parse('#key=value')).toEqual({
                key: 'value'
            });
            expect(HashMap.parse('#key=value&a=b')).toEqual({
                key: 'value',
                a: 'b'
            });
        });
        it('should return an empty Object if no key/value pairs are found in the given hash argument', function () {
            expect(HashMap.parse('#')).toEqual({});
            expect(HashMap.parse('#string')).toEqual({});
        });
        it('should return an empty Object if the hash argument is not defined as a string', function () {
            expect(HashMap.parse()).toEqual({});
            expect(HashMap.parse(1)).toEqual({});
        });
    });

    describe('isElement()', function () {
        it('should return false if the element argument is not defined', function () {
            expect(HashMap.isElement()).toBe(false);
        });
        it('should return false if the element argument is not an element', function () {
            expect(HashMap.isElement('string')).toBe(false);
            expect(HashMap.isElement(123)).toBe(false);
        });
        it('should return true if the element argument is defined as an element', function () {
            var p = document.createElement('p');
            expect(HashMap.isElement(p)).toBe(true);
        });
    });

    describe('isFormInput()', function () {
        it('should return false if the element argument is not defined', function () {
            expect(HashMap.isFormInput()).toBe(false);
        });
        it('should return false if the element argument is not an input[type="text"], input[type="radio"], input[type="checkbox"] or textarea', function () {
            var inputButton = document.createElement('input'),
                button = document.createElement('button');

            inputButton.type = 'button';
            expect(HashMap.isFormInput(inputButton)).toBe(false);
            expect(HashMap.isFormInput(button)).toBe(false);
        });
    });

    describe('isForm()', function () {
        it('should return true if the element argument is a form element', function () {
            var form = document.createElement('form');
            expect(HashMap.isForm(form)).toBe(true);
        });
        it('should return false if the element argument is not defined', function () {
            expect(HashMap.isForm()).toBe(false);
        });
        it('should return false if the element argument is not a form element', function () {
            var p = document.createElement('p');
            expect(HashMap.isForm(p)).toBe(false);
            expect(HashMap.isForm('string')).toBe(false);
            expect(HashMap.isForm(123)).toBe(false);
        });
    });

    describe('getFieldsFromForm()', function () {
        it('should return an empty array if the form argument is not a Form element', function () {
            var p = document.createElement('p');
            expect(HashMap.getFieldsFromForm(p)).toEqual([]);
        });
        it('should return an empty array if the form argument is not defined', function () {
            expect(HashMap.getFieldsFromForm()).toEqual([]);
        });
        it('should return an array of fields from the form argument in order', function () {
            var form = document.createElement('form');
            form.innerHTML = '<input type="text"><textarea></textarea><input type="checkbox"><input type="radio">';
            expect(HashMap.getFieldsFromForm(form).length).toEqual(4);
            expect(HashMap.getFieldsFromForm(form)[0].type).toEqual('text');
            expect(HashMap.getFieldsFromForm(form)[1].tagName).toEqual('TEXTAREA');
            expect(HashMap.getFieldsFromForm(form)[2].type).toEqual('checkbox');
            expect(HashMap.getFieldsFromForm(form)[3].type).toEqual('radio');
        });
        it('should not return input elements that are set to type="submit" or type="button"', function () {
            var form = document.createElement('form');
            form.innerHTML = '<input type="text"><input type="button"><input type="submit">';
            expect(HashMap.getFieldsFromForm(form).length).toEqual(1);
            expect(HashMap.getFieldsFromForm(form)[0].type).toEqual('text');
        });
    });

    describe('buildHash()', function () {
        it('should return a hash string based on the values argument if it is an Object', function () {
            expect(HashMap.buildHash({
                key: 'value'
            })).toEqual('#key=value');
            expect(HashMap.buildHash({
                key: 'value',
                a: 'b'
            })).toEqual('#key=value&a=b');
        });
        it('should return a hash string based on the values argument if it is a Form', function () {
            var form = document.createElement('form');
            form.innerHTML = '<input type="text" name="field" value="fieldValue">';
            expect(HashMap.buildHash(form)).toEqual('#field=fieldValue');

            form.innerHTML = form.innerHTML + '<input type="checkbox" checked="checked" value="checkboxValue" name="checkbox">';

            expect(HashMap.buildHash(form)).toEqual('#field=fieldValue&checkbox=checkboxValue');

            form.innerHTML = form.innerHTML + '<input type="radio" checked="checked" value="radioValue" name="radio">';
            expect(HashMap.buildHash(form)).toEqual('#field=fieldValue&checkbox=checkboxValue&radio=radioValue');
        });
        it('shoud not include fields that do not have a name argument', function () {
            var form = document.createElement('form');
            form.innerHTML = '<input type="text" name="field" value="fieldValue"><input type="text" value="fieldValue">';
            expect(HashMap.buildHash(form)).toEqual('#field=fieldValue');
        });
        it('should return a single hash character if there are no key/values in the values argument if it is an Object', function () {
            expect(HashMap.buildHash({})).toEqual('#');
        });
        it('should return a single hash character if there are no fields in the values argument if it is a Form', function () {
            var form = document.createElement('form');
            expect(HashMap.buildHash(form)).toEqual('#');
        });
        it('should return a single hash character if the values argument is not defined as an Object or Form element', function () {
            expect(HashMap.buildHash('string')).toEqual('#');
        });
        it('should return a single hash character if the values argument is not defined', function () {
            expect(HashMap.buildHash()).toEqual('#');
        });
    });
});
