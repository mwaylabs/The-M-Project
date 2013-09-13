(function() {

    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

    /* Extend underscore */
    _.mixin({
        tpl: function( text, data, settings ) {
            var render;
            settings = _.defaults({}, settings, _.templateSettings);

            // Combine delimiters into one regular expression via alternation.
            var matcher = new RegExp([
                (settings.escape || noMatch).source,
                (settings.interpolate || noMatch).source,
                (settings.evaluate || noMatch).source
            ].join('|') + '|$', 'g');

            /*START MOD*/

            // add a cssClass to every template so stickit can use it as binding.

            // the characters = and < are problematic ones converting a string to an dom object and back - so replace them with other stuff
            text = text.replace(/<%/g, '@%').replace(/%>/g, '%@');
            text = text.replace(/@%=/g, '@%@');
            // convert the template string to jQuery object
            var obj = $(text);

            // text to produce and replace later with the originial text - just a puffer variable
            var s = '';

            //loop over every template element recursivly
            var convert = function($obj){
                _.each($obj, function(elem){
                    //is the current element a "string" node convert it to an div

                    if(!elem.tagName){
                        var div = document.createElement('div');
                        div.textContent = elem.textContent;
                        elem = div;
                    }

                    var attributeName = '';

                    var compare = elem.outerHTML
                    if(elem.children.length){
                        var compare = elem.outerHTML.replace(elem.innerHTML,'');
                    }

                    // elem outer prints the source code representation of the dom element with special characters encoded
                    // decode the special characters by replacing them
                    // use the underscorpe matcher regex to find the given <%= => template and it's identifier and write it into cssClass
                    //e.q. <%= firstname => writes the string 'firstname' into cssClass
                    compare.replace(matcher, function(match, escape, interpolate) {
                        if(interpolate){
                            attributeName = interpolate.replace(/\s/g, '');
                        }
                        return match;
                    });

                    if(attributeName){
                        // add the cssClass name from the template to the current element
                        // so stickit can use it
                        //                        elem.classList.add(cssClass);
                        if(elem.tagName === 'INPUT'){
                            elem.setAttribute('data-binding', 'input-' + attributeName);
                        } else {
                            elem.setAttribute('data-binding', attributeName);
                        }

                    }

                    // if there are nested objects inside the element call this function recursive
                    if($obj.children()){
                        return convert($obj.children());
                    }
                });
            };

            // start the process
            convert(obj);
            // overwrite the originial template text with the generated one
            text = text.replace(/@%@/g, '<%=');
            text = text.replace(/@%/g, '<%').replace(/%@/g, '%>');


            /*END MOD*/

            // Compile the template source, escaping string literals appropriately.
            var index = 0;
            var source = "__p+='";
            text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset)
                    .replace(escaper, function(match) { return '\\' + escapes[match]; });

                if (escape) {
                    source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
                }
                if (interpolate) {
                    source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                }
                if (evaluate) {
                    source += "';\n" + evaluate + "\n__p+='";
                }
                index = offset + match.length;
                return match;
            });
            source += "';\n";

            // If a variable is not specified, place data values in local scope.
            if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

            source = "var __t,__p='',__j=Array.prototype.join," +
                "print=function(){__p+=__j.call(arguments,'');};\n" +
                source + "return __p;\n";

            try {
                render = new Function(settings.variable || 'obj', '_', source);
            } catch (e) {
                e.source = source;
                throw e;
            }

            if (data) return render(data, _);
            var template = function(data) {
                return render.call(this, data, _);
            };

            // Provide the compiled function source as a convenience for precompilation.
            template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
            return template;
        }
    });

}).call(this);