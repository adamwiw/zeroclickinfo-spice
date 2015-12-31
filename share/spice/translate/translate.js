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
		from: api_result.lang.substr(0, 1).toUpperCase(),
		to:   api_result.lang.substr(3, 4).toUpperCase()
	    },
            meta: {
                sourceName: 'Yandex.Translate',
                sourceUrl: 'http://translate.yandex.com/',
		sourceIconUrl: 'https://translate.yandex.net/main/v2.64.1451491320/i/favicon.ico'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.translate.translate,
		    moreText: {
			text: 'Yandex.Translate',
			href: 'http://translate.yandex.com/'
		    }
                }
            }
        });
    };
}(this));
