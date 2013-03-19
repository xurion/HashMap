#HashMap

JavaScript helper to construct/deconstruct URL hashmaps.

## Examples

### Construct a hashmap from an Object

    var myObj = {
        key: 'value',
        key2: 'value2'
    };
    HashMap.buildHash(myObj);

Output: "#key=value&key2=value2"

### Construct a hashmap from a form element

    var form = document.createElement('form');
    form.innerHTML = '<input type="text" name="field" value="value"><textarea name="field2">value2</textarea>';
    HashMap.buildHash(form);

Output: "#field=value&field2=value2"

### Parse a hash string to an Object

    HashMap.parse('#key=value&key2=value2');

Output: Object {key: "value", key2: "value2"}