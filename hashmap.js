/*jslint maxerr: 50, indent: 4*/
/*globals */

var HashMap;
(function () {
    'use strict';

    HashMap = {
        parse: function (hash) {
            var values = {},
                splitHash,
                i,
                keyValue;

            //if the hash is not a string, return an empty Object
            if (typeof hash !== 'string') {
                return values;
            }

            //strip the initial hash from the string
            hash = (hash.charAt(0) === '#') ? hash.substr(1) : hash;

            //split the hash into separate key/value pairs by ampersands
            splitHash = hash.split('&');

            //check if the split hash has values - if not, return the empty Object
            if (splitHash.length === 1 && splitHash[0].indexOf('=') === -1) {
                return values;
            }

            //loop through the key/value pairs and put them in an Object
            for (i = 0; i < splitHash.length; i = i + 1) {
                keyValue = splitHash[i].split('=');
                values[keyValue[0]] = keyValue[1];
            }

            return values;
        },

        isElement: function (element) {
            if (element === undefined) {
                return false;
            }
            return Object.prototype.hasOwnProperty.call(element, 'nodeName');
        },

        isForm: function (element) {
            return (this.isElement(element) && element.tagName === 'FORM');
        },

        isFormInput: function (element) {
            if (element === undefined) {
                return false;
            }
            return (element.nodeName === 'INPUT' && (element.type === 'text' || element.type === 'radio' || element.type === 'checkbox')) || element.nodeName === 'TEXTAREA';
        },

        getFieldsFromForm: function (form) {
            if (!this.isForm(form)) {
                return [];
            }

            var allFields = form.elements,
                i,
                fields = [];

            for (i = 0; i < allFields.length; i = i + 1) {
                if (this.isFormInput(allFields[i])) {
                    fields.push(allFields[i]);
                }
            }

            return fields;
        },

        buildHash: function (values) {
            var hash = '',
                key,
                formFields,
                formValues,
                i;

            //if the values argument is not an Object or element, just return a hash
            if (typeof values !== 'object' && !this.isElement(values)) {
                return '#';
            }

            //if values is a form element, get the values from the form fields
            if (this.isForm(values)) {
                 formFields = this.getFieldsFromForm(values);
                 formValues = {};
                 for (i = 0; i < formFields.length; i = i + 1) {
                     if (formFields[i].name !== '') {
                        formValues[formFields[i].name] = formFields[i].value;
                     }
                 }
                 values = formValues;
            }

            //loop through the values and construct the has string
            for (key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    hash = hash + '&' + key + '=' + values[key];
                }
            }

            //strip off the first character, as it is an ampersand
            hash = hash.substr(1);

            //return the hash string with a has character prepended to it
            return '#' + hash;
        }
    };
}());