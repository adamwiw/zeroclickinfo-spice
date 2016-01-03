(function (env) {
    "use strict";
    env.ddg_spice_translate = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.text.length === 0) {
            return Spice.failed('translate');
        }

        // Render the response
        Spice.add({
            // Customize these properties
	    id:   'translate',
            name: 'Dictionary',
            data: {
	        text: api_result.text,
		from: api_result.lang.substr(0, 2),
		to:   api_result.lang.substr(3, 4),
		query:decodeURIComponent(DDG.get_query()).replace(/\sin\s[\w]+$/, '')
	    },
            meta: {
                sourceName: 'Yandex.Translate',
                sourceUrl: 'http://translate.yandex.com/',
		sourceIconUrl: 'https://translate.yandex.net/main/v2.64.1451491320/i/favicon.ico'
            },
	    onShow: function() {
		var source = api_result.lang.substr(0, 2);
		var target = api_result.lang.substr(3, 4);
                fetchLanguages(source).done(function(api_result) {
		    if(api_result.langs.length > 0) {
			var dropdown = '<select class="translate__langList">';
			for(var listbox in Spice.getDOM('translate').find('.translate__panel.translate__listbox')) {
			    for(var abbr in api_result.langs) {
				var selected;
				if(listbox.parentNode.id == ".translate__source" && abbr == source || 
				    listbox.parentNode.id == ".translate__target" && abbr == target)
				    selected = ' selected';
				dropdown += '<option value = "' + abbr'"' + selected + '>' + api_result.langs[abbr] + '</option>';
			    }
			    dropdown += '</select>';
			    listbox.html(dropdown);
			    listbox.onchange = translate;
			    };
			}
		    }
                });
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.translate.translate
                }
            }
        });
	
	var translate = debounce(function() {
	    var from = Spice.getDOM('translate').find('.translate__source .translate__langList');
	    var to = Spice.getDOM('translate').find('.translate__target .translate__langList');
	    fetchTranslation(Spice.getDOM('translate').find('.translate__left .translate__text').value, from.options[from.selectedIndex] + '-' + to.options[to.selectedIndex]).done(function(api_result) {
		var translation = api_result.text ? api_result.text : 'Translation not available';
		Spice.getDOM('translate').find('.translate__right .translate__text').value(translation);
	    });
	}, 1000);
	
	var detectLanguage = debounce(function() {
	    var from = Spice.getDOM('translate').find('.translate__left .translate__text');
	    var listbox = Spice.getDOM('translate').find('.translate__source .translate__langList');
	    detectLanguage(from.value).done(function(api_result) {
		if(api_result.lang && api_result.lang != listbox.options[listbox.selectedIndex]) {
		    for(var i=0; i<listbox.options.length; i++)
			if(api_result.lang==listbox.options[i].value)
			    listbox.selectedIndex=i;
		}
	    });
	}, 1000);
	Spice.getDOM('translate').find('.translate__left .translate__text').onchange = translate;
	Spice.getDOM('translate').find('.translate__left .translate__text').onchange = detectLanguage;
    };
    
    function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
    };
    
    function fetchLanguages(ui) {
        if( ui.length > 0 ) {
            return $.getJSON('/js/spice/translate/languages/' + ui);
        } else {
            return new jQuery.Deferred().resolve(null).promise();
        }
    }
    
    function detectLanguage(text) {
        if( text.length > 0 ) {
            return $.getJSON('/js/spice/translate/detect/' + text);
        } else {
            return new jQuery.Deferred().resolve(null).promise();
        }
    }
    
    function fetchTranslation(text, target) {
	if(text.length > 0 ) {
	    return $.getJSON('/js/spice/translate/translation/' + text + '/' + target);
	} else {
            return new jQuery.Deferred().resolve(null).promise();
        }
    }
}(this));
