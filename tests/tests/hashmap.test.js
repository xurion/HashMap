/*jslint maxerr: 50, indent: 4, es5: true*/
/*globals document, chai, describe, it, HashMap*/

describe('HashMap', function () {
    'use strict';

    it('should be an Object', function () {
        chai.assert.isObject(HashMap);
    });

    describe('parse()', function () {
        it('should be a function', function () {
            chai.assert.isFunction(HashMap.parse);
        });
        it('should return an Object of key/value pairs based on the given hash argument', function () {
            chai.assert.deepEqual(HashMap.parse('#key=value'), {
                key: 'value'
            });
            chai.assert.deepEqual(HashMap.parse('#key=value&a=b'), {
                key: 'value',
                a: 'b'
            });
        });
        it('should return an empty Object if no key/value pairs are found in the given hash argument', function () {
            chai.assert.deepEqual(HashMap.parse('#'), {});
            chai.assert.deepEqual(HashMap.parse('#string'), {});
        });
        it('should return an empty Object if the hash argument is not defined as a string', function () {
            chai.assert.deepEqual(HashMap.parse(), {});
            chai.assert.deepEqual(HashMap.parse(1), {});
        });
    });

    describe('isElement()', function () {
        it('should be a function', function () {
            chai.assert.isFunction(HashMap.isElement);
        });
        it('should return false if the element argument is not defined', function () {
            chai.assert.isFalse(HashMap.isElement());
        });
        it('should return false if the element argument is not an element', function () {
            chai.assert.isFalse(HashMap.isElement('string'));
            chai.assert.isFalse(HashMap.isElement(123));
        });
        it('should return true if the element argument is defined as an element', function () {
            var p = document.createElement('p');
            chai.assert.isTrue(HashMap.isElement(p));
        });
    });

    describe('isFormInput()', function () {
        it('should be a function', function () {
            chai.assert.isFunction(HashMap.isFormInput);
        });
        it('should return false if the element argument is not defined', function () {
            chai.assert.isFalse(HashMap.isFormInput());
        });
        it('should return false if the element argument is not an input[type="text"], input[type="radio"], input[type="checkbox"] or textarea', function () {
            var inputButton = document.createElement('input'),
                button = document.createElement('button');

            inputButton.type = 'button';
            chai.assert.isFalse(HashMap.isFormInput(inputButton));
            chai.assert.isFalse(HashMap.isFormInput(button));
        });
    });

    describe('isForm()', function () {
        it('should be a function', function () {
            chai.assert.isFunction(HashMap.isForm);
        });
        it('should return true if the element argument is a form element', function () {
            var form = document.createElement('form');
            chai.assert.isTrue(HashMap.isForm(form));
        });
        it('should return false if the element argument is not defined', function () {
            chai.assert.isFalse(HashMap.isForm());
        });
        it('should return false if the element argument is not a form element', function () {
            var p = document.createElement('p');
            chai.assert.isFalse(HashMap.isForm(p));
            chai.assert.isFalse(HashMap.isForm('string'));
            chai.assert.isFalse(HashMap.isForm(123));
        });
    });

    describe('getFieldsFromForm()', function () {
        it('should be a function', function () {
            chai.assert.isFunction(HashMap.getFieldsFromForm);
        });
        it('should return an empty array if the form argument is not a Form element', function () {
            var p = document.createElement('p');
            chai.assert.deepEqual(HashMap.getFieldsFromForm(p), []);
        });
        it('should return an empty array if the form argument is not defined', function () {
            chai.assert.deepEqual(HashMap.getFieldsFromForm(), []);
        });
        it('should return an array of fields from the form argument in order', function () {
            var form = document.createElement('form');
            form.innerHTML = '<input type="text"><textarea></textarea><input type="checkbox"><input type="radio">';
            chai.assert.strictEqual(HashMap.getFieldsFromForm(form).length, 4);
            chai.assert.strictEqual(HashMap.getFieldsFromForm(form)[0].type, 'text');
            chai.assert.strictEqual(HashMap.getFieldsFromForm(form)[1].tagName, 'TEXTAREA');
            chai.assert.strictEqual(HashMap.getFieldsFromForm(form)[2].type, 'checkbox');
            chai.assert.strictEqual(HashMap.getFieldsFromForm(form)[3].type, 'radio');
        });
        it('should not return input elements that are set to type="submit" or type="button"', function () {
            var form = document.createElement('form');
            form.innerHTML = '<input type="text"><input type="button"><input type="submit">';
            chai.assert.strictEqual(HashMap.getFieldsFromForm(form).length, 1);
            chai.assert.strictEqual(HashMap.getFieldsFromForm(form)[0].type, 'text');
        });
    });

    describe('buildHash()', function () {
        it('should be a Function', function () {
            chai.assert.isFunction(HashMap.buildHash);
        });
        it('should return a hash string based on the values argument if it is an Object', function () {
            chai.assert.strictEqual(HashMap.buildHash({
                key: 'value'
            }), '#key=value');
            chai.assert.strictEqual(HashMap.buildHash({
                key: 'value',
                a: 'b'
            }), '#key=value&a=b');
        });
        it('should return a hash string based on the values argument if it is a Form', function () {
            var form = document.createElement('form');
            form.innerHTML = '<input type="text" name="field" value="fieldValue">';
            chai.assert.strictEqual(HashMap.buildHash(form), '#field=fieldValue');

            form.innerHTML = form.innerHTML + '<input type="checkbox" checked="checked" value="checkboxValue" name="checkbox">';

            chai.assert.strictEqual(HashMap.buildHash(form), '#field=fieldValue&checkbox=checkboxValue');

            form.innerHTML = form.innerHTML + '<input type="radio" checked="checked" value="radioValue" name="radio">';
            chai.assert.strictEqual(HashMap.buildHash(form), '#field=fieldValue&checkbox=checkboxValue&radio=radioValue');
        });
        it('shoud not include fields that do not have a name argument', function () {
            var form = document.createElement('form');
            form.innerHTML = '<input type="text" name="field" value="fieldValue"><input type="text" value="fieldValue">';
            chai.assert.strictEqual(HashMap.buildHash(form), '#field=fieldValue');
        });
        it('should return a single hash character if there are no key/values in the values argument if it is an Object', function () {
            chai.assert.strictEqual(HashMap.buildHash({}), '#');
        });
        it('should return a single hash character if there are no fields in the values argument if it is a Form', function () {
            var form = document.createElement('form');
            chai.assert.strictEqual(HashMap.buildHash(form), '#');
        });
        it('should return a single hash character if the values argument is not defined as an Object or Form element', function () {
            chai.assert.strictEqual(HashMap.buildHash('string'), '#');
        });
        it('should return a single hash character if the values argument is not defined', function () {
            chai.assert.strictEqual(HashMap.buildHash(), '#');
        });
    });

});